//------------- importation des recettes de recipes ----------------
import { recipes } from "../../data/recipes.js";
let recettes = [];
function tableauRecette() {
  for (let i = 0; i < recipes.length; i++) {
    recettes.push(recipes[i]);
  }
}
tableauRecette();
// -----------   filtre   ------------
function filtre() {
  const ingredient = document.querySelector(".ingredient");
  const appareil = document.querySelector(".appareil");
  const ustensile = document.querySelector(".ustensile");
  const ingredientInput = document.createElement("input");
  const appareilInput = document.createElement("input");
  const ustensileInput = document.createElement("input");
  ingredient.appendChild(ingredientInput);
  appareil.appendChild(appareilInput);
  ustensile.appendChild(ustensileInput);
}

//-------------- factorie fiche recette ----------------

function ficheRecette(data) {
  const cardMain = document.getElementById("cardMain");
  const fiche = document.createElement("div");
  fiche.classList.add("fiche");
  const img = document.createElement("img");
  img.classList.add("fiche__vignette");
  img.setAttribute("src", "/assets/recette/recette-limonada-de-coco.jpg");
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("fiche__title");
  const title = document.createElement("h2");
  title.classList.add("fiche__title--name");
  title.innerText = `${data.name}`;
  cardMain.appendChild(fiche);
  fiche.appendChild(img);
  fiche.appendChild(titleContainer);
  titleContainer.appendChild(title);
}

ficheRecette(recettes[0]);

function init() {
  filtre();
}
init();
