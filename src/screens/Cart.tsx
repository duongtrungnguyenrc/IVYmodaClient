import { useEffect, useState } from "react";
import { CartList, CartSummary, ProcessBar, Content, Footer, Header } from "../components";
import CartProduct from "../models/CartProduct";
import cartService from "../services/CartService";

const Cart = () => {
    const [ cartData, setCartData ] = useState<CartProduct[]>([]);

    useEffect(() => {
        const cart: CartProduct[] = cartService.load();        
        if (cart) {
          setCartData(cart);
        }
    }, [])
    return ( 
        <>
            <Header cartItems={(cartData)}/>
            <Content>
                <section className="w-100 pt-5 d-flex">
                    <div className="col-xl-9 col-lg-8 px-3">
                        <ProcessBar currentProcess={1}/>
                        <CartList cartData={cartData}/>
                    </div>
                    <div className="col-xl-3 col-lg-4 px-3">
                        <CartSummary cartData={cartData}/>
                    </div>
                </section>
            </Content>
            <Footer/>
        </>
     );
}

export default Cart;