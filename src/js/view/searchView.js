class SearchView {
  _parenteElement = document.querySelector('.search');

  getQuery() {
    const query = this._parenteElement.querySelector('.search__field').value;

    // 4) Clear results
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._parenteElement.querySelector('.search__field').value = '';
  }

  addHeadlerSeach(handler) {
    this._parenteElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
