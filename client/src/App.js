
import './App.css';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/homePage';
import {Routes, Route} from "react-router-dom"

function App() {
  return (
   <>
  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/Product' element={<ProductPage/>}/>
  </Routes>
   </>
  );
}

export default App;
