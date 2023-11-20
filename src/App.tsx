import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home, Category, Product, Cart, Login } from "./pages";
import Products from "./pages/admin/product";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from "./pages/public/register/Register";
import Order from "./pages/admin/order";

function App() {

  return (
    <>
      <ToastContainer position="bottom-left"/>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/category" element={<Category/>}/>
        <Route  path="/product" element={<Product/>}/>
        <Route  path="/cart" element={<Cart/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<RegisterScreen/>}/>
        <Route  path="/admin/products" element={<Products/>}/>
        <Route  path="/admin" element={<Order/>}/>
      </Routes>
    </>
  )
}

export default App;
