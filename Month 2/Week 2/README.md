# _Month 2, Week 2_

`Fetch data from an API and dynamically render UI. This involves fetching live data from an API and generating HTML content to update the UI based on that data. Optional - Expand error handling on your web page(s). Consider the user experience for such cases as data fetching failures, lost network connection, etc.`

# _Solution_

## HTML Structure

I added a placeholder `div` with a class `character-grid` that would hold all the character cards to be populated with JavaScript. Additionally, I included a `div` with a class `loading` that contains a `div` with a class `loading-grid` to display loading animations while data is being fetched.

```html
<section class="container">
  <img class="logo" src="logo.png" alt="logo" />
  <!-- Loading -->
  <div class="loading">
    <div class="loading-grid"></div>
  </div>
  <!--  -->
  <div class="character-grid"></div>
</section>
```

## ⚙️ JavaScript Logic

## 📂 main.js

### _1. Function to Fetch Characters_
The `fetchCharacters` function is an asynchronous function responsible for fetching character data from the [Rick and Morty API](https://rickandmortyapi.com/api/character) and updating the UI accordingly.

```javascript
async function fetchCharacters() {
  try {
    const loadingElement = document.querySelector(".loading");
    loadingElement.style.display = "block";
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) {
      throw new Error("Network response not OK. Please check your request.");
    }
    const data = await res.json();
    // Simulate a delay of 1 second to show loading screen 😁
    setTimeout(() => {
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
```

### _3. Function to Populate the Character Grid_
I created a function to populate the character grid with the provided characters. This function handles cases where the characters array is empty or invalid.

```javascript
// Function to populate character grid
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
```

### _3. Function to Populate the Character Card_
I created a function to populate the character card with the fetched character data. This function takes a character object as input and updates the inner HTML of the character card element. The function handles cases where the characters array is empty or invalid.

```javascript
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
The `showLoadingGrid` function injects the generated loading cards into the loading grid element in the DOM. This function is used to display the loading animation while data is being fetched.

```javascript
// Function to inject loading cards into the loading grid
export function showLoadingGrid() {
  const loadingGridElement = document.querySelector(".loading-grid");
  if (loadingGridElement) {
    loadingGridElement.innerHTML = generateLoadingCards(8);
  } else {
    console.error("Loading grid element not found");
  }
}
```
