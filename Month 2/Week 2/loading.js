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
export function showLoadingGrid() {
  const loadingGridElement = document.querySelector(".loading-grid");
  if (loadingGridElement) {
    loadingGridElement.innerHTML = generateLoadingCards(8);
  } else {
    console.error("Loading grid element not found");
  }
}

// Call the function to show the loading grid
showLoadingGrid();
