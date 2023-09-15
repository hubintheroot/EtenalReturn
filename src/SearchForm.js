import config from "./config.js";

const { SEARCH_BUTTON_ICON_PATH_D } = config;

class SearchForm {
    $SearchForm = null;
    onSearch = null;

    constructor({ $target, onSearch }) {
        this.onSearch = onSearch;
        
        const $SearchForm = document.createElement('form');
        this.$SearchForm = $SearchForm;

        this.$SearchForm.className = 'input-box';

        $target.appendChild(this.$SearchForm);

        this.render();
    }
    
    render() {
        this.$SearchForm.innerHTML = `
        <input class="input-userName" type="text" placeholder="플레이어 닉네임을 입력해주세요.">
            <button class="search-button" type="submit" aria-label=""플레이어 검색하기">
                <svg width="20" height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="${SEARCH_BUTTON_ICON_PATH_D}" fill="#9FA5B9"></path>
                </svg>
        </button>
        `;
        this.$SearchForm.addEventListener('submit', this.onSearch);

        this.$SearchForm.querySelector('input').focus();
    }
}

export default SearchForm;