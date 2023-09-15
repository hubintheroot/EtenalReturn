class RankInfo {
    $RankInfo = null;
    data = null;

    constructor({ $target }) {
        this.$target = $target;

        const $wrapper = document.createElement('div');
        const $RankInfo = document.createElement('ul');
        this.$wrapper = $wrapper;
        this.$RankInfo = $RankInfo;

        this.$RankInfo.classList.add('rank-info-container');

        $wrapper.appendChild(this.$RankInfo);
        $target.appendChild(this.$wrapper);

        this.setState({
            visible: false,
        });
    }

    show(data) {
        this.setState({
            visible: true,
            rankInfo: data
        });
    }
    

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        if (this.data.visible) {
            this.$RankInfo.innerHTML = `
            <li class="item"> ${this.data.rankInfo.nickname}</li>
            <li class="item">
                <img class="tier" src="src/imgs/rank_tier/${this.data.rankInfo.imgFileName}.png" width=32 heigth=32>
                ${this.data.rankInfo.tier}</li>
            <li class="item"> ${this.data.rankInfo.mmr}</li>
            `;
        } else {
        }
    }
}

export default RankInfo;