import {API_ENDPOINTS} from "../constants/api.endpoints.js";

export const addItemToCartSettings = (itemId, accessToken) => {
    return {
        url: API_ENDPOINTS.cart.addItemToCart + "/" + itemId,
        settings: {
            method: "Post",
            headers: {
                "Authorization": accessToken
            }
        }
    }
}

export const removeItemFromCartSettings = (itemId, accessToken) => {
    return {
        url: API_ENDPOINTS.cart.removeItemFromCart + "/" + itemId,
        settings: {
            method: "Post",
            headers: {
                "Authorization": accessToken
            }
        }
    }
}