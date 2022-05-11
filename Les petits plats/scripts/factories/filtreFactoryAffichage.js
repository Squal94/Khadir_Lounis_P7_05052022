import { recipes } from "../../data/recipes.js";
let recettes = [...recipes];

// -----------------  création du tableau ingrédient sans doublon et en minuscule ------------------------------
let keyIngredients = [];
let arrayIngredient = [];

function ingredientArray() {
  recettes.forEach((recette) => {
    let tempValuesIngredient = recette.ingredients;
    tempValuesIngredient.forEach((value) => {
      let ingredientValue = value.ingredient;
      keyIngredients.push(ingredientValue.toLowerCase());
    });
  });
}

ingredientArray();
arrayIngredient = [...new Set(keyIngredients)];

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
arrayIngredient = [...new Set(keyIngredients)];
arrayAppareils = [...new Set(keyAppareils)];
arrayUstensils = [...new Set(keyUstensils)];

console.log(arrayUstensils);
