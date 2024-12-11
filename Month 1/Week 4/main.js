import { profileDatabase } from "./data.js";

// function to inject profile images and text into the DOM
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

injectProfileImagesAndText();
