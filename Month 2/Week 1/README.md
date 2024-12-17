# _Month 2, Week 1_

`Update your webpages to dynamically render UI from a JSON file. This involves reading character data from a JSON file and generating HTML content to update the UI based on that data. Add error handling to your web page(s). Consider the user experience for such cases as an invalid file path, empty data, invalid data, etc.`

# _Solution_

## HTML Structure

I added a placeholder `div` with a class `character-grid` that would hold all the character cards to be populated with javascript.

```html
<section class="container">
  <img class="logo" src="assets/rick-and-morty-logo.png" alt="logo" />
  <!-- placeholder div -->
  <div class="character-grid"></div>
</section>
```

## JavaScript Logic

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

### _2. Function to populate the Character Grid_
The `populateCharacterGrid` function dynamically populates the character grid with data from the `profileDatabase`. It starts by selecting the character grid element from the DOM. It then maps over the `profileDatabase` array to generate the HTML markup for each character using the `generateCharacterMarkup` function and stores it in a new array called `characters`. The `populateCharacterGrid` function then checks if the `characters` array is empty or invalid and, if so, displays a **_"No characters found!"_** message. If the data is valid, it updates the character grid with the generated character markup. This ensures the character grid is populated correctly and handles cases where the data might be empty or invalid.

```javascript
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
```

## Initial Population of the Character Grid
To initially populate the character grid, I called the `populateCharacterGrid` function.

```javascript
// Initial population of the character grid
populateCharacterGrid();
```

# _Project Preview_

![rick and morty](https://github.com/user-attachments/assets/b3f5448d-b282-4536-adff-4a89e661f351)

