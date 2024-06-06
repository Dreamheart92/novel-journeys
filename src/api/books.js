import {API_ENDPOINTS} from "../constants/api.endpoints.js";

export const getRecentBooks = API_ENDPOINTS.books.getBooks + "?sortBy=newest";