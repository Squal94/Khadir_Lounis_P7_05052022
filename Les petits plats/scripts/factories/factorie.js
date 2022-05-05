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

function init() {
  filtre();
}
init();
