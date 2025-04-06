import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";


const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading || isAdminLoading){
        return <div className="flex justify-center my-10">  <span className="loading loading-spinner loading-xl"></span></div>
    
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoute;