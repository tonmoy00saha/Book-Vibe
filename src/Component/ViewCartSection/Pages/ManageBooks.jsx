import { AiOutlineDelete } from "react-icons/ai";
import useBook from "../../Hook/useBook";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageBooks = () => {
    const [books, refetch] = useBook();
    const axiosSecure = useAxiosSecure();
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/book/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold text-center">Manage Books</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white text-lg">
                        <tr>
                            <th></th>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td><img className="w-20" src={item.image} alt="" /></td>
                                <td>{item.bookName}</td>
                                <td>{item.price} BDT</td>

                                <td>
                                <Link to={`/viewcart/updateBook/${item._id}`}>
                                <button className="bg-orange-500 btn p-3"><FaEdit className="text-white text-lg"></FaEdit></button>
                                </Link>
                                </td>
                                <td><button onClick={() => handleDelete(item)}
                                    className="bg-red-700 btn p-3"><AiOutlineDelete className="text-white text-lg"></AiOutlineDelete></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooks;