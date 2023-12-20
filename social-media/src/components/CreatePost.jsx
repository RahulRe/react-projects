import { useContext, useRef } from "react";
import {PostList} from "../store/post-list-store";

const CreatePost = ()=>{
    const {addPost}=useContext(PostList)
    const userIdElement = useRef();
    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const postReactionsElement = useRef();
    const postTagsElement = useRef();

    const handleSubmit = (event)=>{
        event.preventDefault();
        const userId = userIdElement.current.value;
        const postTitle = postTitleElement.current.value;
        const postBody = postBodyElement.current.value;
        const postReactions = postReactionsElement.current.value;
        const postTags = postTagsElement.current.value.split(" ")

        userIdElement.current.value="";
        postTitleElement.current.value="";
        postBodyElement.current.value="";
        postReactionsElement.current.value= "";
        postTagsElement.current.value = "";

        fetch("https://dummyjson.com/posts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title:postTitle,
            body:postBody,
            reactions: postReactions,
            userId: userId,
            tags:postTags
          }),
        })
          .then((res) => res.json())
          .then((post)=>{addPost(post)});


        


    }


    return (
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            ref={userIdElement}
            id="userId"
            placeholder="Enter userId"
            
          />
          
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control"
            ref={postTitleElement}
            id="title"
            placeholder="How are you feeling today.."
            
          />
          
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            type="text"
            className="form-control"
            ref={postBodyElement}
            id="body"
            placeholder="Tell us more about it"
            
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            Number of Reactions
          </label>
          <input
            type="text"
            className="form-control"
            ref={postReactionsElement}
            id="reactions"
            placeholder="How many people reacted on this post"
            
          />
          <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Post Tags
          </label>
          <input
            type="text"
            className="form-control"
            ref={postTagsElement}
            id="title"
            placeholder="Place tags with space in between"
            
          />
          
        </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    );

}

export default CreatePost