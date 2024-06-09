import {createSlice} from "@reduxjs/toolkit";

const initialState = {cart: [], isCartOpen: false};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCart(state, action) {
            return state.cart;
        },
        addItemToCart(state, action) {
            const bookToAdd = action.payload.book;
            const isBookAlreadyInCart = state.cart.find(item => item.book._id === bookToAdd._id);

            if (isBookAlreadyInCart) {
                isBookAlreadyInCart.quantity++;
            } else {
                state.cart.push({book: bookToAdd, quantity: 1});
            }
        },
        removeItemFromCart(state, action) {
            const book = state.cart.find(item => item.book._id === action.payload.bookId);

            book.quantity -= 1;

            if (book.quantity <= 0) {
                state.cart.splice(book, 1);
            }
        },
        openCart(state, action) {
            state.isCartOpen = true;
        },
        closeCart(state, action) {
            state.isCartOpen = false;
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;