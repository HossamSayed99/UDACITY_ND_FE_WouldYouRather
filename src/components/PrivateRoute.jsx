import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const  PrivateRoute: React.FC<{
        component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => {

    const condition = props.user.currentUser ? true: false ;

    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/page/login"  />);
};
export  default  PrivateRoute;