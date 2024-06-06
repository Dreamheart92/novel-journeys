import {useEffect} from "react";

export default function Form({formData, children, ...props}) {
    useEffect(() => {
        if (formData) {
            console.log("form data");
        }
    }, [formData]);

    return (
        <form {...props}>
            {children}
        </form>
    )
}