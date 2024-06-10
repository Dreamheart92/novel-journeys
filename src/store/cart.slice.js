import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {calculateCartQuantityAndCost} from "../utility/calculateCartQuantityAndCost.js";
import {sendHttpRequest} from "../hooks/useHttp.js";
import {addItemToCartSettings, removeItemFromCartSettings} from "../api/cart.js";

const initialState = {cart: [], isCartOpen: false, total: {price: 0, quantity: 0}};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeItemFromCart(state, action) {

        },
        openCart(state, action) {
            state.isCartOpen = true;
        },
        closeCart(state, action) {
            state.isCartOpen = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                const {actionType, book} = action.payload;

                switch (actionType) {
                    case "add" : {
                        const isBookAlreadyInCart = state.cart.find(item => item.book._id === book._id);

                        if (isBookAlreadyInCart) {
                            isBookAlreadyInCart.quantity++;
                        } else {
                            state.cart.push({book, quantity: 1});
                        }
                        break;
                    }

                    case "remove" : {
                        const bookItem = state.cart.find(item => item.book._id === book._id);

                        bookItem.quantity -= 1;

                        if (bookItem.quantity <= 0) {
                            state.cart.splice(bookItem, 1);
                        }
                        break;
                    }
                }


                state.total = calculateCartQuantityAndCost(state.cart);
                state.isLoading = false;
            })
            .addCase(updateCart.rejected, (state, action) => {
                console.log("rejected");
                state.isLoading = false;
            })
    }
})

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (data, {dispatch}) => {
        const {actionType, book, accessToken} = data;

        const requestSettings = actionType === "add"
            ? addItemToCartSettings(book._id, accessToken)
            : removeItemFromCartSettings(book._id, accessToken);

        try {
            const response = await sendHttpRequest(requestSettings.url, requestSettings.settings);

            if (!response.success) {
                throw response;
            }

            return {book: data.book, actionType};
        } catch (error) {
            throw error;
        }
    }
)

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;