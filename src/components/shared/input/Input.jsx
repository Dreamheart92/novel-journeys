import style from "./Input.module.css";

export default function Input({label, type = "text", ...props}) {
    console.log(props.state.error);

    return (
        <div className={style.container}>
            <label htmlFor={label}>{label[0].toUpperCase() + label.slice(1)}</label>
            <input {...props.handlers} type={type} name={label}/>

            {props.state.error &&
                <p className="error">{Object.entries(props.state.error)[0][1]}</p>
            }
        </div>
    )
}