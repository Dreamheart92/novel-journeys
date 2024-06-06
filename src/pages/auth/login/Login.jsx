import Form from "../../../components/form/Form.jsx";
import {useForm} from "../../../hooks/useForm.js";
import Input from "../../../components/shared/input/Input.jsx";

export default function Login() {
    const {formData, register} = useForm();

    return (
        <div>
            <Form>
                <Input label="username" {...register("username", "", {required: true, minLength: 6})}/>
                <Input label="password" type="password" {...register("password", "", {required: true, minLength: 6})}/>
            </Form>
        </div>
    )
}