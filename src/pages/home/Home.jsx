import Hero from "../../components/hero/Hero.jsx";

import style from "./Home.module.css";

export default function Home() {
    return (
        <section className={style.container}>
            <Hero/>
        </section>
    )
}