import { recettes } from "../factories/filtreFactoryAffichage.js";

const containerIngredient = document.querySelector(".ingredientContent");
const containerAppareil = document.querySelector(".appareilContent");
const containerUstensil = document.querySelector(".ustensileContent");
const appareilInput = document.querySelector(".appareilColor");
const ingredientInput = document.querySelector(".ingredientColor");
const ustensilInput = document.querySelector(".ustensileColor");
const tagContainer = document.querySelector(".tag");
const ingredientAllLink = containerIngredient.querySelectorAll(".link");
const appareilAllLink = containerAppareil.querySelectorAll(".link");
const ustensilAllLink = containerUstensil.querySelectorAll(".link");
const searchInputPrincipal = document.getElementById("search__Input");
const allFiche = document.querySelectorAll(".fiche");

let arrayTag = [];
let arrayTemp = [];
let arrayCompare = [];
let arrayInputPrincipal = [];
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
    },
    false
  );
}

function inputPrincipalFilter() {
  const fichesArray = document.querySelectorAll(".fiche");
  searchInputPrincipal.addEventListener("keyup", (e) => {
    let inputValue = e.target.value;
    if (inputValue !== "" && inputValue.length > 2) {
      let InputSuggestion = "";
      fichesArray.forEach((fiche) => {
        let ficheLabelledby = fiche
          .getAttribute("aria-labelledby")
          .toLowerCase();
        if (ficheLabelledby.includes(`${inputValue.toLowerCase()}`)) {
          InputSuggestion += `<p class="suggestion">${ficheLabelledby}</p> `;
          document.querySelector(".container__suggestion").innerHTML =
            InputSuggestion;
          recettes.forEach((recette) => {
            let recetteName = recette.name;
            if (recetteName.toLowerCase() === ficheLabelledby) {
              let ingredients = [...recette.ingredients];
              ingredients.forEach((name) => {
                arrayTemp.push(name.ingredient.toLowerCase());
              });
              recette.ustensils.forEach((ustensil) => {
                arrayTemp.push(ustensil.toLowerCase());
              });
              arrayTemp.push(recette.appliance.toLowerCase());
            }
            arrayTemp = [...new Set(arrayTemp)];
          });

          arrayInputPrincipal.push(fiche);
          //arrayCompare.push(ficheLabelledby);
        } else {
          fiche.style.display = "none";
        }
      });
    } else {
      document.querySelector(".container__suggestion").innerHTML = "";
      arrayTemp = [];
      fichesArray.forEach((fiche) => {
        fiche.style.display = "flex";
      });
    }
    supprLinkInFiltre(ingredientAllLink, arrayTemp);
    supprLinkInFiltre(appareilAllLink, arrayTemp);
    supprLinkInFiltre(ustensilAllLink, arrayTemp);
  });
}

function captureTag(action) {
  action.addEventListener("click", (e) => {
    arrayCompare = [];
    if (e.target.getAttribute("class").includes("link") === true) {
      arrayTag.push(e.target.textContent);
      arrCompare();
    }
  });
}

function arrCompare() {
  recettes.forEach((recette) => {
    let valueToCompare = [];
    recette.ingredients.some((object) => {
      valueToCompare.push(object.ingredient.toLowerCase());
    });
    recette.ustensils.some((object) => {
      valueToCompare.push(object.toLowerCase());
    });
    valueToCompare.push(recette.appliance.toLowerCase());

    if (
      arrayTag.every((v) => valueToCompare.includes(v)) == true ||
      valueToCompare.length == 0
    ) {
      arrayCompare.push(recette.name);
    }
  });
  affichageFiche(arrayCompare);
  arrayTag = [...new Set(arrayTag)];
}

function affichageFiche(array) {
  if (arrayInputPrincipal.length > 0) {
    arrayInputPrincipal.forEach((fiche) => {
      let tempCompare = fiche.getAttribute("aria-labelledby");
      if (array.includes(`${tempCompare}`) === true) {
        fiche.style.display = "flex";
      } else {
        fiche.style.display = "none";
      }
    });
  } else {
    allFiche.forEach((fiche) => {
      let tempCompare = fiche.getAttribute("aria-labelledby");
      if (array.includes(`${tempCompare}`) === true) {
        fiche.style.display = "flex";
      } else {
        fiche.style.display = "none";
      }
    });
  }
}

function supprLinkInFiltre(array, arrayCompare) {
  if (arrayCompare.length > 1) {
    array.forEach((item) => {
      let ciblelabelledby = item.textContent;
      if (arrayCompare.indexOf(`${ciblelabelledby}`) !== -1) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  } else {
    array.forEach((item) => {
      item.style.display = "flex";
    });
  }
}

function ifTagClose() {
  tagContainer.addEventListener("mousedown", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      let ciblelabelledby = cible.getAttribute("aria-labelledby");
      console.log(ciblelabelledby);
      let index = arrayTag.indexOf(ciblelabelledby);
      arrayTag.splice(index, 1);
      console.log(arrayTag);
    }
    arrCompare();
  });
}

function inputFindLink(action, array) {
  action.addEventListener("keyup", (e) => {
    array.forEach((link) => {
      let inputValue = e.target.value;
      const resultComparing = link.textContent.toLowerCase();
      if (resultComparing.includes(`${inputValue}`) == true) {
        link.style.display = "block";
      } else {
        link.style.display = "none";
      }
    });
  });
}

filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);
inputPrincipalFilter();
captureTag(containerIngredient);
captureTag(containerAppareil);
captureTag(containerUstensil);
ifTagClose();
inputFindLink(ingredientInput, ingredientAllLink);
inputFindLink(appareilInput, appareilAllLink);
inputFindLink(ustensilInput, ustensilAllLink);
