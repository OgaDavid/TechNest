const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("characterId");
const characterCardElement = document.querySelector(".card");

async function fetchSingleCharacter() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );

    if (!response.ok) {
      document.title = `Character not found | Rick and Morty Character Database`;
      characterCardElement.innerHTML =
        '<p class="message">Character not found!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }

    const data = await response.json();
    // Update the page title
    document.title = `${data.name} | Rick and Morty Character Database`;
    // Populate the character card
    populateCharacterCard(data);
  } catch (error) {
    console.error(error);
  }
}

function populateCharacterCard(data) {
  if (!data) {
    characterCardElement.innerHTML =
      '<p class="message">Character not found!</p>';
    return;
  }
  const characterMarkup = `
        <h2 class="title">${data.name}</h2>
        <img src="${data.image}" alt="${data.name}" />
        <ul class="description">
          <li><strong>Status:</strong> ${data.status}</li>
          <li><strong>Species:</strong> ${data.species}</li>
          <li><strong>Origin:</strong> ${data.origin.name}</li>
        </ul>
    `;

  characterCardElement.innerHTML = characterMarkup;
}

fetchSingleCharacter();
