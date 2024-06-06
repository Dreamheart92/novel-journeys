import BookCard from "../book-card/BookCard.jsx";

import style from "./BookList.module.css";

export default function BookList({caption, books}) {

    return (
        <section className={style.container}>
            <h3>{caption}</h3>
            <section className={style['books-list']}>
                {books.data.products.slice(0, 7).map(book =>
                    <BookCard key={book._id} book={book}/>
                )}
            </section>
        </section>
    )
}