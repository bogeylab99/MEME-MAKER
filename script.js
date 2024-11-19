document.addEventListener("DOMContentLoaded", () => {
   const memeForm = document.getElementById("memeForm");
   const topTextInput = document.getElementById("topTextInput");
   const imageInput = document.getElementById("imageInput");
   const memeImage = document.getElementById("memeImage");
   const topTextDisplay = document.getElementById("Text");
   const idSelect = document.getElementById("memeIdSelect");
   // Fetch the JSON file
   fetch(`db.json`)
      .then(response => response.json())
      .then(data => {
         data.forEach(meme => {
            const option = document.createElement(`option`);
            option.value = meme.id;
            option.textContent = `Meme ${meme.id}`;
            idSelect.appendChild(option);
         });

         // Update inputs when an ID is selected
         idSelect.addEventListener(`change`, (event) => {
            const selectedMeme = data.find(meme => meme.id == event.target.value);
            if (selectedMeme) {
               topTextInput.value = selectedMeme.topText;
               memeImage.src = selectedMeme.imageUrl;
               topTextDisplay.textContent = selectedMeme.topText;
            }
         });
      });

   // Prevent default form submission
   memeForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Text displays
      topTextDisplay.textContent = topTextInput.value;
      

      // Image display
      const file = imageInput.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = function (e) {
            memeImage.src = e.target.result;
         };
         reader.readAsDataURL(file);
      }

      // Prepare data for POST request
      const newMeme = {
         topText: topTextInput.value,
         imageUrl: memeImage.url
      };

      // Send POST request to save the new meme
      fetch(`http://localhost:3000/memes`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(newMeme)
      })
      .then(response => response.json())
      .then(savedMeme => {
         console.log("Meme saved:", savedMeme);
         // Update the ID select with the new meme
         const option = document.createElement(`option`);
         option.value = savedMeme.id;
         option.textContent = `Meme ${savedMeme.id}`;
         idSelect.appendChild(option);
         alert("Meme saved successfully!");
      })
      .catch(error => {
         console.error("Error saving meme:", error);
         alert("Failed to save meme.");
      });
   });

   // Text display styles
   topTextDisplay.style.fontSize = "35px";
   topTextDisplay.style.textAlign = "center";
   topTextDisplay.style.color = "red";
   topTextDisplay.style.position = "relative";
   topTextDisplay.style.right = "50%";
   topTextDisplay.style.transform = "translateX(-20%)";
});
