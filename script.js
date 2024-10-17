document.addEventListener("DOMContentLoaded", () => {
   const memeForm = document.getElementById("memeForm");
   const topTextInput = document.getElementById("topTextInput");
   const bottomTextInput = document.getElementById("bottomTextInput");
   const imageInput = document.getElementById("imageInput");
   const memeImage = document.getElementById("memeImage");
   const topTextDisplay = document.getElementById("Text");
   const bottomTextDisplay = document.getElementById("typetext");
   const idSelect = document.getElementById("memeIdSelect")

 if (!topTextDisplay || !bottomTextDisplay) {
   console.error("Text display elements not found");
   return;
 }

 //fetch the json file
 fetch(`db.json`)
 .then(response => response.json())
 .then(data => {
   data.forEach(meme => {
      const option = document.createElement(`option`)
      option.value = meme.id;
      option.textContent = `Meme ${meme.id}`;
      idSelect.appendChild(option);
   })
   //update inputs when an id is selected
   idSelect.addEventListener(`change`, (event) => {
      const selectedMeme = data.find(meme => meme.id == event.target.value);
      if (selectedMeme) {
         topTextInput.value = selectedMeme.topText;
         bottomTextInput.value = selectedMeme.bottomText;
         memeImage.src = selectedMeme.imageUrl;
         topTextDisplay.textContent = selectedMeme.topText;
         bottomTextDisplay.textContent = selectedMeme.bottomText
      }
   })
 })
   
   //prevent default form submission
   memeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      //text displays
      topTextDisplay.textContent = topTextInput.value
      bottomTextDisplay.textContent = bottomTextInput.value

      //image display
      const file = imageInput.files[0]
      if (file) {
         const reader = new FileReader();
         reader.onload = function (e) {
            memeImage.src = e.target.result;
         };
         reader.readAsDataURL(file)
      }
   });
   // text display styles
   topTextDisplay.style.fontSize = "35px"
   topTextDisplay.style.textAlign = "center"
   topTextDisplay.style.color = "red"
   topTextDisplay.style.position = "absolute"
   topTextDisplay.style.right = "76%"
   topTextDisplay.style.transform = "translateX(auto)"


   bottomTextDisplay.style.fontSize = "35px"
   bottomTextDisplay.style.left = "76%"
   bottomTextDisplay.textAlign = "center"
   bottomTextDisplay.style.position = "absolute"
   bottomTextDisplay.style.color = "black"
   bottomTextDisplay.style.transform = "translateX(auto)"
});