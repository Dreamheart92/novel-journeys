const baseUrl = 'https://rest-api-books.vercel.app/api/v1';
const books = baseUrl + "/products";
const auth = baseUrl + "/auth";
const cart = baseUrl + "/cart";

export const API_ENDPOINTS = {
    books: {
        getBooks: books
    },
    auth: {
        login: auth + "/login",
        signup: auth + "/signup"
    },
    cart: {
        addItemToCart: cart,
        removeItemFromCart: cart + "/remove",
        deleteItemFromCart: cart + "/delete"
    }
}