const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '3836d307';

export const search = async (query) => {
    const url = `${BASE_URL}?plot=full&type=movie&s=${query}&apiKey=${API_KEY}`;
    try {
        const res = await fetch(url);
        const result = await res.json();
        return result['Search'];
    } catch(e) {
        throw Error(e);
    }
}

export const getDetails = async (id) => {
    const url = `${BASE_URL}?i=${id}&apiKey=${API_KEY}`;
    try {
        const res = await fetch(url);
        return res.json();
    } catch(e) {
        throw Error(e);
    }
}
