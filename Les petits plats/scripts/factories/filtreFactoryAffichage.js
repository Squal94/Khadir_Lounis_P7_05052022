import { recipes } from "../../data/recipes.js";
let recettes = [...recipes];

// -----------------  création du tableau ingrédient sans doublon et en minuscule ------------------------------
let keyIngredients = [];
let arrayIngredients = [];

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

function appareilArray() {
  recettes.forEach((recette) => {
    let tempValuesAppareil = recette.appliance;
    keyAppareils.push(tempValuesAppareil.toLowerCase());
  });
}

// -----------------  création du tableau ustensils sans doublon et en minuscule ------------------------------
let keyUstensils = [];
let arrayUstensils = [];

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
arrayIngredients = [...new Set(keyIngredients)];
arrayAppareils = [...new Set(keyAppareils)];
arrayUstensils = [...new Set(keyUstensils)];

//------------- function d'affichage des liens dans les filtres--------------------

function affichageFiltre() {
  const domFilterIngredient = document.querySelector(".ingredientContent");
  const domFilterAppareil = document.querySelector(".appareilContent");
  const domFilterUstensile = document.querySelector(".ustensileContent");
  function miseEnPage(target, array) {
    array.forEach((value) => {
      let filterValueTraitement = document.createElement("a");
      filterValueTraitement.classList.add("link");
      filterValueTraitement.classList.add(
        `link--${value.split(" ").join("-")}`
      );
      filterValueTraitement.innerText = value;
      target.appendChild(filterValueTraitement);
    });
  }
  miseEnPage(domFilterIngredient, arrayIngredients);
  miseEnPage(domFilterAppareil, arrayAppareils);
  miseEnPage(domFilterUstensile, arrayUstensils);
}

affichageFiltre();

export { arrayIngredients, arrayAppareils, arrayUstensils };
