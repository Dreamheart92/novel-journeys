import BookCard from "../book-card/BookCard.jsx";

import style from "./BookList.module.css";

export default function BookList({books}) {

    return (
        <section className={style.container}>
            {books.data.products.slice(0, 5).map(book =>
                <BookCard key={book._id} book={book}/>
            )}
        </section>
    )
}