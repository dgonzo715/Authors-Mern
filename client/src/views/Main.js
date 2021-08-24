import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
export default () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ authors, setAuthors ] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors")
            .then(res=>{
                setAuthors(res.data); // Get list of authors and set it
                setIsLoaded(true); // Data loaded successfully   
            })       
    }, []);
    
    // Function that handles "Edit" button
    const sendToEditPage = (e, authorId) => {
        navigate('/edit/'+authorId);
    }

    // Function that handles "Delete" button
    const deleteAuthor = (e, authorId) => {
        axios.delete('http://localhost:8000/api/authors/' + authorId)
            .then(res=>{
                setAuthors(authors.filter(author => author._id !== authorId));
            })
    }
    // Placeholder page when loading
    if (!isLoaded) {
        return <h2>Loading authors and page...</h2>;
    }
    
    return (
        <div>
            <h1>Authors</h1>
            <Link to="/new">
                Add an author
            </Link>
            <h3 style={{color: "purple"}}>We have quotes by:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, ind) => {
                        return (
                            <tr key={ind}>
                                <td>{author.name}</td>
                                <td>
                                    <button onClick={e => {sendToEditPage(e,author._id)}}>Edit</button> 
                                    <button onClick={e => {deleteAuthor(e,author._id)}}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}