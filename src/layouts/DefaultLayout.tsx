import { ReactNode, useEffect, useState } from "react";
import { Footer, Header } from "../components";
import CartProduct from "../models/CartProduct";
import cartService from "../services/CartService";

const DefaultLayout = ({ children, cartData } : { children : ReactNode, cartData?: CartProduct[]  }) => {
    const [ internalCartData, setInternalCartData ] = useState<CartProduct[]>([]);

    useEffect(() => {
      if(!cartData) {
        const cart: CartProduct[] = cartService.load();        
        if (cart) {
          setInternalCartData(cart);
        }
      }
  }, []);
  return (
    <>
        <Header cartItems={cartData ? cartData : internalCartData}/>
            { children }
        <Footer/>
    </>
  );
};
export default DefaultLayout;