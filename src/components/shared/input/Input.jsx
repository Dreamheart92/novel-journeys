import style from "./Input.module.css";

export default function Input({label, type = "text", ...props}) {
    const value = props.state.value;
    const error = props.state.error;

    const showError = (error && props.state.isDirty) || (error && props.formState.isSubmittedAndHasErrors);

    return (
        <div className={style.container}>
            <label htmlFor={label}>{label[0].toUpperCase() + label.slice(1)}</label>
            <input {...props.handlers} type={type} name={label} value={value}/>

            {showError &&
                <p className="error">{Object.entries(error)[0][1]}</p>
            }
        </div>
    )
}