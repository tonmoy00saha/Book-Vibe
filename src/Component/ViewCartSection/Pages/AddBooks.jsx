import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBooks = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {

        // image upload to imgbb and than get an url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const tagsArray = data.tags.split(",").map(tag => tag.trim());
           
            const bookDetails = {
                bookName: data.bookName,
                author: data.authorName,
                image: res.data.data.display_url,
                review: data.review,
                totalPages: parseInt(data.totalpage),
                rating: parseFloat(data.rating),
                category: data.category,
                tags: tagsArray,
                publisher: data.publisher,
                yearOfPublishing: data.yearofpublishing,
                price: parseFloat(data.price),
            }
            const bookRes = await axiosSecure.post('/book', bookDetails);
            if (bookRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Book Inserted",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
    return (
        <div className="bg-base-200 p-4 my-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className=" w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Book Name *</span>
                    </label>
                    <input {...register("bookName", { required: true })} type="text" placeholder="Book Name" className="input input-bordered w-full " />
                    {errors.name && <span className="text-red-600">**This field is required**</span>}
                </div>
                <div className="flex justify-between gap-4">
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Author Name *</span>
                        </label>
                        <input {...register("authorName", { required: true })} type="text" placeholder="Author Name" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Category *</span>
                        </label>
                        <input {...register("category", { required: true })} type="text" placeholder="Category" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Total Page *</span>
                        </label>
                        <input {...register("totalpage", { required: true })} type="text" placeholder="Total Page" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Rating *</span>
                        </label>
                        <input {...register("rating", { required: true })} type="text" placeholder="Rating" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Tags *</span>
                        </label>
                        <input {...register("tags", { required: true })} type="text" placeholder="e.g. Survival, Drama" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Publisher *</span>
                        </label>
                        <input {...register("publisher", { required: true })} type="text" placeholder="Publisher" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Year Of Publishing *</span>
                        </label>
                        <input {...register("yearofpublishing", { required: true })} type="text" placeholder="e.g: 1900" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                    <div className=" w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price *</span>
                        </label>
                        <input {...register("price", { required: true })} type="text" placeholder="e.g: 200" className="input input-bordered w-full " />
                        {errors.name && <span className="text-red-600">**This field is required**</span>}
                    </div>
                </div>
                <div className=" w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Review *</span>
                    </label>
                    <input {...register("review", { required: true })} type="text" placeholder="Description" className="input input-bordered w-full textarea" />
                    {errors.name && <span className="text-red-600">**This field is required**</span>}
                </div>
                <div className="w-full my-6">
                    <label className="label">
                        <span className="label-text font-semibold">Image *</span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs ml-4" />
                </div>
                <button className="btn my-4 bg-[#D1A054] text-white">Add Book <FaUtensils></FaUtensils></button>
            </form>
        </div>
    );
};

export default AddBooks;