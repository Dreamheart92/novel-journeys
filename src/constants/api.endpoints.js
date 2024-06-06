const baseUrl = 'http://localhost:3000/api/v1';

const books = baseUrl + "/products";
const auth = baseUrl + "/auth";

export const API_ENDPOINTS = {
    books: {
        getBooks: books
    },
    auth: {
        login: auth + "/login",
        signup: auth + "/signup"
    }
}