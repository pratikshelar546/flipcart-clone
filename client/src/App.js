
import './App.css';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/homePage';
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"
import ProductOverview from './componends/Product/ProductOverview';
import CartOverview from './componends/cart/CartOverview';

import Shipping from './componends/Shipping/Shipping';
import MyOrder from './componends/orders/MyOrder';
import OrderOverview from './componends/orders/OrderOverview';
import MyAccount from './componends/MyAccount/MyAccount';
// import MyProfile from './componends/Profile/SideBar';

import ProfileInfo from './componends/Profile/ProfileInfo';
import ResetPassword from './componends/Profile/ResetPassword';
import ChangePassword from './componends/Profile/ChangePassword';
import Admin from './Admin/Admin';
import OrderDetails from './Admin/HomePage/OrderDetails';
import ProductDetails from './Admin/HomePage/ProductDetails';
import AddProduct from './Admin/HomePage/AddProduct';

import Rivvews from './Admin/HomePage/Rivvews';
import Profile from './Admin/HomePage/Profile';
import OrderProductOverview from './Admin/HomePage/OrderProductOverview';
import EditProduct from './Admin/HomePage/EditProduct';
import ReviewProduct from './Admin/HomePage/ReviewProduct';
import ProtectedRoute from './Routes/ProtectedRoute';

import Owner from "./Owner/Owner"
import Login from './Admin/Auth/Login';
import { useState } from 'react';
import SignUp from './Admin/Auth/SignUp';
import AddAdmins from './Owner/AddAdmins';



function App() {
  const [openLogin, setOpenLogin] = useState(true);
  const [openSignup, setOpenSignup] = useState(true);

  return (
    <>
      <Routes scrollRestoration="auto" >
        <Route path='/' element={<HomePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/product/:id/overview' element={<ProductOverview />} />
        <Route path='/Cart/:id' element={<CartOverview />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/Myorders' element={<MyOrder />} />
        <Route path='/MyOrders/:id' element={<OrderOverview />} />
        <Route path='/My-account' element={<MyAccount />} />
        {/* <Route path='/Profile' element={<ProfilePage />} /> */}
        <Route path='/Profile' element={<ProfileInfo />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/admin/login' element={<Login isOpen={openLogin} setIsOpen={setOpenLogin} />} />
        <Route path='/admin/Signup' element={<SignUp isOpen={openSignup} setIsOpen={setOpenSignup} />} />

        <Route path='/Owner' element={<Owner />} />
        <Route path='/Owner/Addamdin' element={<AddAdmins />} />
        <Route path='/admin/Orders' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={0}>
              <OrderDetails />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/Products' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={1}>
              <ProductDetails />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/:id/edit' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={1}>
              <EditProduct />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/AddProduct' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={2}>
              <AddProduct />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/OrderOverview' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={3}>
              <OrderProductOverview />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/Reviews' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={4}>
              <Rivvews />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/Review/:id' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={4}>
              <ReviewProduct />
            </Admin>
          </ProtectedRoute>
        } />
        <Route path='/admin/Profile' element={
          <ProtectedRoute isAdmin={true}>
            <Admin activeTab={5}>
              <Profile />
            </Admin>
          </ProtectedRoute>

        } />
      </Routes>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
