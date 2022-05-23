import { recettes } from "../factories/filtreFactoryAffichage.js";

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

let arrayTag = [];
let arrayIngredientTemp = [];
let arrayUstensilsTemp = [];
let arrayAppareilsTemp = [];

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
        if (arrayIngredientTemp.length == 0) {
          ficheArray[i].style.display = "flex";
        }
      }
    }
  });
}

function ifTagClose() {
  tagContainer.addEventListener("click", (e) => {
    let cible = e.target;
    let cibleClose = cible.getAttribute("class");
    if (cibleClose == "btn-close") {
      if (arrayTag.length === 1) {
        arrayTag = [];
        findObjectAffichage(tagContainer);
        console.log(arrayTag);
      } else {
        let ciblelabelledby = cible.getAttribute("aria-labelledby");
        let stringValue = arrayTag.join(",").replace(`,${ciblelabelledby}`, "");
        arrayTag = stringValue.split(",");
        findObjectAffichage(tagContainer);
        console.log(arrayTag);
      }
    }
  });
}

function inputFindObject() {
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
          ficheArray[i].style.display = "flex";
          let arrayTampon = [...recettes[i].ingredients];
          for (let x = 0; x < arrayTampon.length; x++) {
            arrayIngredientTemp.push(
              `${arrayTampon[x].ingredient.toLowerCase()}`
            );
          }
          for (let x = 0; x < recettes[i].ustensils.length; x++) {
            arrayUstensilsTemp.push(
              `${recettes[i].ustensils[x].toLowerCase()}`
            );
          }
          arrayAppareilsTemp.push(`${recettes[i].appliance.toLowerCase}`);
        } else if (inputValue === "" || inputValue.length < 2) {
          ficheArray[i].style.display = "flex";
          arrayTag = [];
          document.querySelector(".container__suggestion").innerHTML = "";
          arrayIngredientTemp = [];
          arrayUstensilsTemp = [];
          arrayAppareilsTemp = [];
        } else {
        }
      } else {
        ficheArray[i].style.display = "none";
      }
      supprLinkInFiltre(ingredientAllLink, arrayIngredientTemp);
      supprLinkInFiltre(ustensilAllLink, arrayUstensilsTemp);
      supprLinkInFiltre(appareilAllLink, arrayAppareilsTemp);
    }
  });
}

function inputFindLink(action, array) {
  action.addEventListener("keyup", () => {
    for (let i = 0; i < array.length; i++) {
      let inputValue = action.value;
      const resultComparing = array[i].textContent.toLowerCase();
      if (resultComparing.indexOf(`${inputValue}`) !== -1) {
        array[i].style.display = "block";
      } else {
        array[i].style.display = "none";
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
    for (let i = 0; i < fixedArraylen; i++) {
      if (!(inputArray.indexOf(fixedArray[i]) >= 0)) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

function supprLinkInFiltre(array, arrayCompare) {
  if (arrayCompare.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let ciblelabelledby = array[i].getAttribute("aria-labelledby");
      if (arrayCompare.indexOf(`${ciblelabelledby}`) !== -1) {
        array[i].style.display = "block";
      } else {
        array[i].style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "block";
    }
  }
}

findObjectAffichage(changeTag);
filterTag(containerIngredient, ingredientColor);
filterTag(containerAppareil, appareilColor);
filterTag(containerUstensil, ustensileColor);
ifTagClose();
inputFindLink(ingredientInput, ingredientAllLink);
inputFindLink(appareilInput, appareilAllLink);
inputFindLink(ustensilInput, ustensilAllLink);
inputFindObject();
inputFindObjectClick();

// function ifTagClose() {
//   tagContainer.addEventListener("click", (e) => {
//     let cible = e.target;
//     let cibleClose = cible.getAttribute("class");
//     if (cibleClose == "btn-close") {
//       .log(arrayTag.length);
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
//       // .log(arrayTemp);

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
//           ficheArray[i].style.display = "flex";
//           let arrayTampon = [...recettes[i].ingredients];
//           for (let x = 0; x < arrayTampon.length; x++) {
//             arrayIngredientTemp.push(
//               `${arrayTampon[x].ingredient.toLowerCase()}`
//             );
//           }
//           for (let x = 0; x < recettes[i].ustensils.length; x++) {
//             arrayUstensilsTemp.push(
//               `${recettes[i].ustensils[x].toLowerCase()}`
//             );
//           }
//           arrayAppareilsTemp.push(`${recettes[i].appliance.toLowerCase}`);
//         } else if (inputValue === "" || inputValue.length < 2) {
//           ficheArray[i].style.display = "flex";
//           arrayTag = [];
//           document.querySelector(".container__suggestion").innerHTML = "";
//           arrayIngredientTemp = [];
//           arrayUstensilsTemp = [];
//           arrayAppareilsTemp = [];
//         } else {
//         }
//       } else {
//         ficheArray[i].style.display = "none";
//       }
//     }
//   });
// }
