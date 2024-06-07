import style from "./Button.module.css";

export default function Button({className, children, ...props}) {
    const buttonStyle = style[className] || style.primary;

    return (
        <button className={`${buttonStyle} ${style.btn}`} {...props}>{children}</button>
    )
}