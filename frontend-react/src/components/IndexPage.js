import { useEffect, useState } from "react";
import Post from "./Post";

function IndexPage() {
    const[postArray, setPostArray] = useState([])

    useEffect(()=>{
        fetch('http://localhost:1050/api/users/all-posts').then((response) => {
            response.json().then((allPosts) => {
                setPostArray(allPosts)
            })
        })
    },[])
    
    return(
        <>
            {
                postArray.map((eachPost) => {
                    return (
                        <Post id={eachPost._id} post={eachPost} />
                    )
                })
            }
        </>
    )
}

export default IndexPage;
