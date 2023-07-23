
import './App.css';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/homePage';
import {ToastContainer} from "react-toastify"
import {Routes, Route} from "react-router-dom"
import ProductOverview from './componends/Product/ProductOverview';
import CartOverview from './componends/cart/CartOverview';


function App() {
 
  return (
   <>
  <Routes scrollRestoration="auto">
    <Route path='/'  element={<HomePage/>} />
    <Route path='/product'  element={<ProductPage/>}/>
    <Route path='/product/:id/overview' element={<ProductOverview/>} />
    <Route path='/Cart/:id' element={<CartOverview/>}/>
  </Routes>
    <ToastContainer autoClose={1500}/>
   </>
  );
}

export default App;
