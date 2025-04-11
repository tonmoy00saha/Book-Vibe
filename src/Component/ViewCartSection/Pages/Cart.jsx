import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useCart from "../../Hook/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total,item)=>total+item.price,0);
    const axiosSecure = useAxiosSecure();
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div className="shadow-xl p-12 border-gray-300">
            <div className="flex justify-evenly items-center">
                <h3 className="uppercase text-3xl font-bold">Total Item: {cart.length}</h3>
                <h3 className="uppercase text-3xl font-bold">Total Price: {totalPrice}</h3>
                {cart.length ?
                    <Link to="/viewcart/confirmorder">
                        <button className="btn bg-[#D1A054]">Confirm Order</button> </Link> :
                    <button className="btn bg-[#D1A054]">Confirm Order</button>
                }

            </div>
            <div className="overflow-x-auto w-full mt-12">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-[#D1A054]">
                        <tr>
                            <th>
                            </th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE(BDT)</th>
                            <th>ACTION</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div className="font-bold">{item.bookName}</div>
                                        </div>
                                    </td>
                                    <td>

                                        <span className="badge badge-ghost badge-lg">{item.price}</span>
                                    </td>

                                    <th>
                                        <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-lg text-red-600"><FaTrash></FaTrash></button>
                                    </th>
                                </tr>
                            )
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default Cart;