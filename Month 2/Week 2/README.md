# _Month 2, Week 2_

`Fetch data from an API and dynamically render UI. This involves fetching live data from an API and generating HTML content to update the UI based on that data. Optional - Expand error handling on your web page(s). Consider the user experience for such cases as data fetching failures, lost network connection, etc.`

# _Project Demo_

[project demo](https://github.com/user-attachments/assets/94b6216f-98b3-4f4a-bf41-f17cc871a723)

# _Challenges Faced_

One challenge I faced was figuring out how to pass the ID of a selected character from the collection of characters page (`index.html`) to the individual character details page (`character.html`). I chose to separate the HTML code and logic for these pages to maintain a clear structure and modularity. Initially, I was unsure how to transfer data, such as the `characterId`, between the two pages.

After conducting some research, I discovered that I could pass small pieces of data, like IDs or page numbers, through the URL as query parameters. For example, when navigating to the `character.html` page, I could append the selected character's ID to the URL (`character.html?characterId=3`). On the receiving page (`character.html`), I could then extract these parameters using the `URLSearchParams API` in JavaScript. This approach enabled me to dynamically load and display the details of the selected character without hardcoding or compromising the separation of concerns.

# _Solution_

## ⚙️ JavaScript Logic

## 📂 main.js
The `main.js` file is responsible for fetching and displaying a list of characters from the Rick and Morty API. It handles the display of a loading animation while data is being fetched and dynamically populates the character grid with the fetched data.

### _1. Function to Fetch Characters_
The `fetchCharacters` function is an asynchronous function responsible for fetching character data from the [Rick and Morty API](https://rickandmortyapi.com/api/character) and updating the UI accordingly.

```javascript
// function to fetch characters from the API
async function fetchCharacters() {
  try {
    const loadingElement = document.querySelector(".loading");
    loadingElement.style.display = "block";

    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) {
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
```

- **Displaying the Loading Element**: The function selects the loading element from the DOM and sets its display style to block to make it visible.
- **Fetching Data from the API**: It makes a fetch request to the Rick and Morty API endpoint and waits for the response.
- **Checking the Response**: If the response is not OK, it throws an error.
- **Parsing the JSON Data**: If the response is OK, it parses the response as JSON.
- **Simulating a Delay**: It simulates a delay of 1 second to show the loading screen, then hides the loading element and calls the populateCharacterGrid function with the fetched data.
- **Error Handling**: If any error occurs during the fetch operation, it is caught and logged to the console.

### _2. Function to Generate Markup for a Character_
I created a function to generate the HTML markup for a single character card. This function takes a character object as input and returns the corresponding HTML string:

```javascript
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
```

### _3. Function to Populate the Character Grid_
I created a function to populate the character grid with the provided characters. This function handles cases where the characters array is empty or invalid.

```javascript
/ Function to populate character grid
function populateCharacterGrid(data) {
  const characterGridElement = document.querySelector(".character-grid");

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
```

### _4. Initial Population of the Character Grid_
To initially populate the character grid, I called the `populateCharacterGrid` function.

```javascript
// Initial population of the character grid
fetchCharacters();
```

## 📂 character.js
The `character.js` file is responsible for fetching and displaying data for a single character based on the character ID from the URL parameters. It updates the page title and populates the character card with the fetched data.

### _1. Extracting the character ID from URLSearchParams_
The URLSearchParams object is used to parse the query string from the URL. The characterId is extracted from the URL parameters.

```javascript
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("characterId");
```

### _2. Function to Fetch a Single Character_
The  `fetchSingleCharacter` function is an asynchronous function responsible for fetching data for a single character based on the character ID from the URL parameters and updating the UI accordingly.

```javascript
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
```
- **Displaying the Loading Element**: The function selects the loading element from the DOM and sets its display style to `block` to make it visible.
- **Fetching Data from the API**: It makes a fetch request to the Rick and Morty API endpoint with the character ID from the URL parameters and waits for the response.
- **Checking the Response**: If the response is not OK, it updates the page title to "Character not found", sets the inner HTML of the character card element to display a "Character not found!" message, and throws an error.
- **Parsing the JSON Data**: If the response is OK, it parses the response as JSON.
- **Updating the Page Title**: It updates the page title to include the character's name.
- **Populating the Character Card**: It calls the `populateCharacterCard` function with the fetched data to update the character card in the DOM.
- **Error Handling**: If any error occurs during the fetch operation, it is caught and logged to the console.

### _3. Function to Populate the Character Card_
I created a function to populate the character card with the fetched character data. This function takes a character object as input and updates the inner HTML of the character card element. The function handles cases where the characters array is empty or invalid.

```javascript
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

```

## 📂 loading.js
The `loading.js` file is responsible for generating and displaying loading cards while data is being fetched. These loading cards provide a visual indication to the user that data is being loaded.

## _1. Function to Generate Loading Cards_
The `generateLoadingCards` function is responsible for generating a specified number of loading card templates and returning them as a single string. The function creates an array of the specified length (`count`) and fills it with the loading card template using `Array(count).fill(loadingCardTemplate)`. The function then joins the array of loading card templates into a single string using `join("")` and returns it.

```javascript
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
```

## _2. Function to Inject the Loading Cards_
The `showLoadingGrid` function injects the generated loading cards into the loading grid element in the DOM. This function is used to display the loading animation while data is being fetched. One of the key features of this function is its reusability, allowing it to be used to show different loading screens based on the current location or context within the application.

```javascript
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
```
