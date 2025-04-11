import { useForm } from "react-hook-form";
import useAuth from "../../Hook/useAuth";
import useCart from "../../Hook/useCart";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const { register, handleSubmit, reset } = useForm();
    const {user} = useAuth();
    const [cart] = useCart();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const bookNames = cart.map(item => item.bookName);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const {email} = user;
    const onSubmit = async (data) => {
        if(user){
            const confirmDetails = {
                userName : data.username,
                userEmail: data.useremail,
                userPhone: data.usermobile,
                userAddress: data.useraddress,
                transaction: data.transaction,
                bookNames, 
                totalPrice
            }
            const order  = await axiosPublic.post('/orders', confirmDetails);
            if(order.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your order has been placed successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            axiosPublic.delete(`/carts/email/${email}`);
            reset();
            navigate('/');
        }
    };
    return (
        <div className="w-96 my-10">
            <div>
                <h3 className="text-2xl font-semibold text-orange-500 text-center mb-5">Order Confirmation Form</h3>
            </div>
           <div className="border-2 p-4 rounded-lg">
           <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">User Name</span>
                    </label>
                    <input defaultValue={user.displayName} {...register("username")} type="text" className="input input-bordered w-full " />
                </div>
                <div className=" w-full mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">User Email</span>
                    </label>
                    <input defaultValue={user.email} {...register("useremail")} type="text" className="input input-bordered w-full " />
                </div>
                <div className=" w-full mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">User Phone</span>
                    </label>
                    <input {...register("usermobile")} type="text" placeholder="8801234567890" className="input input-bordered w-full " />
                </div>
                <div className=" w-full mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">Delivery Address</span>
                    </label>
                    <input {...register("useraddress")} type="text" placeholder="e.g., 123 Main St, Apartment 4B, New York, NY" className="input input-bordered w-full " />
                </div>
                <div className=" w-full mb-3">
                    <label className="label">
                        <span className="label-text font-semibold">Transaction Id: </span>
                    </label>
                    <input {...register("transaction")} type="text" placeholder="Your Payment Transaction" className="input input-bordered w-full " />
                </div>

                <button className="btn my-4 bg-[#D1A054] text-white">Submit Order</button>
            </form>
           </div>
        </div>
    );
};

export default ConfirmOrder;