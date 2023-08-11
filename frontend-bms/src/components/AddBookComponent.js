import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import BookService from '../BackendService/BookService';
import BookDashboard from '../Dashboard/BookDashboard';

const AddBookComponent = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageError, setImageError] = useState(false); 
  const [formErrors, setFormErrors] = useState({});
  const [isValid, setIsValid] = useState(false); 
  const initialValues = { title: '', author: '', imageUrl: '', price: '', featured: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const history = useHistory();
  const { id } = useParams();

  const saveOrUpdateBook = (e) => {
    e.preventDefault();

    const book = { title, author, imageUrl, price, featured };
    const errors = validate(book);
    setFormErrors(errors);
    setIsValid(Object.keys(errors).length === 0); // Set form validity

    if (!isValid) {
      return; // Prevented form submission if there are errors
    }

    if (id) {
      BookService.updateBook(id, book).then((response) => {
        console.log(response.data);
        history.push('/ListBookComponent');
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      BookService.addBook(book).then((response) => {
        console.log(response.data);
        history.push('/ListBookComponent');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsValid(Object.keys(formErrors).length === 0); // Sets form validity
  };

  useEffect(() => {
    BookService.getBookById(id).then((response) => {
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setImageUrl(response.data.imageUrl);
      setPrice(response.data.price);
      setFeatured(response.data.featured);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [id]);

  useEffect(() => {
    setFormValues({ title, author, imageUrl, price, featured });
  }, [title, author, imageUrl, price, featured]);

  const validate = (book) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const nameRegex = /^[a-zA-Z ]{2,30}$/i;

    if (!book.title) {
      errors.title = 'Title is required!';
    }

    if (!book.author) {
      errors.author = 'Author is required!';
    }

    if (!book.imageUrl) {
      errors.imageUrl = 'ImageUrl is required!';
    }

    if (!book.price) {
      errors.price = 'Price is required!';
    } else if (!nameRegex.test(book.price.length > 0)) {
      errors.price = 'Not a valid Price!';
    }

    return errors;
  };

  const handleCheckboxChange = (event) => {
    setFeatured(event.target.checked);
  };

  const titles = () => {
    if (id) {
      return <h2 className="text-center">Update Book</h2>;
    } else {
      return <h2 className="text-center">Add Book</h2>;
    }
  };

  return (
    <div>
      <BookDashboard />
      <div className="loginbackground">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {titles()}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <label className="form-label"> Title :</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                  </input>
                </div>
                {formErrors.title && <p className="text-danger">{formErrors.title}</p>}

                <div className="form-group mb-2">
                  <label className="form-label"> Author :</label>
                  <input
                    type="text"
                    placeholder="Enter Author"
                    name="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  >
                  </input>
                </div>
                {formErrors.author && <p className="text-danger">{formErrors.author}</p>}

                <div className="form-group mb-2">
                  <label className="form-label"> ImageUrl :</label>
                  <input
                    type="text"
                    placeholder="Enter ImageUrl"
                    name="imageUrl"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageError(false); // For Reset image error state when the input changes
                      setImageUrl(e.target.value);
                    }}
                  ></input>
                </div>
                {imageUrl && !imageError && (
                  <div>
                    <img
                      src={imageUrl}
                      alt="Book Preview"
                      style={{ maxWidth: '200px', marginBottom: '10px' }}
                      onError={() => setImageError(true)}
                    />
                  </div>
                )}
                {imageError && <p>Error loading image. Please check the URL.</p>}
                {formErrors.imageUrl && <p className="text-danger">{formErrors.imageUrl}</p>}

                <div className="form-group mb-2">
                  <label className="form-label"> Price:</label>
                  <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>
                {formErrors.price && <p className="text-danger">{formErrors.price}</p>}

                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={handleCheckboxChange}
                    ></input>
                    Featured
                  </label>
                </div>
                <button className="btn btn-success" onClick={(e) => saveOrUpdateBook(e)}>Submit</button>
                <Link to="/ListBookComponent" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AddBookComponent;
