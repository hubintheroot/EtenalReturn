console.log("app is running");

import DATA from "./db/data.js";
import api from "./api.js";
import SearchContainer from "./SearchContainer.js";
import ContentContainer from "./ContentContainer.js";
import RankInfo from "./RankInfo.js";

const { RANK_TIER } = DATA;
const { POINTS } = RANK_TIER; 


class App {
    $target= null;
    data = null;

    constructor($target) {
        this.$target = $target;

        this.RankInfo = new RankInfo({
            $target,
        });

        this.SearchContainer = new SearchContainer({
            $target,
            onSearch: async (event) => {
                event.preventDefault();
                const $inputNickname = document.querySelector('.input-userName');
                // 닉네임을 받아 해당 유저의 랭크정보 alert
                const rankInfo = await this.getTier($inputNickname.value);
                this.RankInfo.show(rankInfo);

                $inputNickname.value = "";
            },
        });

        this.ContentContainer = new ContentContainer({
            $target
        });
    }

    getSeasonID(SeasonInfo) {
        let seasonID = null;
        SeasonInfo.data.reverse().some((seasonInfo) => {
            if (seasonInfo.isCurrent === 1) {
                seasonID = seasonInfo.seasonID;
                return true; 
            }
        });
        return seasonID;
    }

    checkTier(ranking, data) {
        return 200 >= ranking ? data[0] : data[1];
    }

    rankInfo(RankInfo) {
        const mmr = RankInfo.userRank.mmr;
        const rank = RankInfo.userRank.rank;
        let tier = "UnRanked";
        let imgFileName = null;
    
        if (rank === 0) {
        } else {
            if (700 >= rank) {
                tier = this.checkTier(rank, ["이터니티", "데미갓"]);
                imgFileName = this.checkTier(rank, [8, 7]);
            } else {
                POINTS.some((point, index) => {
                    if (mmr < point) {
                        tier = RANK_TIER[point];
                        const tierNum = 4 - parseInt((mmr - (point - 1000)) / 250);
                        tier = tier + " " + tierNum;
                        imgFileName = index + 1;
                        return true;
                    }
                });
            }
        };

        if (imgFileName===null) {
            imgFileName = 0;
        }
    
        return {
            rank: rank,
            tier: tier,
            mmr: mmr,
            imgFileName: imgFileName
        };
    }


    async getTier(nickname) {
        const resUserInfo = await api.axiosGetUserNum(nickname);
        const resSeasonInfo = await api.axiosGetSeason();
        const seasonID = this.getSeasonID(resSeasonInfo);
        const userNum = resUserInfo.user.userNum;

        const resRankInfo = await api.axiosGetRankInfo(userNum, seasonID);
        const { mmr, tier, imgFileName } = this.rankInfo(resRankInfo)
        return {
            nickname: nickname,
            tier: tier,
            mmr: mmr,
            imgFileName: imgFileName
        };
    }
}

export default App