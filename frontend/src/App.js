import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function RequireAuth({ children, redirectTo }) {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  //let isAuthenticated = getAuth();
  return isAuthenticated ? children : navigate(redirectTo);
}

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {/* <switch> */}
        {/* {isAuthenticated && <UserOptions user={user} />} */}

        <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              {/* <ProtectedRoute exact path="/process/payment" component={Payment} /> */}
              {/* {console.log(stripeApiKey)} */}
              {/* <RequireAuth redirectTo="/login"> */}
              <Payment />
              {/* </RequireAuth> */}
            </Elements>
          }
        />

        <Route extact path="/" Component={Home} />
        <Route extact path="/product/:id" Component={ProductDetails} />
        <Route extact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route extact path="/search" Component={Search} />
        {/* <ProtectedRoute extact path="/account" Component={Profile} /> */}
        <Route
          extact
          path="/account"
          element={
            <RequireAuth redirectTo="/login">
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          extact
          path="/me/update"
          element={
            <RequireAuth redirectTo="/login">
              <UpdateProfile />
            </RequireAuth>
          }
        />
        <Route
          extact
          path="/password/update"
          element={
            <RequireAuth redirectTo="/login">
              <UpdatePassword />
            </RequireAuth>
          }
        />
        <Route extact path="/contact" Component={Contact} />
        <Route extact path="/password/forgot" Component={ForgotPassword} />
        <Route exact path="/password/reset/:token" Component={ResetPassword} />
        <Route extact path="/login" Component={LoginSignUp} />
        <Route exact path="/cart" Component={Cart} />
        <Route
          extact
          path="/shipping"
          element={
            <RequireAuth redirectTo="/login">
              <Shipping />
            </RequireAuth>
          }
        />

        <Route
          extact
          path="/order/confirm"
          element={
            <RequireAuth redirectTo="/login">
              <ConfirmOrder />
            </RequireAuth>
          }
        />

        <Route
          extact
          path="/success"
          element={
            <RequireAuth redirectTo="/login">
              <OrderSuccess />
            </RequireAuth>
          }
        />

        <Route
          extact
          path="/orders"
          element={
            <RequireAuth redirectTo="/login">
              <MyOrders />
            </RequireAuth>
          }
        />

        <Route
          extact
          path="/order/:id"
          element={
            <RequireAuth redirectTo="/login">
              <OrderDetails />
            </RequireAuth>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route
          component={
            // window.location.pathname === "/process/payment" ? null : NotFound
            NotFound
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
