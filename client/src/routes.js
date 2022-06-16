
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import EditAccountPage from "./pages/EditAccountPage";
import Form from "./components/Form";
import AuthenticatePage from "./pages/AuthenticatePage";
import RegisterPage from "./pages/RegisterPage";
import AboutUsPage from "./pages/AboutusPage";
import EditBlogPage from "./pages/EditBlogPage";
import EditDishPage from "./pages/EditDishPage";
import AdminMenu from "./pages/AdminMenu";
import AdminUser from "./pages/AdminUser";
import MenuDetailPage from "./pages/MenuDetailPage";
import CartPage from "./pages/CartPage";
import AdminAboutPage from "./pages/AdminAboutPage";
import AdminReservationPage from "./pages/AdminReservationPage";
const routes = [
  { path: "/", name: "homePage", component: HomePage },

  { path: "/about", name: "aboutUsPage", component: AboutUsPage },
  { path: "/blog/:id", name: "blogDetail", component: BlogDetailPage },
  { path: "/blog", name: "blog", component: BlogPage },
  { path: "/menu", name: "menu", component: MenuPage },
  { path: "/menu/:id", name: "menuDetail", component: MenuDetailPage },
  { path: "/reservation", name: "makeReservation", component: ReservationPage },
  { path: "/auth", name: "Authenticate", component: AuthenticatePage },
  { path: "/reg", name: "Register", component: RegisterPage },
  { path: "/cart", name: "Cart", component: CartPage },
  {
    path: "/account",
    name: "editAccount",
    component: EditAccountPage,
    children: [
      {
        path: "profile",
        name: "editAccountProfile",
        component: Form,
        props: {
          type: "EditAccount",
        },
      },
      {
        path: "password",
        name: "editAccountPassword",
        component: Form,
        props: {
          type: "EditPassword",
        },
      },
    ],
  },
  {
    path: "/admin/blog/create",
    name: "adminCreateBlog",
    component: EditBlogPage,
  },
  {
    path: "/admin/blog/:id/edit",
    name: "adminEditBlog",
    component: EditBlogPage,
  },
  {
    path: "/admin/dish/create",
    name: "adminCreateDish",
    component: EditDishPage,
  },
  {
    path: "/admin/dish/:id/edit",
    name: "adminEditDish",
    component: EditDishPage,
  },
  {
    path: "/admin/menu",
    name: "adminMenu",
    component: AdminMenu,
  },
  {
    path: "/admin/user",
    name: "adminUser",
    component: AdminUser,
  },
  {
    path: "/admin/about",
    name: "adminAboutPage",
    component: AdminAboutPage,
  },
  {
    path: "/admin/reservation",
    name: "adminReservationPage",
    component: AdminReservationPage,
  },
];

export default routes;
