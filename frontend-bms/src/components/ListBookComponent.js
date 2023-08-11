import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../BackendService/BookService';
import BookDashboard from '../Dashboard/BookDashboard';
import './FeaturedBook.css';

const ListBookComponent = () => {
  const [book, setBook] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    BookService.getBooks().then((response) => {
        setBook(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteBookById = (bookId) => {
    console.log(bookId);
    BookService.deleteBook(bookId).then((response) => {
        getAllBooks();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handleSearch = () => {
    BookService.searchBooks(searchTitle, searchAuthor)
      .then((response) => {
        setBook(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <div>
        <BookDashboard />
        <div className="background-img">
        <div className="container">
            
            <div className="featured-books-container">
            <h2 className="text-center"> All Books </h2>
            <div className="search-form">
              <input
                type="text"
                placeholder="Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
              <div className="book-list">
                {book.map((book) => (
                  <div className="book-card" key={book.id}>
                    <div className="book-thumbnail-container">
                        <img src={book.imageUrl} alt={book.title} className="book-thumbnail"/>
                        {book.featured && <div className="featured-label">Featured</div>}
                    </div>
                    <div className="book-details">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <p>Price: {book.price}</p>
                      <p>
                        <Link className="btn btn-info" to={`/update/${book.id}`}>
                          Update
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteBookById(book.id)}
                          style={{ marginLeft: '10px' }}>
                          Delete
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBookComponent;
