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
let testArray = [];
let arrayInputPrincipal = [];

let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";
let inputValue;

/**
 * Factory de création des Tags au click
 * @param {target} Container lié à l'action du click pour le addEventListener (filtres :ingredients ,appareils ,ustensils)
 * @param {color} attribution de la couleur du tag selon le filtre utilisé
 * Récupération de la valeur cliquée selon le container et création du tag selon la couleur du filtre
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
 * Fonction de récupération de la valeur de l'input principal
 * @param {searchInputPrincipal} Input l'input principal
 * si la valeur récupérée est supérieure à 3 lettres alors création d'un array des recettes en display block.
 * vérification des recettes correspondantes a l'entrée et affichage de ces recettes.
 * et création de 2 arrays , un pour chaque ingrédient appareil et ustensils affiché dans la recette (arrayTemp)
 * et création de  arrayInputPrincipal qui contient les noms des recettes en display block
 */

function inputPrincipalFilter() {
  const fichesArray = document.querySelectorAll(".fiche");
  searchInputPrincipal.addEventListener("keyup", (e) => {
    inputValue = e.target.value.toLowerCase();
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
      arrayTag = [];
      console.log(arrayTag);
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

function inputPrincipalSearchAdvence() {
  searchInputPrincipal.addEventListener("keyup", (e) => {
    inputValue = e.target.value.toLowerCase();
    if (inputValue !== "" && inputValue.length > 2) {
      for (let i = 0; i < recettes.length; i++) {
        if (recettes[i].name.toLowerCase() == inputValue) {
        } else {
          for (let x = 0; x < recettes[i].ingredients.length; x++) {
            if (
              inputValue === recettes[i].ingredients[x].ingredient.toLowerCase()
            ) {
              créationAdvenceArray(recettes[i]);
            }
          }
          for (let x = 0; x < recettes[i].ustensils.length; x++) {
            if (inputValue == recettes[i].ustensils[x].toLowerCase()) {
              créationAdvenceArray(recettes[i]);
            }
          }
          if (inputValue == recettes[i].appliance.toLowerCase()) {
            créationAdvenceArray(recettes[i]);
          }
        }
      }
    } else {
      testArray = [];
      arrayTag = [];
      arrayInputPrincipal = [];
      document.querySelector(".container__suggestion").innerHTML = "";
    }
  });
}

function créationAdvenceArray(arrayI) {
  arrayTag.push(inputValue);
  for (let z = 0; z < arrayI.ingredients.length; z++) {
    testArray.push(arrayI.ingredients[z].ingredient.toLowerCase());
  }
  for (let z = 0; z < arrayI.ustensils.length; z++) {
    testArray.push(arrayI.ustensils[z].toLowerCase());
  }
  testArray.push(arrayI.appliance.toLowerCase());
  arrCompare();
  supprLinkInFiltre(ingredientAllLink, testArray);
  supprLinkInFiltre(appareilAllLink, testArray);
  supprLinkInFiltre(ustensilAllLink, testArray);
}
/**
 * Fonction de récupération de la valeur du tag sélectionné
 * @param {action}  action de récupération au click selon le container du filtre sélectionné
 * si l'element cliqué contient la class link alors la valeur est push dans arrayTag
 */

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

/**
 * Fonction de comparaison entre ArrayTag et valueToCompare
 * @param {array}  ArrayTag importation de arrayTag et création de l'array valueToCompare
 * valueToCompare contient toutes les valeurs ustensiles appareils et ingrédients de toutes les recettes
 * et les compare a arrayTag qui contient toutes les valeurs des tags sélectionnés
 * si une concordance est trouvée alors le nom de la recette est push dans l'arrayCompare
 */

function arrCompare() {
  arrayCompare = [];
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

/**
 * Fonction d'affichage des recettes triées
 * @param {array}  arrayCompare cet array contient tous les noms de recettes qui sont à afficher après les tris
 * la fonction contient aussi un systeme de comparaison avec arrayInputPrincipal si cet array contient un index superieur 0
 */

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

/**
 * Fonction suppression des liens dans les filtres
 * @param {array}  array cet array contient les liens de chaque filtre selon le container sélectionné
 * @param {arrayCompare} arrayTemp cet array contient tous les ingrédients,ustensiles et appareils des recettes sélectionnées dans input principal
 * Si arrayTemp est actif , cette fonction compare les valeurs à afficher dans les filtres.
 */

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

/**
 * Fonction de fermeture des tags
 * @param {source}  tagContainer event au click :
 * si le clique sur l'element contient la class btn-close, alors récuparation de la valeur contenue dans le tag et supression de la valeur identique dans arraytag.
 */

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

/**
 * Fonction de sélection des valeurs contenues dans les filtres
 * @param {action}  action est l'input selectionné
 * @param {array}  array array contient toutes les valeurs de départ des filtres
 * si la valeur écrite dans l'input existe alors toutes les valeurs contenues dans le filtre correspondant seront affichées
 * à contrario les autres seront en display none
 */

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

/**
 * Fonction checker
 * @param {array}  arrayTag
 * @param {array}  valueToCompare
 * Permet de vérifier toutes les valeurs de l'arrayTag et de récupérer les valeurs des recettes correspondantes
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
inputPrincipalSearchAdvence();

// if (recetteName.toLowerCase() === ficheLabelledby) {
//   for (let x = 0; x < recettes[i].ingredients.length; x++) {
//     arrayIngredients.push(recettes[i].ingredients[x].ingredient.toLowerCase());
//   }
//   for (let x = 0; x < recettes[i].ustensils.length; x++) {
//     arrayUstensils.push(recettes[i].ustensils[x].toLowerCase());
//   }
//   arrayTemp = [
//     ...arrayTemp,
//     ...arrayIngredients,
//     ...arrayUstensils,
//     recettes[i].appliance.toLowerCase(),
//   ];
// }
// arrayTemp = [...new Set(arrayTemp)];
