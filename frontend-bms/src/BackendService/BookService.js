import axios from 'axios';
import authHeader from "../services/auth-header"

const BOOK_API_BASE_URL = "http://localhost:8000/Book/";

class BookService {

    getBooks(){
        return axios.get(BOOK_API_BASE_URL+'get-all-Books',{ headers: authHeader() });
    }

    getBookById(id){
        return axios.get(BOOK_API_BASE_URL + 'getbyId/' + id,{ headers: authHeader() });
    }

    searchBooks(title, author) {
        const params = {
            title: title,
            author: author
        };
        return axios.get(BOOK_API_BASE_URL + 'search', { params, headers: authHeader() });
    }

    getFeaturedBooks() {
        return axios.get(BOOK_API_BASE_URL + 'featured',{ headers: authHeader() });
    }

    addBook(bookData){
        return axios.post(BOOK_API_BASE_URL+"addBook", bookData,{ headers: authHeader() });
    }

    updateBook(id, bookData){
        return axios.put(BOOK_API_BASE_URL + 'update/' + id, bookData,{ headers: authHeader() });
    }

    deleteBook(id){
        return axios.delete(BOOK_API_BASE_URL + 'deleteBook/' + id,{ headers: authHeader() });
    }
}

export default new BookService()