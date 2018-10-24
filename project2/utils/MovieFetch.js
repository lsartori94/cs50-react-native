const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '3836d307';

export default class SearchFactory {
    type = 'movie';

    search = async (query, page = 1) => {
        const url = `${BASE_URL}?&page=${page}&plot=full&type=${this.type}&s=${query}&apiKey=${API_KEY}`;
        console.log(url);
        try {
            const res = await fetch(url);
            const result = await res.json();
            return result;
        } catch(e) {
            throw Error(e);
        }
    }

    getDetails = async (id) => {
        const url = `${BASE_URL}?i=${id}&apiKey=${API_KEY}`;
        try {
            const res = await fetch(url);
            return res.json();
        } catch(e) {
            throw Error(e);
        }
    }
}
