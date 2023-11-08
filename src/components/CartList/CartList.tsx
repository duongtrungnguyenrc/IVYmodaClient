import classNames from "classnames/bind";
import styles from "./CartList.module.scss";
import { MinusIcon, PlusIcon, TrashIcon } from "../../assets/Icons";
import CartProduct from "../../models/CartProduct";

const cx = classNames.bind(styles);

const CartList = ({ cartData } : { cartData : CartProduct[] }) => {
  return (
    <div className={cx("main-cart")}>
        <h1>Giỏ hàng của bạn <b className="price-txt">2 Sản Phẩm</b></h1>
        <table className={cx("cart-list")}>
            <thead>
                <tr>
                    <th>Tên sản phẩm</th>
                    <th>Chiết khấu</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    cartData?.map((item) => {
                        return <tr>
                                    <td>
                                        <div className={cx("cart-item")}>
                                            <div className={cx("cart-item-img")}>
                                                <a href="https://ivymoda.com/sanpham/dam-dao-pho-dang-xoe-xep-ly-ms-41m8287-37840">
                                                    <img src={ item.imgSrc } alt="Đầm dạo phố dáng xòe xếp ly"/>
                                                </a>
                                            </div>
                                            <div className={cx("cart-item-content")}>
                                                <a href="https://ivymoda.com/sanpham/dam-dao-pho-dang-xoe-xep-ly-ms-41m8287-37840">
                                                    <h3 className={cx("cart-item-title")}>
                                                        { item.productName }
                                                    </h3>
                                                </a>
                                                <div className={cx("cart-item-properties")}>
                                                    <p>Màu sắc: <span>{ item.color }</span></p>
                                                    <p>Size: <span>{ item.size }</span></p>                                 
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
                                        <button className={cx("remove-button")}>
                                            <TrashIcon/>
                                        </button>
                                    </td>
                                </tr>
                    })
                }
            </tbody>
        </table>
    </div>
  );
};
export default CartList;