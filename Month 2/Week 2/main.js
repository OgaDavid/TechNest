const characterGridElement = document.querySelector(".character-grid");

// function to fetch characters from the API
async function fetchCharacters() {
  try {
    const loadingElement = document.querySelector(".loading");
    loadingElement.style.display = "block";

    const res = await fetch("https://rickandmortyapi.com/api/characte");
    if (!res.ok) {
      loadingElement.style.display = "none";
      characterGridElement.innerHTML =
        '<p class="message">Failed to fetch characters!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }
    const data = await res.json();

    // Simulate a delay of 1 second to show the amazing loading screen 😁
    setTimeout(() => {
      // Hide the loading element and populate the character grid
      loadingElement.style.display = "none";
      populateCharacterGrid(data.results);
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
function populateCharacterGrid(data) {
  const characters = data?.map((character) => {
    return generateCharacterMarkup(character);
  });

  // Handle cases where characters is not an array or is empty during initial population or search
  if (!Array.isArray(characters) || characters.length === 0) {
    characterGridElement.innerHTML =
      '<p class="message">No characters found!</p>';
    return;
  }

  characterGridElement.innerHTML = characters.join("");
}

fetchCharacters();
