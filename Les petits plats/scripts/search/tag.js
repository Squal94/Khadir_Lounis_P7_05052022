import {
  arrayIngredients,
  arrayAppareils,
  arrayUstensils,
} from "../factories/filtreFactoryAffichage.js";

const containerIngredient = document.querySelector(".ingredientContent");
const containerAppareil = document.querySelector(".appareilContent");
const containerUstensil = document.querySelector(".ustensileContent");
const tagContainer = document.querySelector(".tag");

let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";
// const test = document.querySelectorAll(".link");
// const test2 = document.querySelector(".link");
// const testArray = [...test];

function filterTag(target, color) {
  target.addEventListener(
    "click",
    function (e) {
      let cible = e.target;
      let text = cible.textContent;
      console.log(text);
      const tagDiv = document.createElement("div");
      const tagAffichage = `<div class="alert ${color} alert-dismissible fade show my-4" role="alert">
          <p>${text}</p>
          <button
            type="button"
            class="btn-close"
            data-dismiss="alert"
            aria-label="Close"
          ></button>
       </div>`;
      tagContainer.appendChild(tagDiv);
      tagDiv.innerHTML = tagAffichage;
    },
    false
  );
}

filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);

// containerUstensil.addEventListener(
//   "click",
//   function (e) {
//     let target = e.target;
//     let text = target.textContent;
//     console.log(text);
//   },
//   false
// );

// containerTest.addEventListener("click", (e) => {
//   e.preventDefault;
//   console.log(containerTest.querySelector(":focus"));
// });

// containerTest.addEventListener("click", (e) => {
//   e.preventDefault();
//   let index = testArray.findIndex(
//     (f) => f == containerTest.querySelector(":focus")
//   );
//   console.log(index);
// });

// function findTag(e) {
//   e.preventDefault();
//   let index = testArray.findIndex(
//     (f) => f === containerTest.querySelector(":focus")
//   );
//   console.log(index);
// }

// findTag();
