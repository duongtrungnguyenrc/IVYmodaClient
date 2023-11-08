import { ReactNode, useEffect, useState } from "react";
import { Footer, Header } from "../components";
import CartProduct from "../models/CartProduct";
import cartService from "../services/CartService";

const DefaultLayout = ({ children } : { children : ReactNode }) => {
  const [ cartData, setCartData ] = useState<CartProduct[]>([]);

  useEffect(() => {
    const cart: CartProduct[] = cartService.load();        
    if (cart) {
      setCartData(cart);
    }
}, [])
  return (
    <>
        <Header cartItems={cartData}/>
            { children }
        <Footer/>
    </>
  );
};
export default DefaultLayout;