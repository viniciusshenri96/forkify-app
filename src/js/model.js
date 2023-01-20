import { async } from 'regenerator-runtime';
import { API_URL, RES_PERPAGE } from './config.js';
import { getJSON } from './helpers.js';

// o state contém todos os dados de que precisamos para construir nosso aplicativo
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PERPAGE,
  },
};

// Esta função não vai retornar nada, tudo que ela fará é mudar nosso objeto de estado
// tudo que está função faz é manipular o state, não retorna nada
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    // Está lançando o erro novamente, para poder usá-lo no controller.js
    throw err;
  }
};

// tudo que está função faz é manipular o state, não retorna nada
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥💥💥`);
    // Está lançando o erro novamente, para poder usá-lo no controller.js
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
