import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home, Category, Product, Cart, Login } from "./screens";
import Orders from "./screens/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from "./screens/register/Register";

function App() {
  window.addEventListener("offline", () => {
    alert("No internet!")
  })
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/category" element={<Category/>}/>
        <Route  path="/product" element={<Product/>}/>
        <Route  path="/cart" element={<Cart/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<RegisterScreen/>}/>
        <Route  path="/admin" element={<Orders/>}/>
      </Routes>
    </>
  )
}

export default App;
