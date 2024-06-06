import Hero from "../../components/hero/Hero.jsx";

import style from "./Home.module.css";
import {useHttp} from "../../hooks/useHttp.js";

import {getRecentBooks} from "../../api/books.js";
import BookList from "../../components/book-list/BookList.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

export default function Home() {
    const {
        data: recentlyAddedBooksData,
        isLoading: isRecentlyAddedBooksLoading,
        error: recentlyAddedBooksError
    } = useHttp({url: getRecentBooks, defaultValue: []});

    const recentlyAddedBooks = isRecentlyAddedBooksLoading === false ?
        <BookList caption={"Recently added"} books={recentlyAddedBooksData}/> : <Spinner style={{marginTop: "2em"}}/>


    return (
        <section className={style.container}>
            <Hero/>
            {recentlyAddedBooks}
        </section>
    )
}