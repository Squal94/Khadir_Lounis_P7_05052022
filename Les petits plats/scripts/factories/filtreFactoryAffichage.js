// importation de recipes.js et clonage dans l'Array recettes

import { recipes } from "../../data/recipes.js";
let recettes = [...recipes];

// -----------------  création du tableau ingrédient sans doublon et en minuscule ------------------------------

let keyIngredients = [];
let arrayIngredients = [];
/**
 * Factory de création de l'array des valeurs contenu dans le filtre ingredient
 * @param {array} recettes
 * @param {array} recette.ingredients
 * Récupération de tous les incredients contenu dans chaque recette
 * mise en minuscule de chaque valeur
 */
function ingredientArray() {
  recettes.forEach((recette) => {
    let tempValuesIngredient = recette.ingredients;
    tempValuesIngredient.forEach((value) => {
      let ingredientValue = value.ingredient;
      keyIngredients.push(ingredientValue.toLowerCase());
    });
  });
}

// -----------------  création du tableau appareil sans doublon et en minuscule ------------------------------
let keyAppareils = [];
let arrayAppareils = [];

/**
 * Factory de création de l'array des valeurs contenu dans le filtre appareil
 * @param {array} recettes
 * @param {array} recette.appliance
 * Récupération de tous les appareils contenu dans chaque recette
 * mise en minuscule de chaque valeur
 */

function appareilArray() {
  recettes.forEach((recette) => {
    let tempValuesAppareil = recette.appliance;
    keyAppareils.push(tempValuesAppareil.toLowerCase());
  });
}

// -----------------  création du tableau ustensils sans doublon et en minuscule ------------------------------
let keyUstensils = [];
let arrayUstensils = [];

/**
 * Factory de création de l'array des valeurs contenu dans le filtre ustensils
 * @param {array} recettes
 * @param {array} recette.ustensils
 * Récupération de tous les ustensils contenu dans chaque recette
 * mise en minuscule de chaque valeur
 */

function ustensilsArray() {
  recettes.forEach((recette) => {
    let tempValuesUstensils = recette.ustensils;
    tempValuesUstensils.forEach((value) => {
      keyUstensils.push(value.toLowerCase());
    });
  });
}

ingredientArray();
appareilArray();
ustensilsArray();

// supression des doublons des tableaux , keyIngredients , keyAppareils ,keyUstensils

arrayIngredients = [...new Set(keyIngredients)];
arrayAppareils = [...new Set(keyAppareils)];
arrayUstensils = [...new Set(keyUstensils)];

//------------- function d'affichage des liens dans les filtres--------------------

/**
 * Factory de création des contenus initiaux des filtres
 */

function affichageFiltre() {
  const domFilterIngredient = document.querySelector(".ingredientContent");
  const domFilterAppareil = document.querySelector(".appareilContent");
  const domFilterUstensile = document.querySelector(".ustensileContent");
  /**
   * Factory d'affichage des valeurs contenu dans les filtres
   * @param {target} ciblage du container
   * @param {array} array array contenant les valeurs à afficher
   * Récupération des arrays trié et affichage dans le container lié
   */
  function miseEnPage(target, array) {
    array.forEach((value) => {
      let filterValueTraitement = document.createElement("a");
      filterValueTraitement.classList.add("link");
      filterValueTraitement.setAttribute("aria-labelledby", value);
      filterValueTraitement.innerText = value;
      target.appendChild(filterValueTraitement);
    });
  }
  miseEnPage(domFilterIngredient, arrayIngredients);
  miseEnPage(domFilterAppareil, arrayAppareils);
  miseEnPage(domFilterUstensile, arrayUstensils);
}

affichageFiltre();

export { arrayIngredients, arrayAppareils, arrayUstensils, recettes };
