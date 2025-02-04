import { initPagination, updateURL } from "./pagination.js";

const API_URL = "https://rickandmortyapi.com/api/character";

let fuse,
  profileDatabase,
  totalPages,
  isAdvancedSearch = false;

const characterGridElement = document.querySelector(".character-grid"),
  searchToggleElement = document.querySelector(".search-toggle"),
  clearSearchElement = document.querySelector(".clear-btn"),
  inputSearch = document.querySelector("[data-input-search]");

// Fetch characters
async function fetchCharacters(page = 1) {
  try {
    toggleLoading(true);
    const res = await fetch(`${API_URL}/?page=${page}`);
    if (!res.ok) {
      toggleLoading(false);
      characterGridElement.innerHTML =
        '<p class="message">Failed to fetch characters!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }

    const data = await res.json();

    profileDatabase = data.results;
    totalPages = data.info.pages;

    // Reinitialize Fuse for fuzzy search with the new data
    fuse = new Fuse(profileDatabase, {
      includeScore: true,
      threshold: 0.3,
      keys: ["name", "gender"],
    });

    setTimeout(() => {
      toggleLoading(false);
      populateCharacterGrid(profileDatabase);
    }, 300);

    // Initialize pagination after setting totalPages
    initPagination(updatePage, totalPages);
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
}

// Update page
function updatePage(page) {
  updateURL(page);
  fetchCharacters(page);
}

// Toggle loading
function toggleLoading(isLoading) {
  document.querySelector(".loading").style.display = isLoading
    ? "block"
    : "none";
  characterGridElement.style.display = isLoading ? "none" : "flex";
}

function populateCharacterGrid(data, searchValue = "") {
  if (!data || data.length === 0) {
    characterGridElement.innerHTML = searchValue
      ? `<p class="message">No characters found for "${searchValue}"</p>`
      : '<p class="message">No characters found!</p>';
    return;
  }
  characterGridElement.innerHTML = data
    .map(
      (character) => `
        <a class="preview-card" href="character.html?characterId=${character.id}">
          <img src="${character.image}" alt="${character.name}" />
          <div>
            <h2>${character.name}</h2>
            <p>${character.gender}</p>
          </div>
        </a>
      `
    )
    .join("");
}

function filterAndDisplayCharacters(searchValue) {
  const filteredCharacters = profileDatabase.filter((character) => {
    return character.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  populateCharacterGrid(filteredCharacters, searchValue);
}

// Search logic
if (inputSearch) {
  inputSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!isAdvancedSearch) {
      filterAndDisplayCharacters(searchValue);
      return;
    }

    if (searchValue === "") {
      // Reset the character grid if the search input is cleared
      populateCharacterGrid(profileDatabase);
    } else {
      const results = fuse.search(searchValue);
      populateCharacterGrid(
        results.map((result) => result.item),
        searchValue
      );
    }
  });
} else {
  console.error("Search input element not found");
}

if (searchToggleElement) {
  searchToggleElement.addEventListener("click", () => {
    // Toggle the search mode between normal and advanced search
    isAdvancedSearch = !isAdvancedSearch;
    searchToggleElement.textContent = isAdvancedSearch
      ? "Normal Search 🔍"
      : "Advanced Search 🚀";

    inputSearch.value = "";
    populateCharacterGrid(profileDatabase);

    if (isAdvancedSearch && profileDatabase) {
      inputSearch.placeholder = "Search characters using advanced search...";
      inputSearch.focus();
      inputSearch.classList.add("advanced-search");
      clearSearchElement.classList.add("advanced-search");
    } else {
      inputSearch.placeholder = "Search characters";
      inputSearch.classList.remove("advanced-search");
      clearSearchElement.classList.remove("advanced-search");
    }
  });
}

// Add event listener to the clear search button
if (clearSearchElement) {
  clearSearchElement.addEventListener("click", () => {
    inputSearch.value = "";
    populateCharacterGrid(profileDatabase);
  });
}

// Initial data load
const urlParams = new URLSearchParams(window.location.search);
const initialPage = urlParams.get("page") || 1;
fetchCharacters(initialPage);
