import type { string } from "yup";

export interface User {
  id: number | null;
  email: string | null;
  password: string | null;
  role: string | null;
  token: string | null;
}

export interface Checkout {
  bookId: number;
  userId: number;
}

export interface Book {
  ID: number;
  title: string;
  author: string;
  description: string;
  isbn: string;
  available: boolean;
}

export interface BookInformation {
  author: string | null;
  title: string | null;
  description: any | null;
  isbn: string | null;
}
// type BookRecord struct {
// 	Title      string `gorm:"size:512;" json:"title"`
// 	Author     string `gorm:"size:100;" json:"author"`
// 	CheckedIn  string `gorm:"size:100;" json:"checked_in"`
// 	CheckedOut string `gorm:"size:100;" json:"checked_out"`
// }

// type UserRecord struct {
// 	Email      string `gorm:"size:512;" json:"email"`
// 	CheckedIn  string `gorm:"size:100;" json:"checked_in"`
// 	CheckedOut string `gorm:"size:100;" json:"checked_out"`
// }
export interface BookRecord {
  title: string;
  author: string;
  checked_in: string;
  checked_out: string;
}

export interface UserRecord {
  email: string;
  checked_in: string;
  checked_out: string;
}

export interface BooksState {
  getMyBooksError: string | null;
  getBooksError: string | null;
  getBookError: string | null;
  updateBookError: string | null;
  addBookError: string | null;
  deleteBooksError: string | null;
  checkoutBookError: string | null;
  checkinBookError: string | null;
  books: Book[];
  myBooks: Book[];
  bookHistory: BookRecord[];
  userHistory: UserRecord[];
  addedBookInfo: BookInformation;
}

export interface Status {
  loggedIn: boolean;
  loginErrorMessage: string | null;
  signupErrorMessage: string | null;
}

export interface BooksState {
  auth: BooksState;
}

export interface BooksState {
  status: Status;
  user: User | null;
}
