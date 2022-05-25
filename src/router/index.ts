import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";
// import Home from "./components/Home.vue";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
// import Profile from "../components/Profile.vue";
// import Library from "../components/Library.vue";
// import AdminDashboard from "../components/AdminDashboard.vue";
// import AdminBookPage from "../components/AdminBookPage.vue";
// import UserBookPage from "../components/UserBookPage.vue";
// import CheckoutTabulator from "../components/CheckoutTabulator.vue";
// import Register from "./components/Register.vue";
// lazy-loaded
const Profile = () => import("../components/Profile.vue")
const Library = () => import("../components/Library.vue")
const AdminDashboard = () => import("../components/AdminDashboard.vue")
const AdminBookPage = () => import("../components/AdminBookPage.vue")
const UserBookPage = () => import("../components/UserBookPage.vue")

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/library",
    component: Library,
  },
  {
    path: "/admin",
    component: AdminDashboard,
  },
  {
    path: "/adminbook/:id",
    component: AdminBookPage,
  },
  {
    path: "/book/:id",
    component: UserBookPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;