import { ProductModel } from "./Product";
import User from "./User";

interface Order {
    id: number;
    time: Date;
    status: String;
    products: ProductModel[];
    price: number;
    user: User;
}
export default Order;