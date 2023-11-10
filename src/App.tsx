import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home, Category, Product, Cart, Login } from "./pages";
import Orders from "./pages/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from "./pages/register/Register";

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
        <Route  path="/admin/" />
        <Route  path="admin/products" element={<Orders/>}/>
      </Routes>
    </>
  )
}

export default App;
