# _Week 1_

`Update your webpages to dynamically render UI from a JSON file [Example JSON]. This involves reading character data from a JSON file and generating HTML content to update the UI based on that data. Add error handling to your web page(s). Consider the user experience for such cases as an invalid file path, empty data, invalid data, etc.`

# _Solution_

To achieve this, I updated the HTML structure to include placeholders for the image and text of each profile card. Here is an example of the HTML structure for a profile card:

```html
<div class="preview-card">
  <img id="image_rick" alt="rick sanchez" />
  <h2 id="text_rick"></h2>
</div>
```

I then created a function that injects the image and text for each profile card from a JavaScript file. The `profileDatabase` array in [`data.js`](https://github.com/OgaDavid/TechNest/blob/main/Month%201/Week%204/data.js) contains the static data for each profile.

Here is the JavaScript function that performs the injection:

```javascript
function injectProfileImagesAndText() {
  profileDatabase.forEach((profile) => {
    const characterImage = document.getElementById(`image_${profile.id}`);
    const characterText = document.getElementById(`text_${profile.id}`);

    if (characterImage && characterText) {
      characterImage.src = profile.image;
      characterText.innerText = profile.name;
    } else {
      console.error(`Element not found for profile id: ${profile.id}`);
    }
  });
}
```

This function iterates over each profile in the `profileDatabase` array, finds the corresponding HTML elements by their IDs, and updates their `src` and `innerText` properties with the data from the JavaScript file. This approach ensures that the data is dynamically injected into the HTML, making it easier to update and manage.

# _Project Preview_

![preview](https://github.com/user-attachments/assets/442556bf-3e51-493c-93d2-d56269cebc54)