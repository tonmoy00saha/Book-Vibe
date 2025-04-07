import React, { useEffect, useState } from 'react';
import Book from '../Book/Book';
import '../Shared/Shared.css'
import useBook from '../Hook/useBook';
const Home = () => {
    const [books] = useBook();
    return (
        <div className="my-12 space-y-9">
            <h2 className="text-center playfair font-semibold text-4xl">Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    books.map(book => <Book key={book._id} book={book}></Book>)
                }
            </div>
        </div>
    );
};

export default Home;