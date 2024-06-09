import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user.slice.js";
import cartSlice from "./cart.slice.js";

const store = configureStore({
    reducer: {user: userSlice, cart: cartSlice}
})

export default store;