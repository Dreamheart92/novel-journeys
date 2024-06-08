import style from "./BookCard.module.css";
import {Link, useNavigate} from "react-router-dom";

export default function BookCard(book) {
    return (
        <div className={style.card}>
            <Link to={`/book/${book.book._id}`}>
                <img src={book.book.imageUrl} alt=""/>
            </Link>
        </div>
    )
}