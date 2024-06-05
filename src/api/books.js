import {API_ENDPOINTS} from "../constants/api.endpoints.js";

export const getRecentBooks = API_ENDPOINTS.baseUrl + API_ENDPOINTS.getBooks + "?sortBy=newest";