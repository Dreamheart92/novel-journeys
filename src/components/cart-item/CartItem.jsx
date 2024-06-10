import style from "./CartItem.module.css";

export default function CartItem({item, onIncreaseQuantity, onDecreaseQuantity}) {
    const {book, quantity} = item;

    return (
        <div className={style.wrapper}>
            <div className={style.cover}>
                <img src={book.imageUrl} alt=""/>
            </div>

            <div className={style.data}>
                <h5>{book.name}</h5>
                <p style={{color: "gray"}}>{book.author}</p>
                <p>&#8364; {book.price}</p>

                <div className={style.controls}>
                    <button onClick={() => onDecreaseQuantity(book)} className={style['quantity-controller']}>-
                    </button>
                    <p className={style.quantity}>{quantity}</p>
                    <button onClick={() => onIncreaseQuantity(book)} className={style['quantity-controller']}>+</button>
                </div>
            </div>
        </div>
    )
}