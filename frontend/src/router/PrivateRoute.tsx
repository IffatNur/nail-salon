import { AuthContext } from "@/contexts/AuthProvider";
import Loading from "@/pages/Loading";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user) {
        return children
    }
    console.log('found no user');
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;