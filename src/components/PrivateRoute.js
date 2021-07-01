import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            props.users.currentUser ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

function mapStateToProps(users){
    return {
        users
    }
}

export default PrivateRoute;