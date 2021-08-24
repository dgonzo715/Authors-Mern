import React, { useState } from 'react';
import AuthorForm from '../components/AuthorForm';
import axios from 'axios';
import { navigate } from '@reach/router';

export default (props) => {
    const [errors, setErrors] = useState({});

    const createAuthor = (author) => {
        axios.post('http://localhost:8000/api/authors', author) // Now use entire product instead of individual fields; and product is inside parentheses
            .then(res=> {
                console.log("Successful submission");
                console.log(res);
                navigate("/");
            })
            .catch(err=> {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                // Set Errors
                setErrors(errorResponse);
            });
    }

    return (
        <div>
            <h1>Authors</h1>
            <h3 style={{color: "purple"}}>Add an author:</h3>
            <AuthorForm initialName="" onSubmitFunc={createAuthor} errorVals={errors}/>
            
        </div>
    );
}