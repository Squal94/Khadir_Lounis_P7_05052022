import {
  arrayIngredients,
  arrayAppareils,
  arrayUstensils,
  recettes,
} from "../factories/filtreFactoryAffichage.js";

import { arrayTag } from "../search/tag_filtre.js";

function findObject() {
  const changeTag = document.querySelector(".filtres__container");
  let checker = (arr, target) => target.every((v) => arr.includes(v));
  changeTag.addEventListener("click", (e) => {
    let arrayFicheDisplayNone = [];
    for (let i = 0; i < recettes.length; i++) {
      let valueToCompare = [];

      let valueOfUstensils = [...recettes[i].ustensils];

      for (let i = 0; i < valueOfUstensils.length; i++) {
        valueToCompare.push(valueOfUstensils[i].toLowerCase());
      }

      valueToCompare.push(recettes[i].appliance.toLowerCase());

      let valueOfIngredients = [...recettes[i].ingredients];

      for (let i = 0; i < valueOfIngredients.length; i++) {
        valueToCompare.push(valueOfIngredients[i].ingredient.toLowerCase());
      }

      if (checker(valueToCompare, arrayTag) === false) {
        arrayFicheDisplayNone.push(recettes[i].name);
      }
    }

    const ficheArray = document.querySelectorAll(".fiche");
    for (let i = 0; i < ficheArray.length; i++) {
      if (
        arrayFicheDisplayNone.indexOf(
          ficheArray[i].getAttribute("aria-labelledby")
        ) !== -1
      ) {
        ficheArray[i].style.display = "none";
      }
    }
  });
}

findObject();
