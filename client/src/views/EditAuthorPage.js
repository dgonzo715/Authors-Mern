import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import AuthorForm from '../components/AuthorForm';
export default props => {
    const { id } = props;
    const [author, setAuthor] = useState([]); // Now use entire object instead of each field
    const [loaded, setLoaded] = useState(false); // For making sure item is actually loaded
    const [errors, setErrors] = useState({});
    const [isFound, setIsFound] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/authors/' + id)
            .then(res => {
                setAuthor(res.data); // Get data from the item instead of setting each field individually
                setLoaded(true); // Author is loaded successfully
                setIsFound(true);
            })
            .catch(err => {
                console.log("Not found");
                setLoaded(true); // Page loaded - but error found, so isFound will remain false
                console.log(err);
            })
    }, [])

    const updateAuthor = (author) => { // Change from (e) to (author); also author is included in put arguments below
        // e.preventDefault(); // Form component will do it for us now
        axios.put('http://localhost:8000/api/authors/' + id, author)
            .then(res => {
                console.log("Edit successful");
                console.log(author.name);
                console.log(res);
                navigate('/'); // Redirect back to main page if successful
            })
            .catch(err=> {
                console.log("Errors found");
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                console.log(author.name);
                // Set Errors
                setErrors(errorResponse);
            });
    }

    if (!loaded) { // Placeholder page for loading
        return <div>Loading this author....</div>;
    }

    if (!isFound) { // Error 404 (not found) page - custom version
        return(
            <div>
                <h1>Error 404: Author not found</h1>
                <p><Link to="/new">Add author</Link></p>
                <p><Link to="/">Go back to list of authors</Link></p>
            </div>
        );
    }

    return ( // Note below: need {} and loaded variable to render the information from the database
        <div>
            <h1>Authors</h1>
            <h3 style={{color: "purple"}}>Edit an author:</h3>
            {loaded && (
            <AuthorForm onSubmitFunc={updateAuthor} 
                initialName={author.name} 
                errorVals={errors}
            />
            )}
        </div>
    )
}