import type { Store } from "vuex";
import type {
  Book,
  BookInformation,
  BookRecord,
  BooksState,
  Checkout,
  User,
  UserRecord,
} from "..";
import BooksService, { type InfoResponse } from "../services/books.service";
import CheckoutService from "../services/checkout.service";

const booksEndoded = localStorage.getItem("books");
const mybooksEndoded = localStorage.getItem("mybooks");
export const initialState: BooksState = {
  // getBookError: null,
  getMyBooksError: null,
  getBooksError: null,
  getBookError: null,
  updateBookError: null,
  addBookError: null,
  deleteBooksError: null,
  checkoutBookError: null,
  checkinBookError: null,
  books: booksEndoded == null ? [] : (JSON.parse(booksEndoded) as Book[]),
  myBooks: mybooksEndoded == null ? [] : (JSON.parse(mybooksEndoded) as Book[]),
  bookHistory: [],
  userHistory: [],
  addedBookInfo: {
    author: null,
    title: null,
    description: null,
    isbn: null,
  },
};

export const books = {
  namespaced: true,
  state: initialState,
  actions: {
    getBookInfo({ commit }: Store<BooksState>, isbn: string) {
      return BooksService.getIsbnInfo(isbn)
        .then((info) => {
          commit("setInfo", {
            ...info,
            isbn,
          });
          return Promise.resolve(info);
        })
        .catch((error: Error) => {
          alert("Could not extract Book information: " + error.message)
          return Promise.reject("error")
        });
    },
    getUserHistory({ commit }: Store<BooksState>, book: Book) {
      return BooksService.getUserHistory(book)
        .then((user) => {
          commit("getUserHistorySuccess", user);
          return Promise.resolve(user);
        })
        .catch((error) => {
          commit("getUserHistoryFailure", error);
          alert("Could not get user history of book: " + error.message)
          return Promise.resolve([]);
        });
    },
    getBookHistory({ commit }: Store<BooksState>, user: User) {
      return BooksService.getBookHistory(user)
        .then((books) => {
          commit("getBookHistorySuccess", books);
          return Promise.resolve(books);
        })
        .catch((error) => {
          commit("getBookHistoryFailure", error);
          alert("Could not get book History of user: " + error.message)
          return Promise.resolve([]);
        });
    },
    getMyBooks({ commit }: Store<BooksState>, user: User) {
      return BooksService.getMyBooks(user)
        .then((books) => {
          commit("getMyBooksSuccess", books);
          return Promise.resolve(books);
        })
        .catch((error) => {
          commit("getMyBooksFailure", error);
          alert("Could not get my books: " + error.message)
          return Promise.reject(error);
        });
    },
    getBooks({ commit }: Store<BooksState>) {
      return BooksService.getBooks()
        .then((books) => {
          commit("getBooksSuccess", books);
          return Promise.resolve(books);
        })
        .catch((error) => {
          commit("getBooksFailure", error);
          alert("Could not get books: " + error.message)
          return Promise.reject(error);
        });
    },
    addBook({ commit }: Store<BooksState>, book: Book) {
      return BooksService.addBook(book).then(
        (response) => {
          
          commit("addBookSuccess", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("addBookFailure");
          alert("Could not get add a book: " + error.message)
          return Promise.reject(error);
        }
      );
    },
    deleteBook({ commit }: Store<BooksState>, book: Book) {
      return BooksService.deleteBook(book).then(
        (response) => {
          commit("deleteBookSuccess", book);
          return Promise.resolve(response);
        },
        (error) => {
          commit("deleteBookFailure", error);
          alert("Could not delete a book: " + error.message)
          return Promise.reject(error);
        }
      );
    },
    updateBook({ commit }: Store<BooksState>, book: Book) {
      return BooksService.updateBook(book).then(
        (response) => {
          commit("updateBookSuccess", book);
          return Promise.resolve(response);
        },
        (error) => {
          commit("updateBookFailure");
          alert("Could not update a book: " + error.message)
          return Promise.reject(error);
        }
      );
    },
    checkoutBook({ commit }: Store<BooksState>, checkout: Checkout) {
      return CheckoutService.checkout(checkout).then(
        (response) => {
          console.log("response")
          console.log(response);
          commit("checkoutBookSuccess", checkout);
          return Promise.resolve(response);
        },
        (error) => {
          commit("checkoutBookFailure");
          alert("Could not checkout a book: " + error.message)
          return Promise.reject(error);
        }
      );
    },
    checkinBook({ commit }: Store<BooksState>, checkin: Checkout) {
      return CheckoutService.checkin(checkin).then(
        (response) => {
          commit("checkinBookSuccess", checkin);
          return Promise.resolve(response);
        },
        (error) => {
          commit("checkinBookFailure");
          alert("Could not check in a book: " + error.message)
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    addBookSuccess(state: BooksState, book: Book) {
      state.books.unshift(book);
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    addBookFailure(state: BooksState, errorMessage: Error) {
      state.addBookError = "error";
    },
    getBooksSuccess(state: BooksState, books: Book[]) {
      state.books = books;
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    getBooksFailure(state: BooksState, errorMessage: Error) {
      state.getBooksError = errorMessage.message;
    },
    updateBookSuccess(state: BooksState, updatedBook: Book) {
      state.books = state.books.map((book) =>
        book.ID == updatedBook.ID ? updatedBook : book
      );
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    updateBookFailure(state: BooksState, errorMessage: Error) {
      state.updateBookError = errorMessage.message;
    },
    deleteBookSuccess(state: BooksState, deletedBook: Book) {
      state.books = state.books.filter((book) => book.ID != deletedBook.ID);
      localStorage.setItem("books", JSON.stringify(state.books));
    },
    deleteBookFailure(state: BooksState, errorMessage: Error) {
      state.deleteBooksError = errorMessage.message;
    },
    checkoutBookSuccess(state: BooksState, checkout: Checkout) {
      state.books = state.books.map((book) =>
        book.ID == checkout.bookId ? { ...book, available: false } : book
      );
      const checkedOutBook = state.books.reduce(
        (accum, book) => (book.ID == checkout.bookId ? book : accum),
        {}
      );
      state.myBooks.push(checkedOutBook as Book);

      localStorage.setItem("books", JSON.stringify(state.books));
      localStorage.setItem("mybooks", JSON.stringify(state.myBooks));
    },
    checkoutBookFailure(state: BooksState, errorMessage: Error) {
      state.checkoutBookError = errorMessage.message;
    },
    checkinBookSuccess(state: BooksState, checkin: Checkout) {
      state.books = state.books.map((book) =>
        book.ID == checkin.bookId ? { ...book, available: true } : book
      );
      state.myBooks = state.myBooks.filter((book) => book.ID != checkin.bookId);

      localStorage.setItem("books", JSON.stringify(state.books));
      localStorage.setItem("mybooks", JSON.stringify(state.myBooks));
    },
    checkinBookFailure(state: BooksState, errorMessage: Error) {
      state.checkinBookError = errorMessage.message;
    },
    getMyBooksSuccess(state: BooksState, books: Book[]) {
      state.myBooks = books;
      localStorage.setItem("mybooks", JSON.stringify(state.myBooks));
    },
    getMyBooksFailure(state: BooksState, errorMessage: Error) {
      state.getMyBooksError = errorMessage.message;
    },
    getUserHistorySuccess(state: BooksState, users: UserRecord[]) {
      state.userHistory = users.map<UserRecord>(user => {
        if (user.checked_in.split('.')[0] == user.checked_out.split('.')[0]) {
          return {...user, checked_in: ""}
        } else {
          return user;
        }
      });
    },
    getUserHistoryFailure(state: BooksState, errorMessage: Error) {
      state.userHistory = [];
    },
    getBookHistorySuccess(state: BooksState, books: BookRecord[]) {
      state.bookHistory = books.map(book => {
        if (book.checked_in.split('.')[0] == book.checked_out.split('.')[0]) {
          return {...book, checked_in: ""}
        } else {
          return book;
        }
      });
    },
    getBookHistoryFailure(state: BooksState, errorMessage: Error) {
      state.bookHistory = [];
    },
    setInfo(state: BooksState, info: InfoResponse) {
      if (state.addedBookInfo) {
        state.addedBookInfo.author = info.book.authors[0];
        state.addedBookInfo.title = info.book.title;
        state.addedBookInfo.description = info.book.synopsys || info.book.title;
        state.addedBookInfo.isbn = info.isbn;
      }
    },
  },
};
