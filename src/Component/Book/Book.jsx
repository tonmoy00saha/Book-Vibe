
import Tag from '../Tag/Tag';
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';
import '../Shared/Shared.css'
const Book = ({book}) => {
    const {image, bookName, tags, author, category, rating, bookId} = book;
    return (
        <Link to={`/book/${bookId}`}>
        <div className="card bg-base-100 shadow-xl space-y-4 ">
            <figure className="px-10 pt-10 ">
                <img
                    src={image}
                    alt={bookName}
                    className="rounded-xl h-60 " />
            </figure>
            <div className="card-body ">
                <div className='flex gap-2'>
                 {
                    tags.map((tag,id)=><Tag key={id} tag={tag}></Tag>)
                 }
                </div>
                <h2 className="card-title playfair text-2xl font-bold">{bookName}</h2>
                <p className='worksans text-[#131313CC] font-medium'>By : {author}</p>
                <hr className='border-b-2 border-dashed'/>
                <div className='flex justify-between items-center worksans font-medium text-[#131313CC]'>
                    <h4>{category}</h4>
                    <div className='flex gap-2 items-center'>
                    <p>{rating}</p>
                    <CiStar></CiStar>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default Book;