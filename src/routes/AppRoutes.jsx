import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import RequireAuth from "../components/common/RequireAuth";
import RequireAdmin from "../components/common/RequireAdmin";

import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Categories from "../pages/Categories/Categories";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import Addresses from "../pages/Addresses/Addresses";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Admin from "../pages/Admin/Admin";
import Wishlist from "../pages/Wishlist";
import TrackOrder from "../pages/TrackOrder";
import Help from "../pages/Help";
import SimplePage from "../pages/SimplePage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about" element={<SimplePage title="About Ecom" description="A clean, full-stack e-commerce experience built around your Spring Boot API." />} />
      <Route path="/contact" element={<SimplePage title="Contact Us" description="Add your preferred customer support channel here." />} />
      <Route path="/privacy" element={<SimplePage title="Privacy Policy" description="Add your privacy policy and data handling information here." />} />
      <Route path="/terms" element={<SimplePage title="Terms & Conditions" description="Add your store terms and conditions here." />} />

      <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
      <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/addresses" element={<RequireAuth><Addresses /></RequireAuth>} />
      <Route path="/order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
      <Route path="/admin" element={<RequireAdmin><Admin /></RequireAdmin>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
