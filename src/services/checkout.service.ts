import axios from "axios";
import type { Checkout, User } from "..";
import authHeader from "./auth-header.service";

const API_URL = window.location.host.includes('localhost') ? 'http://localhost:8080/api/v1/' : 'https://fierce-lake-63862.herokuapp.com/api/v1/';

class CheckoutService {
  checkout(checkout: Checkout) {
    return axios
      .post(API_URL + "checkouts/checkout", {
        user_id: checkout.userId,
        book_id: checkout.bookId,
      }, { headers: authHeader() })
      .then((response) => {
        console.log('wooooooo')
        console.log(response)
        return response.data;
      });
  }
  checkin(checkout: Checkout) {
    return axios.post(API_URL + "checkouts/checkin", {
      user_id: checkout.userId,
      book_id: checkout.bookId,
    }, { headers: authHeader() }).then((response) => {
      return response.data;
    });
  }
}

export default new CheckoutService();
