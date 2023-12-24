import {auth,provider} from "../config/config"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Login = ()=>{
    const navigate = useNavigate() 

    const signInWithGoogle = async()=>{
        const result = await signInWithPopup(auth,provider)
        console.log(result)
        navigate("/")

    }
    return (
        <div>
            <h1>Login Page</h1>
            <p>Sign in with google</p>
            <button onClick={signInWithGoogle}>sign in with google</button>
        </div>
    )
}

export default Login;