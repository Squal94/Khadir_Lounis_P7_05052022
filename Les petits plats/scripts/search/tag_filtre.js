import {
  arrayIngredients,
  arrayAppareils,
  arrayUstensils,
  recettes,
} from "../factories/filtreFactoryAffichage.js";

const containerIngredient = document.querySelector(".ingredientContent");
const containerAppareil = document.querySelector(".appareilContent");
const containerUstensil = document.querySelector(".ustensileContent");
const containerSuggestion = document.querySelector(".container__suggestion");
const changeTag = document.querySelector(".filtres__container");
const tagContainer = document.querySelector(".tag");

let arrayTag = [];
let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";

function filterTag(target, color) {
  target.addEventListener(
    "click",
    function (e) {
      let cible = e.target;
      let text = cible.textContent;
      const tagDiv = document.createElement("div");
      const tagAffichage = `<div class="alert ${color} alert-dismissible fade show my-4" role="alert" aria-labelledby="${text}">
          <p>${text}</p>
          <button
            type="button"
            class="btn-close"
            data-dismiss="alert"
            aria-label="Close"
            aria-labelledby="${text}"
          ></button>
       </div>`;
      tagContainer.appendChild(tagDiv);
      tagDiv.innerHTML = tagAffichage;
      arrayTag.push(text);
      //console.log(arrayTag);
    },
    false
  );
}

function findObjectAffichage(source) {
  console.log("coucou25");

  let checker = (arr, target) => target.every((v) => arr.includes(v));
  source.addEventListener("click", () => {
    let arrayFicheDisplayNone = [];
    const ficheArray = document.querySelectorAll(".fiche");
    for (let i = 0; i < recettes.length; i++) {
      let valueToCompare = [];
      let valueOfUstensils = [...recettes[i].ustensils];
      let valueOfIngredients = [...recettes[i].ingredients];

      for (let i = 0; i < valueOfUstensils.length; i++) {
        valueToCompare.push(valueOfUstensils[i].toLowerCase());
      }

      valueToCompare.push(recettes[i].appliance.toLowerCase());
      valueToCompare.push(recettes[i].name.toLowerCase());

      for (let i = 0; i < valueOfIngredients.length; i++) {
        valueToCompare.push(valueOfIngredients[i].ingredient.toLowerCase());
      }

      if (checker(valueToCompare, arrayTag) === false) {
        arrayFicheDisplayNone.push(recettes[i].name);
      }
    }

    for (let i = 0; i < ficheArray.length; i++) {
      if (
        arrayFicheDisplayNone.indexOf(
          ficheArray[i].getAttribute("aria-labelledby")
        ) !== -1
      ) {
        ficheArray[i].style.display = "none";
      } else if (
        arrayFicheDisplayNone.indexOf(
          ficheArray[i].getAttribute("aria-labelledby")
        ) === -1
      ) {
        ficheArray[i].style.display = "flex";
      }
    }
  });
}

function ifTagClose() {
  tagContainer.addEventListener("mousedown", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      let ciblelabelledby = cible.getAttribute("aria-labelledby");
      let index = arrayTag.indexOf(ciblelabelledby);
      arrayTag.splice(index, 1);
      findObjectAffichage(tagContainer);
    }
  });
}

function inputFindObject() {
  const searchInputPrincipal = document.getElementById("search__Input");
  searchInputPrincipal.addEventListener("keyup", () => {
    let InputSuggestion = "";
    for (let i = 0; i < recettes.length; i++) {
      let inputValue = searchInputPrincipal.value;
      const resultComparing = recettes[i].name.toLowerCase();
      if (resultComparing.includes(inputValue.toLowerCase())) {
        if (inputValue !== "" && inputValue.length > 2) {
          InputSuggestion += `<p class="suggestion">${resultComparing}</p> `;
          document.querySelector(".container__suggestion").innerHTML =
            InputSuggestion;
        }
      }
      // else {
      //   const messageAlerte = document.querySelector(".message");
      //   messageAlerte.innerHTML = "Ce site ne contient pas recette";
      // }
    }
  });
  //const test = document.querySelector(".search__Input");
  // const containerSuggestion = document.createElement("div");
  // containerSuggestion.classList.add("suggestion");
  // test.appendChild(containerSuggestion);
  //containerSuggestion.innerHTML = `${InputSuggestion}`;
}

function inputFindObjectClick() {
  containerSuggestion.addEventListener("mouseup", (e) => {
    arrayTag = [];
    arrayTag.push(e.target.textContent);
    findObjectAffichage(containerSuggestion);
  });
}

filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);
findObjectAffichage(changeTag);
ifTagClose();
inputFindObject();
inputFindObjectClick();
