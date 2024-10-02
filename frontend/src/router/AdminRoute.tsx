import { AuthContext } from "@/contexts/AuthProvider";
import useAdmin from "@/hooks/useAdmin";
import Loading from "@/pages/Loading";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
    const{user, loading} = useContext(AuthContext)
    const [isAdmin, isPending] = useAdmin();
    const location = useLocation();

    if (loading || isPending) {
      console.log("loading inside admin route");
      return <Loading></Loading>;
    }
    if(user && isAdmin === true){
        return children
    }
    console.log('not an admin,check admin route');
    return <Navigate to='/login' state={{from : location}} replace></Navigate>
};

export default AdminRoute;