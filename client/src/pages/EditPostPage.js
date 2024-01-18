import { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import axios from "axios";

export default function EditPostPage() {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    async function UpdatePost(event) {
        event.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);

        if(files?.[0]) {
            data.set('file', files?.[0]);
        }
        
        const response = await axios.put('http://localhost:4000/post', data);

        if(response.status == 200) {
            setRedirect(true);
        }
    }
    
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json()
                .then(post => {
                    setTitle(post.title)
                    setContent(post.content)
                    setSummary(post.summary)
                })
            )
    }, [])
    
    if(redirect) {
        return <Navigate to={`/post/${id}`} />
    }
    
    return (
        <form onSubmit={UpdatePost}>
            <input type="title" 
                placeholder={"Title"} 
                value={title} 
                onChange={ev => setTitle(ev.target.value)} 
            />
            <input type="summary" 
                placeholder={"Summary"} 
                value={summary} 
                onChange={ev => setSummary(ev.target.value)} 
            />
            <input type="file" 
                onChange={ev => setFiles(ev.target.files)} 
            />

            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: '5px' }}>Update post</button>
            
        </form>
    )
}