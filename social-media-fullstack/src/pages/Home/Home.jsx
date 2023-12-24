import { getDocs, collection } from "firebase/firestore";
import { db,auth } from "../../config/config";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useAuthState } from "react-firebase-hooks/auth";
const Home = ()=>{

    const [postList,setPostList] = useState(null);
    const postRef = collection(db, 'posts')
    const [user] = useAuthState(auth)

    const getPosts = async()=>{
        const data = await getDocs(postRef);
        setPostList(data.docs.map((doc)=>({...doc.data(),id: doc.id})))
    }
    

    useEffect(()=>{
        getPosts();
    },[])

    return (
        <>
        {user? <div>{postList?.map((post)=>(
            
            <Post post={post}/>
        ))}</div>:<h1>Login to see posts</h1> }
        
        </>
    )
}

export default Home;