import Form from "../../../components/form/Form.jsx";
import {useForm} from "../../../hooks/useForm.js";
import Input from "../../../components/shared/input/Input.jsx";

export default function Login() {
    const {formData, register, handleSubmit} = useForm();

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="username" {...register("username", "", {required: true, minLength: 6})}/>
                <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}