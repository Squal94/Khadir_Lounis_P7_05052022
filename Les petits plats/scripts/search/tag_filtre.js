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
 * vérification des recettes correspondantes à l'entrée et affichage de ces recettes.
 * et création de 2 arrays : arrayTemp pour ingrédients appareils et ustensils affichés dans la recette
 *                         : arrayInputPrincipal qui contient les noms des recettes en display block
 */

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

/**
 * Fonction de récupération de la valeur du tag sélectionné
 * @param {action}  action de récupération au click selon le container du filtre sélectionné
 * si l'element cliqué contient la class link alors la valeur est push dans arrayTag
 */
function captureTag(action) {
  action.addEventListener("click", (e) => {
    arrayCompare = [];
    if (e.target.getAttribute("class").includes("link") === true) {
      arrayTag.push(e.target.textContent);
      arrCompare();
    }
  });
}

/**
 * Fonction de comparaison entre ArrayTag et valueToCompare
 * @param {array}  ArrayTag importaion de arrayTag et création de l'array valueToCompare
 * valueToCompare contient toutes les valeurs ustensiles,appareils et ingrédients de toutes les recettes
 * et les compare à arrayTag qui contient toutes les valeurs des tags sélectionnés
 * si une concordance est trouvée alors le nom de la recette est push dans l'arrayCompare
 */
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

/**
 * Fonction d'affichage des recettes triées
 * @param {array}  arrayCompare cet array contient tous les noms de recettes qui sont à afficher après les tris
 * la fonction contient aussi un systeme de comparaison avec arrayInputPrincipal si cet array contient un index superieur 0
 */
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

/**
 * Fonction suppression des liens dans les filtres
 * @param {array}  array cet array contient les liens de chaque filtre selon le container sélectionné
 * @param {arrayCompare} arrayTemp cet array contient tous les ingrédients,ustensiles et appareils des recettes sélectionnées dans input principal
 * si arrayTemp est actif , cette fonction compare  les valeurs à afficher dans les filtres.
 */

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

/**
 * Fonction de fermeture des tags
 * @param {source}  tagContainer event au click :
 * si le click sur l'element contient la class btn-close, alors recuparation de la valeur contenue dans le tag et supression de la valeur identique dans arraytag.
 */

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

/**
 * Fonction de sélection des valeurs contenues dans les filtres
 * @param {action}  action est l'input à selectionner
 * @param {array}  array array contient toutes les valeurs de départ des filtres
 * si la valeur écrite dans l'input existe alors toutes les valeurs contenues dans le filtre correspondant seront affichées
 * à contrario les autres seront en display none
 */

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
// initialisation des functions

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

//--------------Avec methode Filter ---------------------

// recettes.filter((recette) => {
//   let recetteName = recette.name;
//   if (recetteName.toLowerCase() === ficheLabelledby) {
//     let arrayIngredients = [];
//     let arrayUstensils = [];
//     recette.ingredients.forEach((ingredients) => {
//       arrayIngredients.push(ingredients.ingredient.toLowerCase());
//     });
//     recette.ustensils.forEach((ustensil) => {
//       arrayUstensils.push(ustensil.toLowerCase());
//     });
//     filterRecipes = [
//       recette.appliance.toLowerCase(),
//       ...arrayUstensils,
//       ...arrayIngredients,
//     ];
//     arrayTemp = [...arrayTemp, ...filterRecipes];
//   }
//   arrayTemp = [...new Set(arrayTemp)];
// });

//----------------- deuxieme methode avec Filter ---------------------

//           recettes.filter((recette) => {
//             let recetteName = recette.name;
//             let arrayIngredients = [];
//             if (recetteName.toLowerCase() === ficheLabelledby) {
//               recette.ingredients.filter((v) => {
//                 arrayIngredients.push(v.ingredient.toLowerCase());
//               });
//               arrayTemp = [
//                 ...arrayTemp,
//                 ...arrayIngredients,
//                 ...recette.ustensils.filter((v) => v.toLowerCase()),
//                 recette.appliance.toLowerCase(),
//               ];
//             }
//             arrayTemp = [...new Set(arrayTemp)];
//           });
