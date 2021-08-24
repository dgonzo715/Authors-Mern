import React from 'react';
import { Router } from '@reach/router';
import Main from './views/Main';
import AddAuthorPage from './views/AddAuthorPage';
import EditAuthorPage from './views/EditAuthorPage';
function App() {
    return (
        <div className="App">
            <Router>
                <Main path="/"/>
                <AddAuthorPage path="/new" />
                <EditAuthorPage path="/edit/:id"/>
            </Router>
        </div>
    );
}
export default App;
