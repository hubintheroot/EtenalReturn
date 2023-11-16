import DATA from "./db/data.js"
import api from "./api.js"

const { CHARACTERS_KR, CHARACTERS_EN } = DATA;

class Rotation {
    data = null;
    
    constructor({ $target }) {
        
        console.log("rotation data is running");
        this.createElements($target)
        this.getRotation();

    }
    
    createElements($target) {
        this.$section = document.createElement('section');
        this.$section.classList.add('experiment-list-section');
    
        this.$experimentTitle = document.createElement('h3');
        this.$experimentTitle.classList.add('experiment-list-title');
        
        this.$wrapper = document.createElement('div');
        this.$wrapper.classList.add('experiment-list-container');
    
        this.$experimentList = document.createElement('ul');
        this.$experimentList.classList.add('experiment-list');
    
        this.$wrapper.appendChild(this.$experimentList);
        this.$section.append(this.$experimentTitle, this.$wrapper);
        $target.appendChild(this.$section);

    }

    addEvent() {
        this.$experimentList.querySelectorAll('li').forEach((element) => {
            element.addEventListener('click', (e) => console.log(e.target));
        });
    }
    
    async getRotation() {
        const res = await api.axiosFreeRotaitons();
        const freeCharacters = res.freeCharacters.filter((v, i) =>
            res.freeCharacters.indexOf(v) === i);
        this.setState(freeCharacters);
    }
    
    testAllCharacter() {
        const num = Object.keys(CHARACTERS_EN);
        this.setState(num);
    }

    setState(nextdata) {
        this.data = nextdata;
        this.render();
    }
    
    render() {

        this.$experimentTitle.textContent = '로테이션 실험체 목록';

        if (this.data.length === 0) {
            console.log("Empty data");
        } else {
            this.$experimentList.innerHTML = this.data.map((charCode) => `
            <li class="free-rotate">
                <figure class="flex">
                    <div class="img-container">
                        <img class="experiment-img"
                        src="src/imgs/characters/${CHARACTERS_EN[charCode]}.png"
                        width="64" height="64" alt="character image">
                        <img
                        src="src/imgs/background_imgs/CharCommunity_BG.png"
                        width="64" height="64" alt="background image">
                    </div>
                    <figcaption class="experiment-name">${CHARACTERS_KR[charCode]}</figcaption>
                </figure>
            </li>
            `).join('');
            this.addEvent();
        }
    }


}

export default Rotation;