import { useEffect, useState } from "react";
import { CartList, Content } from "../components";
import CartProduct from "../models/CartProduct";
import cartService from "../services/CartService";
import DefaultLayout from "../layouts/DefaultLayout";

const Cart = () => {
    const [ cartData, setCartData ] = useState<CartProduct[]>([]);

    useEffect(() => {
        loadCardData();
    }, []);

    const loadCardData = () => {
        const cart: CartProduct[] = cartService.load();        
        if (cart) {
          setCartData(cart);
        }
    };

    return ( 
        <DefaultLayout cartData={cartData}>
            <Content>
                <CartList cartData={cartData} reloadCallback={loadCardData}/>
            </Content>
        </DefaultLayout>
     );
}

export default Cart;