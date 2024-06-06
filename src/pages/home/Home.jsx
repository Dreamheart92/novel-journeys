import Hero from "../../components/hero/Hero.jsx";

import style from "./Home.module.css";
import {useHttp} from "../../hooks/useHttp.js";

import {getRecentBooks} from "../../api/books.js";
import BookList from "../../components/book-list/BookList.jsx";

export default function Home() {
    const {data: recentlyAddedBooks, isLoading, error} = useHttp({url: getRecentBooks, defaultValue: []});

    return (
        <section className={style.container}>
            <Hero/>

            {isLoading === false &&
                <BookList caption={"Recently added"} books={recentlyAddedBooks}/>
            }
        </section>
    )
}