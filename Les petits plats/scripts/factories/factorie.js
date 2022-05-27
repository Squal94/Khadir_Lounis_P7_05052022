//------------- importation des recettes de recipes ----------------
import { recipes } from "../../data/recipes.js";
let recettes = [...recipes];

// -----------   filtre   ------------
/**
 * Fonction de création des inputs dans les filtres
 * @param {input}
 * recupération des balises bootstrap et création des input couleur et class
 */
function filtre() {
  const ingredient = document.querySelector(".ingredient");
  const appareil = document.querySelector(".appareil");
  const ustensile = document.querySelector(".ustensile");

  const ingredientInput = document.createElement("input");
  ingredientInput.classList.add("ingredientColor");
  ingredientInput.setAttribute("placeholder", "Ingredients");

  const appareilInput = document.createElement("input");
  appareilInput.classList.add("appareilColor");
  appareilInput.setAttribute("placeholder", "Appareils");

  const ustensileInput = document.createElement("input");
  ustensileInput.classList.add("ustensileColor");
  ustensileInput.setAttribute("placeholder", "Ustensiles");

  // création dans le DOM
  ingredient.appendChild(ingredientInput);
  appareil.appendChild(appareilInput);
  ustensile.appendChild(ustensileInput);
}

//-------------- factorie fiche recette ----------------

/**
 * Factory de création de fiche recette
 * @param {array} recette
 * recettes est la copie de recipes.js qui est la base de donnée des recettes
 * et recette sont les objets quelle contient
 */

function ficheRecette(data) {
  const cardMain = document.getElementById("cardMain");

  const fiche = document.createElement("article");
  fiche.classList.add("fiche");
  fiche.setAttribute("aria-labelledby", data.name);
  fiche.setAttribute("alt", `Fiche de la recette ${data.name}`);

  const img = document.createElement("img");
  img.classList.add("fiche__vignette");
  img.setAttribute("src", `assets/recette/${data.image}`);

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("fiche__title");

  const title = document.createElement("h2");
  title.classList.add("fiche__title--name");
  title.innerText = `${data.name}`;

  const time = document.createElement("div");
  time.classList.add("fiche__title__time");

  const timePic = document.createElement("img");
  timePic.classList.add("fiche__title__time--pic");
  timePic.setAttribute("src", `assets/image/lhorloge.png`);

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
    listeLi.innerText = `${innerli.ingredient}`;
  }

  const recetteTexte = document.createElement("p");
  recetteTexte.classList.add("fiche__recette--texte");
  recetteTexte.innerText = `${data.description}`;

  // création dans le DOM
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

//-------- fonction affichage de toute les recettes
/**
 * Boucle de création de toutes les fiches  de recette
 * @param {array} recettes
 * recettes est la copie de recipes.js qui est la base de donnée des recettes
 */
function mosaicRecette() {
  recettes.forEach((recette) => {
    ficheRecette(recette);
  });
}

function init() {
  filtre();
  mosaicRecette();
}
init();
