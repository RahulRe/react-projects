import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc,collection } from "firebase/firestore"
import {useAuthState} from "react-firebase-hooks/auth"
import { db,auth } from "../../config/config"
import { useNavigate } from "react-router-dom"

const CreateForm = () =>{

    const schema = yup.object().shape({
        title: yup.string().required("You must enter title."),
        description: yup.string().required("You must enter Description.")
    
    })
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const postRef = collection(db,"posts")
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const onSubmitPost = async (data)=>{
        console.log(data)
        await addDoc(postRef,{
            ...data,
            username: user?.displayName,
            id: user?.uid
        })
        navigate("/")

    }
    return (
        <form onSubmit={handleSubmit(onSubmitPost)} className="form-container" >
            <input placeholder="Title..." {...register('title')}></input>
            <textarea placeholder="Description" {...register('description')}></textarea>
            <p style={{color:"red"}}>{errors.title?.message}</p>
            <p style={{color:"red"}}>{errors.description?.message}</p>
            <input type="submit"></input>

        </form>
    )
}

export default CreateForm;