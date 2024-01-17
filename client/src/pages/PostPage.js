import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"

export default function PostPage() {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const { userInfo }= useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json()
                .then(post => {
                    setPost(post)
                })
            )
    }, [])
    
    if(!post) return '';
    
    return (    
        <div className="post-page">
            <h1>{post.title}</h1>
            <time>{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
            <div className="author">By @{post.author.username}</div>

            {userInfo.id === post.author._id && (
                <div className="edit-row">
                    <Link className="edit-btn" to={`/edit/${post._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                        Edit This Post
                    </Link>
                </div>
            )}
            
            <div className="image">
                <img src={`http://localhost:4000/${post.cover}`} />
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
    )
}