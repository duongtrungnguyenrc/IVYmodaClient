import Cookies from 'js-cookie';
import CartProduct from '../models/CartProduct';

const cartService = {
    load : () : CartProduct[] => {
        return Cookies.get("cart") ? JSON.parse(Cookies.get("cart") as string) : [];
    },
    add: (product: CartProduct) => {
        const cart: CartProduct[] = cartService.load();
        const updatedCart: CartProduct[] = [];
      
        let productInCart = false;
      
        cart.forEach((item) => {
          if (item.id === product.id) {
            updatedCart.push({ ...item, quantity: item.quantity + 1 });
            productInCart = true;
          } else {
            updatedCart.push(item);
          }
        });
      
        if (!productInCart) {
          updatedCart.push({ ...product, quantity: 1 });
        }
      
        Cookies.set("cart", JSON.stringify(updatedCart));
      }
      
}

export default cartService;