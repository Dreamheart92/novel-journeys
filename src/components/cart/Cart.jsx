import style from "./Cart.module.css";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {cartActions, updateCart} from "../../store/cart.slice.js";
import CartItem from "../cart-item/CartItem.jsx";
import Button from "../shared/button/Button.jsx";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceFrown} from "@fortawesome/free-regular-svg-icons/faFaceFrown";

export default function Cart() {
    const dispatch = useDispatch();
    const {cart, isCartOpen, total, isLoading, error} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.user);
    const cartRef = useRef();

    const cartStyle = `${isCartOpen ? style.open : ""} ${style.cart}`;
    const containerStyle = `${isCartOpen ? style.backdrop : null}`;

    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isLoading) {
            intervalId = setInterval(() => {
                setLoadingProgress(state => state + 10);
            }, 50)
        } else {
            setLoadingProgress(100);
            setTimeout(() => {
                setLoadingProgress(0);
            }, 100);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [isLoading]);

    const handleCloseCart = (event) => {
        if (!cartRef.current.contains(event.target)) {
            dispatch(cartActions.closeCart());
        }
    }

    const handleIncreaseQuantity = async (book) => {
        dispatch(updateCart({book, accessToken: user.accessToken, actionType: "add"}));
    }

    const handleDecreaseQuantity = (book) => {
        dispatch(updateCart({book, accessToken: user.accessToken, actionType: "remove"}));
    }

    return (
        createPortal(
            <section onClick={handleCloseCart} className={containerStyle}>
                <div ref={cartRef} className={cartStyle}>

                    <div className={style['cart-wrapper']}>

                        <div className={style['cart-heading']}>
                            <h3>Shopping cart</h3>

                            <button onClick={() => dispatch(cartActions.closeCart())}
                                    className={style['close-cart']}>Close
                            </button>
                        </div>

                        {cart.length > 0 && isCartOpen &&
                            <>
                                <div className={style['cart-items']}>
                                    {cart.map(item => (
                                        <CartItem
                                            key={item.product._id}
                                            item={item}
                                            onIncreaseQuantity={handleIncreaseQuantity}
                                            onDecreaseQuantity={handleDecreaseQuantity}/>
                                    ))}
                                </div>


                                <div className={style.checkout}>

                                    {error &&
                                        <p className={"error"}>A technical error has occurred, please try again later or
                                            contact our customer service.</p>
                                    }

                                    <div className={style.subtotal}>
                                        <h4>Subtotal:</h4>
                                        <p>&#8364;{total.cost.toFixed(2)}</p>
                                    </div>

                                    <div>
                                        <Button>
                                            Checkout
                                        </Button>
                                    </div>
                                </div>
                            </>
                        }

                        {cart.length <= 0 && isCartOpen &&
                            <div className={style['empty-cart']}>
                                <FontAwesomeIcon style={{fontSize: "2em"}} icon={faFaceFrown}/>

                                <h3>Your cart is currently empty</h3>

                                <div style={{width: "10em"}}>
                                    <Button>Back to shop</Button>
                                </div>
                            </div>
                        }


                        {loadingProgress > 0 &&
                            <>
                                <div className={style.loading}>
                                    <div style={{width: `${loadingProgress}%`}} className={style.progress}></div>
                                </div>
                            </>
                        }

                    </div>
                </div>
            </section>
            , document.getElementById("cart"))
    )
}