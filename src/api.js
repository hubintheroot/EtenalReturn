import config from "./config.js";

const { 
    API_KEY,
    BASE_URL,
    RANK_MODEL,
    SEASON_MODEL,
    FREE_ROTATION,
    USER_NUMBER_MODEL
 } = config;


const DEFAULT_OPTION = {
    headers: {'x-api-key': API_KEY},
};

const req = async (url, option) => {
    try {
        const res = await axios.get(url, option);
        if (res.data.code === 200) {
            return res.data;
        } else {
            throw res.data;
        }

    } catch (err) {
        console.log(err.code, err.message);
    }
};

const api = {
    axiosFreeRotaitons: () => {
        return req(`${BASE_URL}${FREE_ROTATION}`,DEFAULT_OPTION);
    },
    axiosGetSeason: () => {
        return req(`${BASE_URL}${SEASON_MODEL}`, DEFAULT_OPTION);
    },
    axiosGetUserNum: (nickname) => {
        return req(`${BASE_URL}${USER_NUMBER_MODEL}?query=${nickname}`, DEFAULT_OPTION);
    },
    axiosGetRankInfo: (userNum, seasonID) => {
        return req(`${BASE_URL}${RANK_MODEL}/${userNum}/${seasonID}/3`, DEFAULT_OPTION);
    }
};

export default api;