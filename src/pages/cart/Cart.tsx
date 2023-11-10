import { useEffect, useState } from "react";
import { CartSummary, Content } from "../../components";
import CartProduct from "../../models/CartProduct";
import cartService from "../../services/CartService";
import DefaultLayout from "../../layouts/DefaultLayout";
import styles from "./styles.module.scss";
import classNames from "classnames/bind";
import { MinusIcon, PlusIcon, TrashIcon } from "../../assets/Icons";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);


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

    const handleRemoveItem = (item : CartProduct) => {
        cartService.remove(item);
        const updatedCart = cartService.load();
        setCartData([...updatedCart]);
        loadCardData();
        toast.success(`Đã xóa ${item.productName} khỏi giỏ hàng`);
      }

    return ( 
        <DefaultLayout cartData={cartData}>
            <Content>
                 <section className="w-100 pt-5 row">
                    <div className="col-xl-9 col-lg-8 col-12 px-3">
                        <div className={cx("main-cart")}>
                            <h1>Giỏ hàng của bạn <b className="price-txt">{ cartData.length } Sản Phẩm</b></h1>
                            <table className={cx("cart-list")}>
                                <thead>
                                    <th>Tên sản phẩm</th>
                                    <th>Chiết khấu</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        cartData.map((item) => {
                                            return <tr>
                                                        <td>
                                                            <div className={cx("cart-item")}>
                                                                <div className={cx("cart-item-img")}>
                                                                    <a href={`/product?id=${item.id}`}>
                                                                        <img src={ item.imgSrc } alt="Đầm dạo phố dáng xòe xếp ly"/>
                                                                    </a>
                                                                </div>
                                                                <div className={cx("cart-item-content")}>
                                                                    <a href={`/product?id=${item.id}`}>
                                                                        <h3 className={cx("cart-item-title")}>
                                                                            { item.productName }
                                                                        </h3>
                                                                    </a>
                                                                    <div className={cx("cart-item-properties")}>
                                                                        <p>Màu sắc: <span>{ item.color.name }</span></p>
                                                                        <p>Size: <span>{ item.size.name }</span></p>                                 
                                                                        <p className={cx("cost")}>Giá gốc: <span>{ item.salePrice.toLocaleString("en") }đ</span></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p>{ item.salePrice.toLocaleString("en") }đ</p>
                                                            <p className={cx("sale-percentage")}>(-0%)</p>
                                                        </td>
                                                        <td>
                                                            <div className={cx("quantity-group")}>
                                                                <button className={cx("minus")}><MinusIcon/></button>
                                                                <input type="text" placeholder="1" disabled/>
                                                                <button className={cx("plus")}><PlusIcon/></button>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className={cx("price")}>{ item.salePrice.toLocaleString("en") }đ</p>
                                                        </td>
                                                        <td>
                                                            <button className={cx("remove-button")} onClick={() => handleRemoveItem(item)}>
                                                                <TrashIcon/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-12 px-3">
                        <CartSummary cartData={cartData} reload={loadCardData}/>
                    </div>
                </section>
            </Content>
        </DefaultLayout>
     );
}

export default Cart;