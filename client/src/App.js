
import './App.css';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/homePage';
import {ToastContainer} from "react-toastify"
import {Routes, Route} from "react-router-dom"


function App() {
 
  return (
   <>
  <Routes>
    <Route path='/'  element={<HomePage/>} />
    <Route path='/product'  element={<ProductPage/>}/>
  </Routes>
    <ToastContainer autoClose={1500}/>
   </>
  );
}

export default App;
