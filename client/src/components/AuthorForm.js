import { navigate } from '@reach/router';
import React, { useEffect, useState } from 'react';

export default (props) => {
    // Initial values of the fields (empty if adding, retrieved values if updating), plus a function that will handle
    // adding or submitting depending on what's happening, are passed through props
    const { initialName, errorVals, onSubmitFunc } = props;
    // Fields are shown below; useState hook helps us keep track of what's being typed
    const [name, setName] = useState(initialName); 

    const onSubmitHandler = (e) => {
        e.preventDefault(); // Stop form from submitting like normal - we'll do it ourselves
        onSubmitFunc({name}); // Handle the new values (post or put depending on adding/updating)
    }

    const sendHome = (e) => {
        e.preventDefault(); // MUST include, otherwise form will submit
        navigate("/"); // Redirect to home page when clicking "Cancel"
    }
    
    return(
        <form onSubmit={onSubmitHandler}>
            <p>
                <label htmlFor="name">Name:</label><br/>
                <input type="text" onChange = {(e)=>setName(e.target.value)} value={name}/><br/>
                {errorVals?.name && <span>{errorVals.name?.message}</span>}
            </p>
            <p>
                <button onClick={sendHome}>Cancel</button>
                <input type="submit"/>
            </p>
        </form>
    );
}