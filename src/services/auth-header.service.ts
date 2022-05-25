import type { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const userEndoded = localStorage.getItem("user");
    let user = userEndoded ? JSON.parse(userEndoded) : ""
  
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }