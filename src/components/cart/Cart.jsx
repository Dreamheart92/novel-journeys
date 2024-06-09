import style from "./Cart.module.css";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {useRef} from "react";
import {cartActions} from "../../store/cart.slice.js";

export default function Cart() {
    const dispatch = useDispatch();
    const cartRef = useRef();
    const {isCartOpen} = useSelector(state => state.cart);
    const cartStyle = `${isCartOpen ? style.open : ""} ${style.cart}`;

    const containerStyle = `${isCartOpen ? style.backdrop : null}`;

    const handleCloseCart = (event) => {
        if (!cartRef.current.contains(event.target)) {
            dispatch(cartActions.closeCart());
        }
    }

    return (
        createPortal(
            <section onClick={handleCloseCart} className={containerStyle}>
                <div ref={cartRef} className={cartStyle}>

                </div>
            </section>
            , document.getElementById("cart"))
    )
}