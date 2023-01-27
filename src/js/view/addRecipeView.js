import View from './View.js';
// import icons from '../img/icons.svg'; // assim que funciona a importação no parcel 1;
import icons from 'url:../../img/icons.svg'; // assim que funciona a importação no parcel 2 para quaisquer imagem, video ou arquivo de som, precisamos escrever URL

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully upload :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Irá retornar um objeto
      const dataArr = [...new FormData(this)];
      // Esse dados serão para fazer upload para a API, e essa ação para enviar os dados vai ser apenas uma chamada API

      // pega a matriz de entrada e converte em objeto
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
