import React, { useContext } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { BiLogOut } from 'react-icons/bi';
const NavBar = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleLogOut = ()=>{
        logOut()
        .then(()=>{})
        .catch(error=>console.log(error))
    }
    if(user)
    {
        // console.log(user);
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Book Vibe</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <CiShoppingCart className='text-3xl'></CiShoppingCart>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                   {
                    user ?
                    <button className="btn btn-soft btn-success" onClick={handleLogOut}>Logout</button>
                    :
                    <Link to='/login'><button className="btn btn-soft btn-success">Login</button></Link>
                   }
                </div>
            </div>
        </div>
    );
};

export default NavBar;