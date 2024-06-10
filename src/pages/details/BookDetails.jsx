import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp.js";
import {getBookById} from "../../api/books.js";

import Button from "../../components/shared/button/Button.jsx";
import Rating from "../../components/rating/Rating.jsx";
import {convertDate} from "../../utility/convertDate.js";
import {useDispatch, useSelector} from "react-redux";
import {cartActions, updateCart} from "../../store/cart.slice.js";

import style from "./BookDetails.module.css";
import Spinner from "../../components/spinner/Spinner.jsx";

export default function BookDetails() {
    const dispatch = useDispatch();
    const {id: bookId} = useParams();
    const {data: bookData, isLoading, error} = useHttp({url: getBookById(bookId)});
    const {user} = useSelector(state => state.user);

    const handleAddItemToCart = (book) => {
        dispatch(updateCart({book, accessToken: user.accessToken, actionType: "add"}));
        dispatch(cartActions.openCart());
    }

    if (isLoading) {
        return (
            <div className={style.loading}>
                <Spinner/>
            </div>
        )
    }

    return (
        <section className={style.container}>
            <div className={style.cover}>
                <img src={bookData?.imageUrl} alt=""/>
            </div>

            <div className={style.info}>
                <div className={style.test}>

                    <div className={style.heading}>
                        <h2>{bookData?.name}</h2>
                        <p>{bookData?.author}</p>
                    </div>

                    <div className={style.publisher}>
                        <h3>Publisher</h3>
                        <p>{bookData?.publisher}</p>
                    </div>

                    <div className={style.price}>
                        <span>{bookData?.price}</span>
                    </div>
                </div>

                <div className={style.data}>
                    <div className={style.wrapper}>
                        <p>Pages: </p>
                        <p>{bookData?.pages}</p>
                    </div>

                    <div className={style.wrapper}>
                        <p>Publication date: </p>
                        <p>{convertDate(bookData?.publicationDate)}</p>
                    </div>

                    <div className={style.wrapper}>
                        <p>Language: </p>
                        <p>{bookData?.language}</p>
                    </div>
                </div>

                <div className={style.genre}>
                    <div className={style.tag}>
                        <Button className={"tag"}>{bookData?.genre}</Button>
                    </div>
                </div>

                <div className={style.rating}>
                    <Rating/>
                    <p>/ 10 ratings</p>
                </div>

                <hr className={style.border}/>

                <div className={style.description}>
                    <h3>Description</h3>
                    <p>{bookData?.description}</p>
                </div>

                <div className={style.controllers}>
                    <div style={{width: "10em"}}>
                        <Button
                            onClick={() => handleAddItemToCart(bookData)}>
                            Add to cart
                        </Button>
                    </div>

                    <div style={{width: "10em"}}>
                        <Button className={"secondary"}>
                            Add to wishlist
                        </Button>
                    </div>
                </div>


            </div>
        </section>
    )
}