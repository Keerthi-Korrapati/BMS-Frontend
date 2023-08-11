import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedBook.css'
import { Switch, Route, Link } from "react-router-dom";
import BookService from '../BackendService/BookService';

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = () => {
    BookService.getBooks()
      .then((response) => {
        setBook(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch featured books from the backend
    axios.get('http://localhost:8000/Book/featured')
      .then(response => {
        setFeaturedBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching featured books:', error);
      });
  }, []);

  const deleteBookById = (bookId) => {
    console.log(bookId);
    BookService.deleteBook(bookId)
      .then((response) => {
        getAllBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/ListBookComponent"} className="navbar-brand">
              Back
          </Link>
        </nav>    
    </div>
    <div className='background-img'>
    <div className="featured-container">
      <div className="book-list">
        {featuredBooks.map(book => (
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
              <button className="btn btn-danger" onClick={() => deleteBookById(book.id)}
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
    </>
  );
}

export default FeaturedBooks;
