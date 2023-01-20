import View from './View.js';
// import icons from '../img/icons.svg'; // assim que funciona a importação no parcel 1;
import icons from 'url:../../img/icons.svg'; // assim que funciona a importação no parcel 2 para quaisquer imagem, video ou arquivo de som, precisamos escrever URL

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      // Usando delegação de eventos
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._getMarkupButtonPrev(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._getMarkupButtonNext(curPage);
    }
    // Other page
    if (curPage < numPages) {
      return `${this._getMarkupButtonNext(curPage)}${this._getMarkupButtonPrev(
        curPage
      )}`;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _getMarkupButtonPrev(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> 
  `;
  }
  _getMarkupButtonNext(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
    `;
  }
}

export default new PaginationView();
