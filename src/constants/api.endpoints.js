// const baseUrl = 'https://rest-api-books.vercel.app/api/v1';
const baseUrl = 'http://localhost:3000/api/v1';
const books = baseUrl + "/products";
const auth = baseUrl + "/auth";
const cart = baseUrl + "/cart";

export const API_ENDPOINTS = {
    books: {
        getBooks: books
    },
    auth: {
        login: auth + "/login",
        signup: auth + "/signup",
        guest: auth + "/guest"
    },
    cart: {
        cart,
        removeItemFromCart: cart + "/remove",
        deleteItemFromCart: cart + "/delete"
    }
}