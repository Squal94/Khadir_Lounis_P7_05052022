import {
  arrayIngredients,
  arrayAppareils,
  arrayUstensils,
  recettes,
} from "../factories/filtreFactoryAffichage.js";

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
const allFiche = document.querySelectorAll(".fiche");

let arrayTag = [];
let arrayTemp = [];
let arrayCompare = [];
let arrayIngredientTemp = [];
let arrayUstensilsTemp = [];
let arrayAppareilsTemp = [];

let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";

//let checker = (arr, target) => target.every((v) => arr.includes(v));

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
    },
    false
  );
}

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

function captureTag(action) {
  action.addEventListener("click", (e) => {
    arrayCompare = [];
    if (e.target.getAttribute("class").includes("link") === true) {
      arrayTag.push(e.target.textContent);
      recettesCompare();
    }
  });
}

function recettesCompare() {
  recettes.forEach((recette) => {
    let valueToCompare = [];
    recette.ingredients.some((object) => {
      valueToCompare.push(object.ingredient.toLowerCase());
    });
    if (
      arrayTag.every((v) => valueToCompare.includes(v)) == true ||
      valueToCompare.length == 0
    ) {
      arrayCompare.push(recette.name);
    }
  });
  affichageFiche(arrayCompare);
}

function affichageFiche(array) {
  allFiche.forEach((fiche) => {
    let tempCompare = fiche.getAttribute("aria-labelledby");
    if (array.includes(`${tempCompare}`) === true) {
      fiche.style.display = "block";
    } else {
      fiche.style.display = "none";
    }
  });
}

function supprLinkInFiltre(array, arrayCompare) {
  if (arrayCompare.length > 1) {
    array.forEach((item) => {
      let ciblelabelledby = item.textContent;
      if (arrayCompare.indexOf(`${ciblelabelledby}`) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  } else {
    array.forEach((item) => {
      item.style.display = "block";
    });
  }
}

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
    recettesCompare();
  });
}

filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);
inputPrincipalFilter();
captureTag(containerIngredient);
ifTagClose();

// function findObjectAffichage(source) {
//   let checker = (arr, target) => target.every((v) => arr.includes(v));
//   source.addEventListener("click", () => {
//     let arrayFicheDisplayNone = [];
//     const ficheArray = document.querySelectorAll(".fiche");
//     for (let i = 0; i < recettes.length; i++) {
//       let valueToCompare = [];
//       let valueOfUstensils = [...recettes[i].ustensils];
//       let valueOfIngredients = [...recettes[i].ingredients];

//       for (let i = 0; i < valueOfUstensils.length; i++) {
//         valueToCompare.push(valueOfUstensils[i].toLowerCase());
//       }

//       valueToCompare.push(recettes[i].appliance.toLowerCase());
//       valueToCompare.push(recettes[i].name.toLowerCase());

//       for (let i = 0; i < valueOfIngredients.length; i++) {
//         valueToCompare.push(valueOfIngredients[i].ingredient.toLowerCase());
//       }

//       if (checker(valueToCompare, arrayTag) === false) {
//         arrayFicheDisplayNone.push(recettes[i].name);
//       }
//     }

//     for (let i = 0; i < ficheArray.length; i++) {
//       if (
//         arrayFicheDisplayNone.indexOf(
//           ficheArray[i].getAttribute("aria-labelledby")
//         ) !== -1
//       ) {
//         ficheArray[i].style.display = "none";
//       } else if (
//         arrayFicheDisplayNone.indexOf(
//           ficheArray[i].getAttribute("aria-labelledby")
//         ) === -1
//       ) {
//         ficheArray[i].style.display = "flex";
//       }
//     }
//   });
// }

// function ifTagClose() {
//   tagContainer.addEventListener("mousedown", (e) => {
//     let cible = e.target;
//     let cibleClose = cible.getAttribute("class");
//     if (cibleClose == "btn-close") {
//       let ciblelabelledby = cible.getAttribute("aria-labelledby");
//       let index = arrayTag.indexOf(ciblelabelledby);
//       arrayTag.splice(index, 1);
//       findObjectAffichage(tagContainer);
//     }
//   });
// }

// function inputFindObject() {
//   const searchInputPrincipal = document.getElementById("search__Input");
//   const ficheArray = document.querySelectorAll(".fiche");
//   searchInputPrincipal.addEventListener("keyup", () => {
//     let InputSuggestion = "";
//     for (let i = 0; i < recettes.length; i++) {
//       let inputValue = searchInputPrincipal.value;
//       const resultComparing = recettes[i].name.toLowerCase();
//       if (resultComparing.includes(inputValue.toLowerCase())) {
//         if (inputValue !== "" && inputValue.length > 2) {
//           InputSuggestion += `<p class="suggestion">${resultComparing}</p> `;
//           document.querySelector(".container__suggestion").innerHTML =
//             InputSuggestion;
//         } else if (inputValue === "" || inputValue.length < 2) {
//           ficheArray[i].style.display = "flex";
//           document.querySelector(".container__suggestion").innerHTML = "";
//         }
//       }
//     }
//   });
// }

// function inputFindLink() {
//   const ingredientAllLink = containerIngredient.querySelectorAll(".link");
//   ingredientInput.addEventListener("keyup", () => {
//     for (let i = 0; i < ingredientAllLink.length; i++) {
//       let inputValue = ingredientInput.value;
//       const resultComparing = ingredientAllLink[i].textContent.toLowerCase();
//       if (resultComparing.indexOf(`${inputValue}`) !== -1) {
//         ingredientAllLink[i].style.display = "block";
//       } else {
//         ingredientAllLink[i].style.display = "none";
//       }
//     }
//   });
// }

// function inputFindObjectClick() {
//   containerSuggestion.addEventListener("mouseup", (e) => {
//     arrayTag.push(e.target.textContent);
//     findObjectAffichage(containerSuggestion);
//   });
// }

// function ifTagClose() {
//   tagContainer.addEventListener("mousedown", (e) => {
//     let cible = e.target;
//     let cibleClose = cible.getAttribute("class");
//     if (cibleClose == "btn-close") {
//       let ciblelabelledby = cible.getAttribute("aria-labelledby");
//       let index = arrayTag.indexOf(ciblelabelledby);
//       arrayTag.splice(index, 1);
//       findObjectAffichage(tagContainer);
//     }
//   });
// }
