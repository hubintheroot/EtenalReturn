import Rotation from "./Rotation.js";

class ContentContainer {
    $container = null;
    data = null;

    constructor({ $target }) {
        this.$container = document.createElement('div');
        this.$container.classList.add('contents-container');

        $target.appendChild(this.$container);

        this.setState();
    }

    setState(nextdata) {
        this.data = nextdata;
        this.render();
    }

    render() {
        this.$container.innerHTML = `
        <h2 class="content-title">실험체</h2>
        `;
        
        this.Rotation = new Rotation({
            $target: this.$container,
        });
    }
}

export default ContentContainer;