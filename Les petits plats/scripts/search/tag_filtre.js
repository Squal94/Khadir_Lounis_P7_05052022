// importation de recipes.js et clonage dans l'Array recettes
import { recettes } from "../factories/filtreFactoryAffichage.js";

// Déclaration de toutes les constantes utiles
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

// Déclaration de tous les arrays utilisés
let arrayTag = [];
let arrayTemp = [];
let arrayCompare = [];
let arrayInputPrincipal = [];

let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";

/**
 * Factory de création des Tags au click d'un element dans les filtres
 * @param {target} Container lié à l'action du click pour le addEventListener (filtres :ingredients ,appareils ,ustensils)
 * @param {color} attribution de la couleur du tag selon le filtre utilisé
 * Récupération de la valeur cliqué selon le container et création du tag selon la couleur du filtre
 */

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
      for (let i = 0; i < fichesArray.length; i++) {
        let ficheLabelledby = fichesArray[i]
          .getAttribute("aria-labelledby")
          .toLowerCase();
        if (ficheLabelledby.indexOf(inputValue.toLowerCase()) !== -1) {
          InputSuggestion += `<p class="suggestion">${ficheLabelledby}</p> `;
          document.querySelector(".container__suggestion").innerHTML =
            InputSuggestion;
          for (let i = 0; i < recettes.length; i++) {
            let recetteName = recettes[i].name;
            let arrayIngredients = [];
            let arrayUstensils = [];
            if (recetteName.toLowerCase() === ficheLabelledby) {
              for (let x = 0; x < recettes[i].ingredients.length; x++) {
                arrayIngredients.push(
                  recettes[i].ingredients[x].ingredient.toLowerCase()
                );
              }
              for (let x = 0; x < recettes[i].ustensils.length; x++) {
                arrayUstensils.push(recettes[i].ustensils[x].toLowerCase());
              }
              arrayTemp = [
                ...arrayTemp,
                ...arrayIngredients,
                ...arrayUstensils,
                recettes[i].appliance.toLowerCase(),
              ];
            }
            arrayTemp = [...new Set(arrayTemp)];
          }
          arrayInputPrincipal.push(fichesArray[i]);
        } else {
          fichesArray[i].style.display = "none";
        }
      }
    } else {
      arrayTemp = [];
      arrayInputPrincipal = [];
      document.querySelector(".container__suggestion").innerHTML = "";
      for (let i = 0; i < fichesArray.length; i++) {
        fichesArray[i].style.display = "flex";
      }
    }
    supprLinkInFiltre(ingredientAllLink, arrayTemp);
    supprLinkInFiltre(appareilAllLink, arrayTemp);
    supprLinkInFiltre(ustensilAllLink, arrayTemp);
  });
}

function captureTag(action) {
  action.addEventListener("click", (e) => {
    arrayCompare = [];
    let tempBalise = e.target.getAttribute("class");
    if (tempBalise === "link") {
      arrayTag.push(e.target.textContent);
      arrCompare();
    }
  });
}

function arrCompare() {
  for (let i = 0; i < recettes.length; i++) {
    let valueToCompare = [];
    for (let x = 0; x < recettes[i].ingredients.length; x++) {
      valueToCompare.push(recettes[i].ingredients[x].ingredient.toLowerCase());
    }
    for (let x = 0; x < recettes[i].ustensils.length; x++) {
      valueToCompare.push(recettes[i].ustensils[x].toLowerCase());
    }

    valueToCompare.push(recettes[i].appliance.toLowerCase());

    if (checker(arrayTag, valueToCompare) === true) {
      arrayCompare.push(recettes[i].name);
    }
  }
  affichageFiche(arrayCompare);
  arrayTag = [...new Set(arrayTag)];
}

function affichageFiche(array) {
  if (arrayInputPrincipal.length > 0) {
    for (let i = 0; i < arrayInputPrincipal.length; i++) {
      let tempCompare = arrayInputPrincipal[i].getAttribute("aria-labelledby");
      if (array.indexOf(`${tempCompare}`) !== -1) {
        arrayInputPrincipal[i].style.display = "flex";
      } else {
        arrayInputPrincipal[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < allFiche.length; i++) {
      let tempCompare = allFiche[i].getAttribute("aria-labelledby");
      if (array.indexOf(`${tempCompare}`) !== -1) {
        allFiche[i].style.display = "flex";
      } else {
        allFiche[i].style.display = "none";
      }
    }
  }
}

function supprLinkInFiltre(array, arrayCompare) {
  if (arrayCompare.length > 1) {
    for (let i = 0; i < array.length; i++) {
      let ciblelabelledby = array[i].textContent;
      if (arrayCompare.indexOf(`${ciblelabelledby}`) !== -1) {
        array[i].style.display = "flex";
      } else {
        array[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "flex";
    }
  }
}

function ifTagClose() {
  tagContainer.addEventListener("mousedown", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      if (arrayTag.length == 1) {
        arrayTag = [];
      } else {
        let ciblelabelledby = cible.getAttribute("aria-labelledby");
        let stringValue = arrayTag.join(",").replace(`,${ciblelabelledby}`, "");
        arrayTag = stringValue.split(",");
      }
    }
    arrCompare();
  });
}

function inputFindLink(action, array) {
  action.addEventListener("keyup", (e) => {
    for (let i = 0; i < array.length; i++) {
      let inputValue = e.target.value;
      const resultComparing = array[i].textContent.toLowerCase();
      if (resultComparing.indexOf(`${inputValue}`) !== -1) {
        array[i].style.display = "block";
      } else {
        array[i].style.display = "none";
      }
    }
  });
}

function checker(fixedArray, inputArray) {
  let fixedArraylen = fixedArray.length;
  let inputArraylen = inputArray.length;
  if (fixedArraylen <= inputArraylen) {
    for (let i = 0; i < fixedArraylen; i++) {
      if (!(inputArray.indexOf(fixedArray[i]) >= 0)) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
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
