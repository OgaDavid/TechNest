# _Month 2, Week 1_

`Update your webpages to dynamically render UI from a JSON file [Example JSON]. This involves reading character data from a JSON file and generating HTML content to update the UI based on that data. Add error handling to your web page(s). Consider the user experience for such cases as an invalid file path, empty data, invalid data, etc.`

# _Solution_

## HTML Structure
I updated the HTML structure to include a search input. This allows users to search for characters dynamically. Here is an example of the HTML structure:

```html
<section class="container">
  <img class="logo" src="assets/rick-and-morty-logo.png" alt="logo" />
  <input placeholder="Search character" type="text" data-input-search />
  <div class="character-grid"></div>
</section>
```

## JavaScript Logic

Next, I focused on the JavaScript logic to fetch data from a JSON file and dynamically update the UI.

### _1. Function to Generate Markup for a Character_
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

### _2. Function to Update the Character Grid_
I then created a function to update the character grid with the provided characters. This function handles cases where the characters array is empty or invalid:

```javascript
function updateCharacterGrid(characters) {
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
```

### _3. Function to Filter and Display Characters Based on Search Value_
To enable dynamic searching, I added a function to filter and display characters based on the search value. This function filters the characters and updates the character grid accordingly:

```javascript
function filterAndDisplayCharacters(searchValue) {
  const filteredCharacters = profileDatabase.filter((character) => {
    return character.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  updateCharacterGrid(filteredCharacters);
}
```

### _4. Event Listener for Search Input_
Finally, I added an event listener to the search input to filter and display characters as the user types. This ensures that the character grid updates in real-time based on the search input:

```javascript
const inputSearch = document.querySelector("[data-input-search]");

if (inputSearch) {
  inputSearch.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    filterAndDisplayCharacters(searchValue);
  });
} else {
  console.error("Search input element not found");
}
```

## Initial Population of the Character Grid
To initially populate the character grid, I called the `updateCharacterGrid` function with the `profileDatabase` data:

```javascript
// Initial population of the character grid
updateCharacterGrid(profileDatabase);
```

# _Project Preview_

[Rick & Morty Character database](https://github.com/user-attachments/assets/9d927b9f-e289-41b6-b430-d4585760bce1)


