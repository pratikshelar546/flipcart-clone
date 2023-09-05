
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
import ProfilePage from './pages/ProfilePage';
import ProfileInfo from './componends/Profile/ProfileInfo';
import ResetPassword from './componends/Profile/ResetPassword';
import ChangePassword from './componends/Profile/ChangePassword';
import Admin from './Admin/Admin';
import OrderDetails from './Admin/HomePage/OrderDetails';
import ProductDetails from './Admin/HomePage/ProductDetails';
import AddProduct from './Admin/HomePage/AddProduct';
import GetUsers from './Admin/HomePage/GetUsers';
import Rivvews from './Admin/HomePage/Rivvews';
import Profile from './Admin/HomePage/Profile';
import OrderProductOverview from './Admin/HomePage/OrderProductOverview';
import EditProduct from './Admin/HomePage/EditProduct';
import ReviewProduct from './Admin/HomePage/ReviewProduct';



function App() {

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
        {/* <Route path='/admin' element={<Admin />} /> */}
        <Route path='/admin/Orders' element={
          <Admin activeTab={0}>
            <OrderDetails />
          </Admin>
        } />
        <Route path='/admin/Products' element={
          <Admin activeTab={1}>
            <ProductDetails />
          </Admin>
        } />
        <Route path='/admin/:id/edit' element={
          <Admin activeTab={1}>
            <EditProduct />
          </Admin>
        } />
        <Route path='/admin/AddProduct' element={
          <Admin activeTab={2}>
            <AddProduct />
          </Admin>
        } />
        <Route path='/admin/OrderOverview' element={
          <Admin activeTab={3}>
            <OrderProductOverview />
          </Admin>
        } />
        <Route path='/admin/Reviews' element={
          <Admin activeTab={4}>
            <Rivvews />
          </Admin>
        } />
        <Route path='/admin/Review/:id' element={
          <Admin activeTab={4}>
            <ReviewProduct />
          </Admin>
        } />
        <Route path='/admin/Profile' element={
          <Admin activeTab={5}>
            <Profile />
          </Admin>
        } />
      </Routes>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
