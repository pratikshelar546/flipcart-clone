
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



function App() {

  return (
    <>
      <Routes scrollRestoration="auto">
        <Route path='/' element={<HomePage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/product/:id/overview' element={<ProductOverview />} />
        <Route path='/Cart/:id' element={<CartOverview />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/Myorders' element={<MyOrder/>}/>
        <Route path='/MyOrders/:id' element={<OrderOverview/>}/>
        <Route path='/My-account' element={<MyAccount/>}/>
      </Routes>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
