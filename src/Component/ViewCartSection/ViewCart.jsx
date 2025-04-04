import { FaEnvelope, FaHome, FaList, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hook/useCart";
import { MdReviews } from "react-icons/md";


const ViewCart = () => {
    const [cart] = useCart();
    const isAdmin = true;
    return (
        <div className="flex gap-12">
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/viewcart/adminHome">
                                        <FaHome className="text-2xl font-semibold"></FaHome>  <h2 className="text-lg font-semibold text-white">Admin Home</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/addBook">
                                        <FaShoppingCart className="text-2xl font-semibold"></FaShoppingCart> <h2 className="text-lg font-semibold text-white">Add Book</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/manageBooks">
                                        <FaList className="text-2xl font-semibold"></FaList> <h2 className="text-lg font-semibold text-white">Manage Books</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/allUsers">
                                        <FaUser className="text-2xl font-semibold"></FaUser> <h2 className="text-lg font-semibold text-white">All Users</h2>
                                    </NavLink>
                                </li>

                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/viewcart/userHome">
                                        <FaHome className="text-2xl font-semibold"></FaHome>  <h2 className="text-lg font-semibold text-white">User Home</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/cart">
                                        <FaShoppingCart className="text-2xl font-semibold"></FaShoppingCart> <h2 className="text-lg font-semibold text-white"> My Cart ({cart.length})</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/review">
                                        <MdReviews className="text-2xl font-semibold"></MdReviews> <h2 className="text-lg font-semibold text-white">Add Reviews</h2>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/viewcart/paymentHistory">
                                        <FaList className="text-2xl font-semibold"></FaList> <h2 className="text-lg font-semibold text-white">Payment History</h2>
                                    </NavLink>
                                </li>

                            </>
                    }

                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome className="text-2xl font-semibold"></FaHome>  <h2 className="text-lg font-semibold text-white"> Home</h2>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/viewcart/contact">
                            <FaEnvelope className="text-2xl font-semibold"></FaEnvelope> <h2 className="text-lg font-semibold text-white">Contact</h2>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default ViewCart;