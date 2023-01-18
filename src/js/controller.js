import * as model from './model.js';
import recipeView from './view/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function (e) {
  try {
    // pegando o id da receita, e usando o slice(1) para cortar o hash, saída: => 5ed6604591c37cdc054bc886
    const id = window.location.hash.slice(1);

    // Clausula de guarda
    if (!id) return;

    recipeView.renderSpinner();
    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
