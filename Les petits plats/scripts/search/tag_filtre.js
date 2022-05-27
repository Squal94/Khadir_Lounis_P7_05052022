// importation de recipes.js et clonage dans l'Array recettes
import { recettes } from "../factories/filtreFactoryAffichage.js";

// Déclaration de toutes les constantes utiles
const containerIngredient = document.querySelector(".ingredientContent");
const containerAppareil = document.querySelector(".appareilContent");
const containerUstensil = document.querySelector(".ustensileContent");
const containerSuggestion = document.querySelector(".container__suggestion");
const appareilInput = document.querySelector(".appareilInput");
const ingredientInput = document.querySelector(".ingredientInput");
const ustensilInput = document.querySelector(".ustensileInput");
const changeTag = document.querySelector(".filtres__container");
const tagContainer = document.querySelector(".tag");
const ingredientAllLink = containerIngredient.querySelectorAll(".link");
const appareilAllLink = containerAppareil.querySelectorAll(".link");
const ustensilAllLink = containerUstensil.querySelectorAll(".link");
const searchInputPrincipal = document.getElementById("search__Input");

// Déclaration de tous les arrays utilisés
let arrayTag = [];
let arrayIngredientTemp = [];
let arrayUstensilsTemp = [];
let arrayAppareilsTemp = [];

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

/**
 * Fonction de trie pour l'affichage des recettes dans main
 * @param {source} action est la source de l'event pour lancer le tri
 * Récupération de la valeur cliqué selon l'event et affichage des recettes triée selon l'action
 */

function findObjectAffichage(source) {
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
      if (checker(arrayTag, valueToCompare) === false) {
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
        if (arrayIngredientTemp.length == 0) {
          ficheArray[i].style.display = "flex";
        }
      }
    }
  });
}

/**
 * Fonction de fermeture des Tags
 * @param {tagContainer} action si le clique capturer dans le tag container contient la class btn-close
 * alors recupération de aria-labelledby liée
 * et suppression de cette valeur dans arrayTag
 */

function ifTagClose() {
  tagContainer.addEventListener("click", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      if (arrayTag.length === 1) {
        arrayTag = [];
        findObjectAffichage(tagContainer);
      } else {
        let ciblelabelledby = cible.getAttribute("aria-labelledby");
        let stringValue = arrayTag.join(",").replace(`,${ciblelabelledby}`, "");
        arrayTag = stringValue.split(",");
        findObjectAffichage(tagContainer);
      }
    }
  });
}

/**
 * Fonction de récupération de la valeur de l'input principal
 * @param {searchInputPrincipal} Input l'input principal
 * si la valeur récupérée est supérieure à 3 lettres alors création d'un array des recettes en display bloc.
 * vérification des recettes correspondant a l'entrée et affichage
 * et création de 3 arrays pour chaque ingrédient appareil et ustensils sélectionner
 */

function inputFindObject() {
  const ficheArray = document.querySelectorAll(".fiche");
  searchInputPrincipal.addEventListener("keyup", () => {
    let InputSuggestion = "";
    for (let i = 0; i < recettes.length; i++) {
      let inputValue = searchInputPrincipal.value;
      const resultComparing = recettes[i].name.toLowerCase();
      if (resultComparing.indexOf(`${inputValue.toLowerCase()}`) !== -1) {
        if (inputValue !== "" && inputValue.length > 2) {
          InputSuggestion += `<p class="suggestion">${resultComparing}</p> `;
          document.querySelector(".container__suggestion").innerHTML =
            InputSuggestion;
          ficheArray[i].style.display = "flex";
          let arrayTampon = [...recettes[i].ingredients];
          for (let x = 0; x < arrayTampon.length; x++) {
            arrayIngredientTemp.push(
              `${arrayTampon[x].ingredient.toLowerCase()}`
            );
          }
          for (let x = 0; x < recettes[i].ustensils.length; x++) {
            arrayUstensilsTemp.push(
              `${recettes[i].ustensils[x].toLowerCase()}`
            );
          }
          arrayAppareilsTemp.push(`${recettes[i].appliance.toLowerCase()}`);
        } else if (inputValue === "" || inputValue.length < 2) {
          ficheArray[i].style.display = "flex";
          arrayTag = [];
          document.querySelector(".container__suggestion").innerHTML = "";
          arrayIngredientTemp = [];
          arrayUstensilsTemp = [];
          arrayAppareilsTemp = [];
        } else {
        }
      } else {
        ficheArray[i].style.display = "none";
      }
    }
    supprLinkInFiltre(ingredientAllLink, arrayIngredientTemp);
    supprLinkInFiltre(ustensilAllLink, arrayUstensilsTemp);
    supprLinkInFiltre(appareilAllLink, arrayAppareilsTemp);
  });
}

/**
 * Fonction de récupération de la valeur de l'input principal
 * @param {searchInputPrincipal} Input l'input principal
 * si la valeur récupérée est supérieure à 3 lettres alors création d'un array des recettes en display bloc.
 * vérification des recettes correspondant a l'entrée et affichage
 * et création de 3 arrays  ingrédient appareil et ustensils lié au recette encore afficher
 */

function inputFindLink(action, array) {
  action.addEventListener("keyup", () => {
    for (let i = 0; i < array.length; i++) {
      let inputValue = action.value;
      const resultComparing = array[i].textContent.toLowerCase();
      if (resultComparing.indexOf(`${inputValue}`) !== -1) {
        array[i].style.display = "block";
      } else {
        array[i].style.display = "none";
      }
    }
  });
}

function inputFindObjectClick() {
  containerSuggestion.addEventListener("mouseup", (e) => {
    arrayTag.push(e.target.textContent);
    findObjectAffichage(containerSuggestion);
  });
}

/**
 * Fonction de trie qui nous permet de vérifier les valeurs à afficher si l'input principal est actif et les sous filtre aussi
 * @param {array} arrayTag arrayTag est l'array lié au tag s'ils sont actifs
 * @param {array} valueToCompare valueToCompare est l'array lié à l'input principal s'il est actif
 *si une valeur d'ingrédient ustensile ou appareil dans arraytag est trouvées dans les valeurs des recettes liées à valuetocompare alors on retourne true sinon on retourne false
 */

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

/**
 * Fonction de suppression des valeur contenue dans les filtres
 * @param {array} array est l'array de tous les liens disponible dans chaque filtre
 * @param {arrayCompare}  array  est l'array lié à tous les ingrédients ustensiles et appareils liés aux recettes sélectionner dans l'input principal
 *si la valeur entre les 2 tableaux est trouvée alors le lien reste actif sinon il passe en display none
 */

function supprLinkInFiltre(array, arrayCompare) {
  // arrayTag = [];
  if (arrayCompare.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let ciblelabelledby = array[i].getAttribute("aria-labelledby");
      if (arrayCompare.indexOf(`${ciblelabelledby}`) !== -1) {
        array[i].style.display = "block";
      } else {
        array[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "block";
    }
  }
}

// initialisation des funtions

findObjectAffichage(changeTag);
filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);
ifTagClose();
inputFindLink(ingredientInput, ingredientAllLink);
inputFindLink(appareilInput, appareilAllLink);
inputFindLink(ustensilInput, ustensilAllLink);
inputFindObject();
inputFindObjectClick();
