import Star from "../star/Star.jsx";

const stars = [].fill(0, 0, 5);

export default function Rating() {
    return (
        <>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
            <Star/>
        </>
    )
}