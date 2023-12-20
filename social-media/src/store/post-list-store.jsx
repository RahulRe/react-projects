import { createContext, useReducer, useState,useEffect } from "react";



export const PostList = createContext({
    postList: [],
    addPost: ()=>{},
    deletePost: ()=>{},
    fetching: false
});

const postListReducer = (currPostList,action) =>{

    let newPostList= currPostList;
    if (action.type==='Delete-Post'){
        newPostList = currPostList.filter((post)=>post.id!==action.payload.postId)

    }
    else if(action.type==="Add-Initial-Post"){
        newPostList=action.payload.posts;
    }
    else if (action.type==='Add-Post'){
        newPostList=[action.payload.post, ...currPostList]
    }
    return newPostList;

}

const PostListProvider = ({children})=>{

    const [postList,dispatchPostList] = useReducer(postListReducer,[])
    const [fetching,setFetching] = useState(false);
    
    
    const addPost = (post)=>{


        dispatchPostList({
            type: "Add-Post",
            payload:{
                post
            }
        });

    }

    const addInitialPosts = (posts)=>{


        dispatchPostList({
            type: "Add-Initial-Post",
            payload:{
                posts
            }
        });

    }
    
    const deletePost = (postId)=>{
        dispatchPostList({
            type:"Delete-Post",
            payload:{
                postId,
            },
        });
    
    }

    useEffect(()=>{
        setFetching(true)
        const controller = new AbortController();
        const signal = controller.signal;
        fetch("https://dummyjson.com/posts",{signal})
          .then((res) => res.json())
          .then(data=>{
            addInitialPosts(data.posts);
            setFetching(false)
          });

        return ()=>{
            controller.abort();
          }

    },[])

    return <PostList.Provider value={{postList,addPost,deletePost,fetching}}>{children}</PostList.Provider>;
    

}




// const DEFAULT_POSTLIST = [
//     {
//         id:'1',
//         title:'Going To Hyd',
//         body:'Chill in Hyderabad. Great Weather',
//         reactions: 2,
//         userId: 'user-11',
//         tags:['vacation','hyderabad']
//     },
//     {
//         id:'2',
//         title:'Graduating with flying colours',
//         body:'Atlast after 2 years. Great to be able complete Masters in Computer Science',
//         reactions: 15,
//         userId: 'user-1',
//         tags:['graduation','usa','masters']
//     }
// ]
export default PostListProvider;