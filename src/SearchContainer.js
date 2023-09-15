import SearchForm from "./SearchForm.js";

class SearchContainer {
    $searchContainer = null;
    onSearch = null;

    constructor({ $target, onSearch }) {
        this.onSearch = onSearch;
        const $searchContainer = document.createElement('div');
        this.$searchContainer = $searchContainer;
        this.$searchContainer.className = 'search-container';
        $target.appendChild(this.$searchContainer);

        this.render();
    }
    
    render() {
        this.$searchContainer.innerHTML = `
        <h1 class="main-title">Eternal Return</h1>
        `;

        this.SearchForm = new SearchForm({
            $target: this.$searchContainer,
            onSearch: this.onSearch,
        });
    }
}

export default SearchContainer;