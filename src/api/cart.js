import {API_ENDPOINTS} from "../constants/api.endpoints.js";
import {sendHttpRequest} from "../hooks/useHttp.js";
import {cartActions} from "../store/cart.slice.js";

export const addItemToCartSettings = (itemId, accessToken) => {
    return {
        url: API_ENDPOINTS.cart.cart + "/" + itemId,
        settings: {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
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
                "Content-Type": "application/json"
            }
        }
    }
}

export const getCartSettings = (accessToken) => {
    return {
        url: API_ENDPOINTS.cart.cart,
        settings: {
            method: "Get",
        }
    }
}

export const getGuestCartSettings = (data) => {
    return {
        url: API_ENDPOINTS.cart.cart,
        settings: {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
        }
    }
}

export const getUserCart = async (dispatch) => {
    const cartRequestSettings = getCartSettings();
    sendHttpRequest(cartRequestSettings.url, cartRequestSettings.settings)
        .then((response) => {
            if (response.success) {
                dispatch(cartActions.updateCart({cart: response.data}));
            }
        })
        .catch((error) => console.log(error));
}