import BookCard from "../book-card/BookCard.jsx";

import style from "./BookList.module.css";

export default function BookList({caption, books, error}) {

    return (
        <section className={style.container}>
            {error && <h3>Failed to fetch data...</h3>}

            {!error &&
                <>
                    <h3>{caption}</h3>
                    <section className={style['books-list']}>
                        {books.products.slice(0, 7).map(book =>
                            <BookCard key={book._id} book={book}/>
                        )}
                    </section>
                </>
            }

        </section>
    )
}