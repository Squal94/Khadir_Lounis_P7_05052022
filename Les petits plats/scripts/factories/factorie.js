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

  const time = document.createElement("div");
  time.classList.add("fiche__title__time");

  const timePic = document.createElement("img");
  timePic.classList.add("fiche__title__time--pic");
  timePic.setAttribute("src", "/assets/image/lhorloge.png");

  const timeString = document.createElement("p");
  timeString.classList.add("fiche__title__time--string");
  timeString.innerText = `${data.time}min`;

  const recetteContainer = document.createElement("section");
  recetteContainer.classList.add("fiche__recette");

  const recetteIngredient = document.createElement("div");
  recetteIngredient.classList.add("fiche__recette--ingredient");
  const recetteIngredientListe = document.createElement("ul");

  for (let i = 0; i < data.ingredients.length; i++) {
    const listeLi = document.createElement("li");
    recetteIngredientListe.appendChild(listeLi);
    let innerli = data.ingredients[i];
    console.log(innerli);
    listeLi.innerText = `${innerli.ingredient}`;
  }

  const recetteTexte = document.createElement("p");
  recetteTexte.classList.add("fiche__recette--texte");
  recetteTexte.innerText = `${data.description}`;

  cardMain.appendChild(fiche);
  fiche.appendChild(img);
  fiche.appendChild(titleContainer);
  titleContainer.appendChild(title);
  titleContainer.appendChild(time);
  time.appendChild(timePic);
  time.appendChild(timeString);
  fiche.appendChild(recetteContainer);
  recetteContainer.appendChild(recetteIngredient);
  recetteIngredient.appendChild(recetteIngredientListe);
  recetteContainer.appendChild(recetteTexte);
}

ficheRecette(recettes[0]);

function init() {
  filtre();
}
init();
