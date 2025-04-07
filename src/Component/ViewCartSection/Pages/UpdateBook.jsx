import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const UpdateBook = () => {
    const { bookName, author, review, totalPages, rating, category, tags, publisher, yearOfPublishing, price, _id } = useLoaderData();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
 
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
   
            const tagsArray = data.tags.split(",").map(tag => tag.trim());

            const bookDetails = {
                bookName: data.bookName,
                author: data.authorName,
                review: data.review,
                totalPages: parseInt(data.totalpage),
                rating: parseFloat(data.rating),
                category: data.category,
                tags: tagsArray,
                publisher: data.publisher,
                yearOfPublishing: data.yearofpublishing,
                price: parseFloat(data.price),
            }
            const bookRes = await axiosSecure.patch(`/book/${_id}`, bookDetails);
            if (bookRes.data.modifiedCount > 0) {
                 reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Book is Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    
    return (
        <div className="my-6">
            <h2 className="text-3xl font-semibold text-center mb-4">Update Book</h2>
            <div className="bg-base-200 p-4 my-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Book Name *</span>
                        </label>
                        <input defaultValue={bookName} {...register("bookName")} type="text" placeholder="Book Name" className="input input-bordered w-full " />

                    </div>
                    <div className="flex justify-between gap-4">
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Author Name *</span>
                            </label>
                            <input defaultValue={author} {...register("authorName")} type="text" placeholder="Author Name" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Category *</span>
                            </label>
                            <input defaultValue={category} {...register("category")} type="text" placeholder="Category" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Total Page *</span>
                            </label>
                            <input defaultValue={totalPages} {...register("totalpage")} type="text" placeholder="Total Page" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Rating *</span>
                            </label>
                            <input defaultValue={rating} {...register("rating")} type="text" placeholder="Rating" className="input input-bordered w-full " />

                        </div>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Tags *</span>
                            </label>
                            <input defaultValue={tags} {...register("tags")} type="text" placeholder="e.g. Survival, Drama" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Publisher *</span>
                            </label>
                            <input defaultValue={publisher} {...register("publisher")} type="text" placeholder="Publisher" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Year Of Publishing *</span>
                            </label>
                            <input defaultValue={yearOfPublishing} {...register("yearofpublishing")} type="text" placeholder="e.g: 1900" className="input input-bordered w-full " />

                        </div>
                        <div className=" w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Price *</span>
                            </label>
                            <input defaultValue={price} {...register("price")} type="text" placeholder="e.g: 200" className="input input-bordered w-full " />

                        </div>
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Review *</span>
                        </label>
                        <input defaultValue={review} {...register("review")} type="text" placeholder="Description" className="input input-bordered w-full textarea" />

                    </div>
                    <button className="btn my-4 bg-[#D1A054] text-white">Update Book</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;