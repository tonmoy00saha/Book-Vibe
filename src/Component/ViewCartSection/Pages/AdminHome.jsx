import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";


const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data: order = [], refetch } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders');
            return res.data;
        }
    });
    const handleButton = (id, status) => {
        axiosSecure.patch(`/orders/${id}`, {role: status})
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${status} the order`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white text-lg">
                        <tr>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Price</th>
                            <th>Transaction</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.map((item, index) => <tr key={item._id}>
                                <td>{item.userName}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.userPhone}</td>
                                <td>{item.userAddress}</td>
                                <td>{item.bookNames.join(", ")}</td>
                                <td>{item.totalPrice}</td>
                                <td>{item.transaction}</td>
                                <td>
                                    {item.status ? <span className="font-semibold">{item.status}</span> :
                                        <div className="flex gap-3">
                                            <button onClick={()=>{handleButton(item._id,'Confirmed')}} className="btn btn-success"><FaCheck></FaCheck></button>
                                            <button onClick={()=>{handleButton(item._id,'Rejected')}} className="btn btn-error"> <RxCross2></RxCross2></button>
                                        </div>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminHome;