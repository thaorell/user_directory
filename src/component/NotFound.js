import React from 'react';
import { Link } from 'react-router-dom';

// Simple 404 page to ask user to redirect to index page
const NotFound = () => (
    <React.Fragment>
        <center>
            <h3>Error 404: NOT FOUND. Something went wrong</h3>
            <Link to="/">Return to Home Page</Link>
        </center>
    </React.Fragment>
);
export default NotFound;