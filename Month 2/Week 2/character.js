const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("characterId");
const characterCardContainerElement = document.querySelector(".card-container");

// Function to fetch a single character from the API
async function fetchSingleCharacter() {
  try {
    const loadingElement = document.querySelector(".loading");
    loadingElement.style.display = "block";

    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );

    if (!response.ok) {
      document.title = `Character not found | Rick and Morty Character Database`;
      loadingElement.style.display = "none";
      characterCardContainerElement.innerHTML =
        '<p class="message">Character not found!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }
    const data = await response.json();

    // Update the page title
    document.title = `${data.name} | Rick and Morty Character Database`;

    // Simulate a delay of 1 second to show the amazing loading screen 😁
    setTimeout(() => {
      loadingElement.style.display = "none";
      // Populate the character card
      populateCharacterCard(data);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
}

// Function to populate the character card
function populateCharacterCard(data) {
  if (!data) {
    characterCardContainerElement.innerHTML =
      '<p class="message">Character not found!</p>';
    return;
  }
  const characterMarkup = `
  <div class="card">
        <h2 class="title">${data.name}</h2>
        <img src="${data.image}" alt="${data.name}" />
        <ul class="description">
          <li><strong>Status:</strong> ${data.status}</li>
          <li><strong>Species:</strong> ${data.species}</li>
          <li><strong>Origin:</strong> ${data.origin.name}</li>
        </ul>
        </div>
    `;

  characterCardContainerElement.innerHTML = characterMarkup;
}

fetchSingleCharacter();
