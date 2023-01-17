import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

// Esta função não vai retornar nada, tudo que ela fará é mudar nosso objeto de estado
export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      // pegando a saída da receita
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
    alert(err);
  }
};
