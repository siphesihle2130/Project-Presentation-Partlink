import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext";
import MyListingPage from "./Pages/MyListingPage";
import MyListingSoldPage from "./Pages/MyListingSoldPage";
import EditListingPage from "./Pages/EditListingPage";
import SoldListDetailsPage from "./Pages/SoldListDetailsPage";
import MyActiveRequestsPage from "./Pages/MyActiveRequestsPage"
import ActiveRequestDetailsPage from "./Pages/ActiveRequestDetailsPage"
import MyCompletedRequestPage from "./Pages/MyCompletedRequestPage"
import CompletedRequestDetailsPage from "./Pages/CompletedRequestDetailsPage"
import CreateRequest from "./Pages/CreateRequest"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import ResetPasswordPage from "./Pages/ResetPasswordPage"
import Profile from "./Pages/Profile"
import CarPartListing from "./Pages/CarPartListing"
import CheckoutPage from "./Pages/CheckoutPage"
import CartPage from "./Pages/CartPage"

function App(){
    return (
      <CartProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/my-listing" element={<MyListingPage />} />
        <Route path="/my-sold-listing" element={<MyListingSoldPage />} />
        <Route path="/edit-listing" element={<EditListingPage />} />
        <Route path="/sold-list-details" element={<SoldListDetailsPage />} />
        <Route path="/active-requests" element={<MyActiveRequestsPage />} />
        <Route path="/active-requests-details" element={<ActiveRequestDetailsPage />} />
        <Route path="/completed-requests" element={<MyCompletedRequestPage />} />
        <Route path="/completed-request-details" element={<CompletedRequestDetailsPage />} />
        <Route path="/create-request" element={<CreateRequest />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/carpart-listing" element={<CarPartListing />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
    );

  } 
  export default App;