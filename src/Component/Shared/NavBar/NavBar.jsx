import React, { useContext } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

import useCart from '../../Hook/useCart';
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <div className="">
                <Link to="/"><button className='btn btn-ghost text-xl'>Book Vibe</button></Link>
            </div>
            <div>
                {user ? <h3 className='text-2xl font-bold text-red-500'>{user.displayName}</h3> : <h3></h3>}
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <CiShoppingCart className='text-3xl'></CiShoppingCart>
                            <span className="badge badge-sm indicator-item">{cart.length}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{cart.length} Items</span>
                            <span className="text-info">Subtotal: {totalPrice} BDT</span>
                            <div className="card-actions">
                                <Link to="/viewcart/cart"><button className="btn btn-primary btn-block">View cart</button></Link>
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