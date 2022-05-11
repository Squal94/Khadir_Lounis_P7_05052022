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
  arrayIngredients.forEach((valueIngredient) => {
    let ingredientFilterValue = document.createElement("a");
    ingredientFilterValue.classList.add("link");
    ingredientFilterValue.classList.add(
      `link--${valueIngredient.split(" ").join("-")}`
    );
    ingredientFilterValue.innerText = valueIngredient;
    domFilterIngredient.appendChild(ingredientFilterValue);
  });
  arrayAppareils.forEach((valueAppareil) => {
    let appareilFilterValue = document.createElement("a");
    appareilFilterValue.classList.add("link");
    appareilFilterValue.classList.add(
      `link--${valueAppareil.split(" ").join("-")}`
    );
    appareilFilterValue.innerText = valueAppareil;
    domFilterAppareil.appendChild(appareilFilterValue);
  });
  arrayUstensils.forEach((valueUstensil) => {
    let ustensilFilterValue = document.createElement("a");
    ustensilFilterValue.classList.add("link");
    ustensilFilterValue.classList.add(
      `link--${valueUstensil.split(" ").join("-")}`
    );
    ustensilFilterValue.innerText = valueUstensil;
    domFilterUstensile.appendChild(ustensilFilterValue);
  });
}

affichageFiltre();
