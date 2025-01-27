const API_URL = "https://rickandmortyapi.com/api/character";

let fuse, profileDatabase;
let isAdvancedSearch = false;

const characterGridElement = document.querySelector(".character-grid");
const searchToggleElement = document.querySelector(".search-toggle");
const clearSearchElement = document.querySelector(".clear-btn");
const inputSearch = document.querySelector("[data-input-search]");

// Add event listener to the search toggle button
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
      inputSearch.classList.add("advanced-search");
      clearSearchElement.classList.add("advanced-search");

      // Initialize Fuse for advanced search
      fuse = new Fuse(profileDatabase, {
        includeScore: true,
        threshold: 0.3,
        keys: ["name"],
      });
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

// function to fetch characters from the API
async function fetchCharacters() {
  try {
    toggleLoading(true);
    const res = await fetch(API_URL);
    if (!res.ok) {
      loadingElement.style.display = "none";
      characterGridElement.innerHTML =
        '<p class="message">Failed to fetch characters!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }
    const data = await res.json();

    // Store the fetched data in a global variable
    profileDatabase = data.results;

    // Simulate a delay of 1 second to show the amazing loading screen 😁
    setTimeout(() => {
      toggleLoading(false);
      populateCharacterGrid(profileDatabase);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
}

// Function to generate markup for a character
function generateCharacterMarkup(character) {
  return `
    <a
      title="${character.name}"
      class="preview-card"
      href="character.html?characterId=${character.id}"
    >
      <img src="${character.image}" alt="${character.name}" />
      <div>
        <h2>${character.name}</h2>
        <p>${character.gender}</p>
      </div>
    </a>
  `;
}

// Function to populate character grid
function populateCharacterGrid(data, searchValue = "") {
  if (!data || data.length === 0) {
    characterGridElement.innerHTML = searchValue
      ? `<p class="message">No characters found for "${searchValue}"</p>`
      : '<p class="message">No characters found!</p>';
    return;
  }
  characterGridElement.innerHTML = data.map(generateCharacterMarkup).join("");
}

// Function to filter and display characters based on search value
function filterAndDisplayCharacters(searchValue) {
  const filteredCharacters = profileDatabase.filter((character) => {
    return character.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  populateCharacterGrid(filteredCharacters, searchValue);
}

// Function to toggle loading screen
function toggleLoading(isLoading) {
  const loadingElement = document.querySelector(".loading");
  loadingElement.style.display = isLoading ? "block" : "none";
}

// Add event listener to the search input
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

fetchCharacters();
