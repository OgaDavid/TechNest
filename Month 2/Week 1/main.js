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

// Function to populate character grid
function populateCharacterGrid() {
  const characterGridElement = document.querySelector(".character-grid");

  const characters = profileDatabase.map((character) => {
    return generateCharacterMarkup(character);
  });

  // Handle cases where characters is not an array or is empty during initial population or search
  if (!Array.isArray(characters) || characters.length === 0) {
    characterGridElement.innerHTML = "<p>No characters found!</p>";
    return;
  }

  characterGridElement.innerHTML = characters.join("");
}

populateCharacterGrid();
