import style from "./BookCard.module.css";

export default function BookCard(book) {
    return (
        <div className={style.card}>
            <img src={book.book.imageUrl} alt=""/>
        </div>
    )
}