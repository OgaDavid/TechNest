# _Month 3, Week 1_

`Add functionality to search and filter your webpage with multiple characters. You decide whether you want to use local data or fetched data from an API, and how "smart" you want your search functionality to be - i.e., exact name matching ("firstName lastName"), partial name matching ("firstNa"), case sensitivity ("firstname lastname"), wildcard or pattern support ("first*", "f?rst"), fuzzy searching. Add functionality to reset the data and display all the characters once more.`

# _Project Demo_

[project demo](https://github.com/user-attachments/assets/a113639e-0aab-41d5-8442-d5259400833b)

# _Challenges Faced_

One of the main challenges I faced was implementing a **search and filter functionality** that could handle both **normal** and **advanced search modes**. I wanted to allow users to search for characters using simple text matching (e.g., partial or exact name matching) as well as more advanced fuzzy searching (e.g., finding characters even if the search term is misspelled or incomplete).

To achieve this, I used **Fuse.js**, a lightweight fuzzy-search library, for the advanced search functionality. Integrating Fuse.js required me to dynamically switch between normal and advanced search modes, which involved updating the search input placeholder, toggling CSS classes, and re-initializing the Fuse.js instance when needed.

Another challenge was ensuring that the search functionality was **responsive** and **user-friendly**. I added a **clear button** to reset the search results and display all characters again, which improved the user experience.

# _Solution_

## ⚙️ JavaScript Logic

## 📂 main.js

The `main.js` file is responsible for fetching character data from the Rick and Morty API, displaying it in a grid, and implementing the search and filter functionality. It also handles toggling between normal and advanced search modes.

### _1. Fetching Characters from the API_

The `fetchCharacters` function fetches character data from the Rick and Morty API and stores it in a global variable (`profileDatabase`) for later use. It also handles loading states and error handling.

```javascript
async function fetchCharacters() {
  try {
    toggleLoading(true);
    const res = await fetch(API_URL);
    if (!res.ok) {
      loadingElement.style.display = "none";
      characterGridElement.innerHTML =
        '<p class="message">Failed to fetch characters!</p>';
      throw new Error("Network response not OK. Please check your request.");
    }
    const data = await res.json();

    // Store the fetched data in a global variable
    profileDatabase = data.results;

    // Simulate a delay of 1 second to show the amazing loading screen 😁
    setTimeout(() => {
      toggleLoading(false);
      populateCharacterGrid(profileDatabase);
    }, 1000);
  } catch (error) {
    console.error(error);
  }
}
```
- **Loading State**: The `toggleLoading` function is used to show or hide the loading animation while data is being fetched.

- **Error Handling**: If the API request fails, an error message is displayed, and the error is logged to the console.

- **Data Storage**: The fetched data is stored in the `profileDatabase` variable for use in search and filtering.

### _2. Toggling Between Normal and Advanced Search_

The search functionality can be toggled between **normal search** (simple text matching) and **advanced search** (using Fuse.js). This is handled by the `searchToggleElement` event listener.

```javascript
searchToggleElement.addEventListener("click", () => {
  // Toggle the search mode between normal and advanced search
  isAdvancedSearch = !isAdvancedSearch;
  searchToggleElement.textContent = isAdvancedSearch
    ? "Normal Search 🔍"
    : "Advanced Search 🚀";

  inputSearch.value = "";
  populateCharacterGrid(profileDatabase);

  if (isAdvancedSearch && profileDatabase) {
    inputSearch.placeholder = "Search characters using advanced search...";
    inputSearch.classList.add("advanced-search");
    clearSearchElement.classList.add("advanced-search");

    // Initialize Fuse for advanced search
    fuse = new Fuse(profileDatabase, {
      includeScore: true,
      threshold: 0.3,
      keys: ["name"],
    });
  } else {
    inputSearch.placeholder = "Search characters";
    inputSearch.classList.remove("advanced-search");
    clearSearchElement.classList.remove("advanced-search");
  }
});
```

- **Toggle Search Mode**: The `isAdvancedSearch` variable is toggled between `true` and `false` to switch between search modes.

- **Fuse.js Initialization**: When advanced search is enabled, Fuse.js is initialized with the character data and configured to search by the `name` field.

- **UI Updates**: The search input placeholder and CSS classes are updated to reflect the current search mode.


### _3. Filtering and Displaying Characters_

The `filterAndDisplayCharacters` function filters the character data based on the search input and updates the grid accordingly. For advanced search, Fuse.js is used to perform fuzzy searching.

```javascript
function filterAndDisplayCharacters(searchValue) {
  const filteredCharacters = profileDatabase.filter((character) => {
    return character.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  populateCharacterGrid(filteredCharacters, searchValue);
}
```

- **Normal Search**: The `filter` method is used to find characters whose names include the search term (case-insensitive).

- **Advanced Search**: Fuse.js is used to perform fuzzy searching, and the results are mapped to the original character objects before being displayed.


### _4. Resetting the Search_

The `clearSearchElement` event listener allows users to reset the search results and display all characters again.

```javascript
clearSearchElement.addEventListener("click", () => {
  inputSearch.value = "";
  populateCharacterGrid(profileDatabase);
});
```

### _5. Populating the Character Grid_

The `populateCharacterGrid` function generates and displays the character cards in the grid. It handles cases where no characters are found.

```javascript
function populateCharacterGrid(data, searchValue = "") {
  if (!data || data.length === 0) {
    characterGridElement.innerHTML = searchValue
      ? `<p class="message">No characters found for "${searchValue}"</p>`
      : '<p class="message">No characters found!</p>';
    return;
  }
  characterGridElement.innerHTML = data.map(generateCharacterMarkup).join("");
}
```

- **Empty State**: If no characters are found, a message is displayed to inform the user.

- **Character Cards**: The `generateCharacterMarkup` function is used to create the HTML markup for each character card.
