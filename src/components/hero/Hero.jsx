import style from "./Hero.module.css";

import banner from "../../assets/Banner.jpg";

export default function Hero() {
    return (
        <section className={style.hero}>
            <img src={banner} alt=""/>
        </section>
    )
}