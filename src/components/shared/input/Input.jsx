import style from "./Input.module.css";

export default function Input({label, type = "text", children, ...props}) {
    const value = props.state.value;
    const error = props.state.error;

    const showError = error && (props.state.isDirty || props.formState.isSubmittedAndHasErrors);

    return (
        <div className={style.container}>
            <label htmlFor={label}>{children}</label>
            <input className={style['text-field']} {...props.handlers} type={type} name={label} value={value}/>

            {showError &&
                <p className="error">{Object.entries(error)[0][1]}</p>
            }
        </div>
    )
}