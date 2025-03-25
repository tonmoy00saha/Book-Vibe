import { useLoaderData, useParams } from "react-router-dom";
import BookDetailstag from "../BookDetailsTag/BookDetailstag";


const BookDetails = () => {
    const books = useLoaderData();
    const { bookId } = useParams();
    const book = books.find(book => book.bookId === bookId);
    const { image, bookName, author, review, category, tags, totalPages, publisher, yearOfPublishing, rating } = book;
    const handleAddtoCart=e=>{
        console.log('book added');
    }
    return (
        <div className="my-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-[#1313130D] p-16 rounded-3xl">
                <img src={image} alt="" />
            </div>
            <div className="space-y-4">
                <h2 className="playfair text-4xl font-bold">{bookName}</h2>
                <h4 className="text-xl font-medium worksans text-[#131313CC] ">By : {author}</h4>
                <hr />
                <p className="text-xl font-medium worksans text-[#131313CC] ">{category}</p>
                <hr />
                <p className="worksans text-[#131313B3] "><span className="font-bold text-black">Review: </span>{review}</p>
                <div className="flex gap-4 items-center">
                    <p className="font-bold worksans">Tag</p>
                    <div className="flex gap-3">
                        {
                            tags.map((tag, id) => <BookDetailstag key={id} tag={tag}></BookDetailstag>)
                        }
                    </div>
                </div>
                <hr />
                <table className="table worksans">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Number of Pages:</td>
                            <td className="font-semibold text-[#131313]">{totalPages}</td>

                        </tr>
                        <tr>
                            <td>Publisher: </td>
                            <td className="font-semibold text-[#131313]">{publisher}</td>

                        </tr>
                        <tr>
                            <td>Year of Publishing: </td>
                            <td className="font-semibold text-[#131313]">{yearOfPublishing}</td>

                        </tr>
                        <tr>
                            <td>Rating: </td>
                            <td className="font-semibold text-[#131313]">{rating}</td>

                        </tr>
                    </tbody>
                </table>
                <div className="worksans text-lg flex gap-4">
                    <button className="btn btn-outline font-semibold" onClick={handleAddtoCart}>Add to Cart</button>       
                </div>
            </div>
        </div>
    );
};

export default BookDetails;