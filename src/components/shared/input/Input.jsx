export default function Input({...props}) {
    console.log(props)

    return (
        <>
            <label htmlFor=""></label>
            <input {...props} type="text" name="name"/>
        </>
    )
}