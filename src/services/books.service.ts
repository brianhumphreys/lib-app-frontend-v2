import axios from "axios";
import type { Book, User } from "..";
import authHeader from "./auth-header.service";
import isbnAuthHeader from "./isbn-header.service";

const API_URL = window.location.host.includes("localhost")
  ? "http://localhost:8080/api/v1/"
  : "https://fierce-lake-63862.herokuapp.com/api/v1/";
// const API_URL = `https://fierce-lake-63862.herokuapp.com/api/v1/`;
// const API_URL = `${process.env.API_URL ? process.env.API_URL : 'http://localhost:8080'}/api/v1/`;

export interface InfoResponse {
  isbn: string;
  book: {
    title: string;
    authors: string[];
    overview: string;
    synopsys: string;
  };
}

class BooksService {
  getIsbnInfo(isbn: string) {
    return axios
      .get<InfoResponse>("https://api2.isbndb.com/book/" + isbn, {
        headers: isbnAuthHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  getBookHistory(user: User) {
    return axios
      .get(API_URL + `checkouts/all-books/${user.id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        // localStorage.setItem("mybooks", JSON.stringify(response.data));
        return response.data;
      });
  }
  getUserHistory(book: Book) {
    return axios
      .get(API_URL + `checkouts/all-users/${book.ID}`, {
        headers: authHeader(),
      })
      .then((response) => {
        // localStorage.setItem("mybooks", JSON.stringify(response.data));
        return response.data;
      });
  }
  getMyBooks(user: User) {
    return axios
      .get(API_URL + `checkouts/current-books/${user.id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        // localStorage.setItem("mybooks", JSON.stringify(response.data));
        return response.data;
      });
  }
  getBooks() {
    return axios.get(API_URL + "books").then((response) => {
      // localStorage.setItem("books", JSON.stringify(response.data));
      return response.data;
    });
  }
  addBook(book: Book) {
    return axios
      .post(API_URL + "books", book, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  deleteBook(book: Book) {
    return axios
      .delete(API_URL + `books/${book.ID}`, { headers: authHeader() })
      .then((response) => {
        return book;
      });
  }
  updateBook(book: Book) {
    return axios
      .put(API_URL + `books/${book.ID}`, book, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new BooksService();
