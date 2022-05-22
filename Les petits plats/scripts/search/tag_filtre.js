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

let arrayTag = [];
let ingredientColor = "ingredientColor";
let ustensileColor = "ustensileColor";
let appareilColor = "appareilColor";

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

function findObjectAffichage(source) {
  source.addEventListener("click", () => {
    let arrayFicheDisplayNone = [];
    const ficheArray = document.querySelectorAll(".fiche");
    for (let i = 0; i < recettes.length; i++) {
      let valueToCompare = [];
      let valueOfUstensils = [...recettes[i].ustensils];
      let valueOfIngredients = [...recettes[i].ingredients];

      for (let i = 0; i < valueOfUstensils.length; i++) {
        valueToCompare.push(valueOfUstensils[i].toLowerCase());
      }

      valueToCompare.push(recettes[i].appliance.toLowerCase());
      valueToCompare.push(recettes[i].name.toLowerCase());

      for (let i = 0; i < valueOfIngredients.length; i++) {
        valueToCompare.push(valueOfIngredients[i].ingredient.toLowerCase());
      }
      if (checker(arrayTag, valueToCompare) === false) {
        arrayFicheDisplayNone.push(recettes[i].name);
      }
    }

    for (let i = 0; i < ficheArray.length; i++) {
      if (
        arrayFicheDisplayNone.indexOf(
          ficheArray[i].getAttribute("aria-labelledby")
        ) !== -1
      ) {
        ficheArray[i].style.display = "none";
      } else if (
        arrayFicheDisplayNone.indexOf(
          ficheArray[i].getAttribute("aria-labelledby")
        ) === -1
      ) {
        ficheArray[i].style.display = "flex";
      }
    }
  });
}

function ifTagClose() {
  tagContainer.addEventListener("click", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      console.log(arrayTag.length);
      if (arrayTag.length === 1) {
        console.log("je marche");
        arrayTag = [];
        findObjectAffichage(tagContainer);
      } else {
        let ciblelabelledby = cible.getAttribute("aria-labelledby");
        let stringValue = arrayTag.join(",").replace(`,${ciblelabelledby}`, "");
        arrayTag = stringValue.split(",");
        console.log(arrayTag);
        findObjectAffichage(tagContainer);
      }
    }
  });
}

function inputFindObject() {
  const searchInputPrincipal = document.getElementById("search__Input");
  const ficheArray = document.querySelectorAll(".fiche");
  searchInputPrincipal.addEventListener("keyup", () => {
    let InputSuggestion = "";
    for (let i = 0; i < recettes.length; i++) {
      let inputValue = searchInputPrincipal.value;
      const resultComparing = recettes[i].name.toLowerCase();
      if (resultComparing.indexOf(`${inputValue.toLowerCase()}`) !== -1) {
        if (inputValue !== "" && inputValue.length > 2) {
          InputSuggestion += `<p class="suggestion">${resultComparing}</p> `;
          document.querySelector(".container__suggestion").innerHTML =
            InputSuggestion;
        } else if (inputValue === "" || inputValue.length < 2) {
          ficheArray[i].style.display = "flex";
          arrayTag = [];
          document.querySelector(".container__suggestion").innerHTML = "";
        } else {
        }
      }
    }
  });
}

function inputFindLink() {
  const ingredientAllLink = containerIngredient.querySelectorAll(".link");
  ingredientInput.addEventListener("keyup", () => {
    for (let i = 0; i < ingredientAllLink.length; i++) {
      let inputValue = ingredientInput.value;
      const resultComparing = ingredientAllLink[i].textContent.toLowerCase();
      if (resultComparing.indexOf(`${inputValue}`) !== -1) {
        ingredientAllLink[i].style.display = "block";
      } else {
        ingredientAllLink[i].style.display = "none";
      }
    }
  });
}

function inputFindObjectClick() {
  containerSuggestion.addEventListener("mouseup", (e) => {
    arrayTag.push(e.target.textContent);
    findObjectAffichage(containerSuggestion);
  });
}

function checker(fixedArray, inputArray) {
  let fixedArraylen = fixedArray.length;
  let inputArraylen = inputArray.length;
  if (fixedArraylen <= inputArraylen) {
    for (var i = 0; i < fixedArraylen; i++) {
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
findObjectAffichage(changeTag);
ifTagClose();
inputFindObject();
inputFindLink();
inputFindObjectClick();

// function ifTagClose() {
//   tagContainer.addEventListener("click", (e) => {
//     let cible = e.target;
//     let cibleClose = cible.getAttribute("class");
//     if (cibleClose == "btn-close") {
//       console.log(arrayTag.length);
//       if (arrayTag.length === 1) {
//         console.log("je marche");
//         arrayTag = [];
//       } else {
//         let ciblelabelledby = cible.getAttribute("aria-labelledby");
//         let stringValue = arrayTag.join(",").replace(`,${ciblelabelledby}`, "");
//         arrayTag = stringValue.split(",");
//       }
//       // arrayTag.splice(index, 1);
//       // console.log(ciblelabelledby);
//       // console.log(arrayTemp);

//       // function bou() {
//       //   var chaine = "bonjour tous tous le le monde";
//       //   alert(chaine);
//       //   if (chaine.indexOf("tous tous le") >= 0) {
//       //     chaine = chaine.replace("tous le", "");
//       //     alert(chaine);
//       //   }
//       // }
//       // console.log(ciblelabelledby);
//     }
//     //console.log(arrayTag);
//     findObjectAffichage(tagContainer);
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
//       if (resultComparing.indexOf(`${inputValue.toLowerCase()}`) !== -1) {
//         if (inputValue !== "" && inputValue.length > 2) {
//           InputSuggestion += `<p class="suggestion">${resultComparing}</p> `;
//           document.querySelector(".container__suggestion").innerHTML =
//             InputSuggestion;
//         } else if (inputValue === "" || inputValue.length < 2) {
//           ficheArray[i].style.display = "flex";
//           document.querySelector(".container__suggestion").innerHTML = "";
//           // const testLabel = ficheArray[i].getAttribute("aria-labelledby");
//           // arrayTag.push(testLabel);
//         }
//       }
//       // else {
//       //   if (inputValue === "" && inputValue.length < 1) {
//       //     const messageAlerte = document.querySelector(".message");
//       //     messageAlerte.innerHTML = "Ce site ne contient pas recette";
//       //   }
//       // }
//     }
//   });
//   //const test = document.querySelector(".search__Input");
//   // const containerSuggestion = document.createElement("div");
//   // containerSuggestion.classList.add("suggestion");
//   // test.appendChild(containerSuggestion);
//   //containerSuggestion.innerHTML = `${InputSuggestion}`;
// }
