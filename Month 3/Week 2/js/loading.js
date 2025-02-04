const characterPageLoadingTemplate = `
    <div class="loading-character-card">
      <div class="image"></div>
      <div class="character-description">
        <p class="text"></p>
        <p class="text"></p>
        <p class="text"></p>
      </div>
    </div>
`;

// Function to generate loading cards
function generateLoadingCards(count) {
  const loadingCardTemplate = `
    <div class="loading-card">
      <div class="image"></div>
      <div class="content">
        <p class="text"></p>
        <p class="text"></p>
      </div>
    </div>
  `;

  const loadingCardsArray = Array(count).fill(loadingCardTemplate);
  return loadingCardsArray.join("");
}

// Function to inject loading cards into the loading grid
function showLoadingGrid() {
  // Get the current location
  const currentLocation = window.location.pathname.split("/").pop();

  const loadingGridElement = document.querySelector(
    currentLocation === "index.html"
      ? ".loading-grid"
      : ".character-loading-grid"
  );
  if (loadingGridElement) {
    // Show different loading templates based on the current page
    if (currentLocation === "index.html") {
      loadingGridElement.innerHTML = generateLoadingCards(8);
    } else if (currentLocation === "character.html") {
      loadingGridElement.innerHTML = characterPageLoadingTemplate;
    } else {
      loadingGridElement.innerHTML = "Loading...";
    }
  } else {
    console.error("Loading grid element not found");
  }
}

// Call the function to show the loading grid
showLoadingGrid();
