import { useState } from "react";
import { db,auth } from "../../config/config";
import { addDoc, collection,getDocs, query, where ,onSnapshot} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Post = ({post})=>{

    const [likeCount,setLikeCount] = useState(null)
    const likesRef = collection(db, 'likes')
    const [user] = useAuthState(auth)

    const likesDocs = query(likesRef,where("postId","==", post.id))

    const getLikes = async()=>{
        const data = await getDocs(likesDocs);
        setLikeCount(data.docs.length)
    }

    const addLike = async ()=>{
        await addDoc(likesRef,{userId: user.uid, postId: post.id })
        

    }
    

    useEffect(()=>{
        getLikes();
        const unsubscribe = onSnapshot(likesDocs, () => {
            // When there's a change, fetch the updated likes count
            getLikes();
          });
      
          // Cleanup the listener when the component unmounts
          return () => unsubscribe();
    },[likesDocs])
    return (
      <div class="card" style={{width: "18rem;"}}>
        <div class="card-body">
          <h5 class="card-title">{post.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">@{post.username}</h6>
          <p class="card-text">
            {post.description}
          </p>
          <button onClick={addLike}>	&#128077;</button>
          {likeCount && <p>Likes: {likeCount}</p>}
          
        </div>
      </div>
    );
}

export default Post;