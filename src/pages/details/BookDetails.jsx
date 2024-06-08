import {useParams} from "react-router-dom";
import {useHttp} from "../../hooks/useHttp.js";
import {getBookById} from "../../api/books.js";

export default function BookDetails() {
    const {id: bookId} = useParams();
    const {data: bookData, isLoading, error} = useHttp({url: getBookById(bookId)});

    return (
        <section>
            Book details
        </section>
    )
}