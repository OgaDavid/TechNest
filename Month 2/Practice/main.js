import { profileDatabase } from "./data.js";

// Function to generate markup for a character
function generateCharacterMarkup(character) {
  return `
    <a
      title="${character.name}"
      class="preview-card"
      href="pages/${character.pageUrl}"
    >
      <img src="${character.image}" alt="${character.name}" />
      <h2>${character.name}</h2>
    </a>
  `;
}

// Function to update the character grid
function updateCharacterGrid(characters, searchValue) {
  const characterGridElement = document.querySelector(".character-grid");

  if (!characterGridElement) {
    console.error("Character grid element not found");
    return;
  }

  // Handle cases where characters is not an array or is empty during initial population or search
  if (!Array.isArray(characters) || characters.length === 0) {
    characterGridElement.innerHTML = `<p>Character "${
      searchValue ? searchValue : ""
    }" not found!</p>`;
    return;
  }

  // if characters is an array and not empty generate markup for each character
  const characterCards = characters.map(generateCharacterMarkup);
  characterGridElement.innerHTML = characterCards.join("");
}

// Function to filter and display characters based on search value
function filterAndDisplayCharacters(searchValue) {
  const filteredCharacters = profileDatabase.filter((character) => {
    return character.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  updateCharacterGrid(filteredCharacters, searchValue);
}

// Add event listener to the search input
const inputSearch = document.querySelector("[data-input-search]");

if (inputSearch) {
  inputSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    filterAndDisplayCharacters(searchValue);
  });
} else {
  console.error("Search input element not found");
}

// Initial population of the character grid
updateCharacterGrid(profileDatabase);
