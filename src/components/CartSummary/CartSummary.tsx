import classNames from 'classnames/bind';
import styles from './CartSummary.module.scss';
import { AlertIcon, CheckIcon } from '../../assets/Icons';
import CartProduct from '../../models/CartProduct';
import axios from '../../services/CustomAxios';
import { toast } from 'react-toastify';
import cartService from '../../services/CartService';
import { AxiosError, AxiosResponse } from 'axios';

const cx = classNames.bind(styles);

const CartSummary = ({ cartData, reload } : { cartData : CartProduct[], reload : Function }) => {

  const handleCreateOrder = async () => {
    if(cartData.length > 0) {
      const payload : number[] = [];
      cartData.forEach(item => {
        payload.push(item.id);
      })
      try {
        await axios.post("/order/create", { productIds: payload });
        toast.success("Tạo đơn hàng thành công");
        cartService.clear();
        reload();
      }
      catch(e) {
        const err = e as AxiosError
                      
        if ((err.response as AxiosResponse).status === 401 || (err.response as AxiosResponse).status === 403) {
            toast.error((err.response as AxiosResponse).data.message);
            localStorage.removeItem("token");
            setTimeout(() => {
              location.href = "/login";
            }, 3000);
        } else {
            console.error("Lỗi không xác định!");
        }
      }
    }
    else {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng!");
    }
  }
  
  return (
    <div className={cx("cart-summary")}>
      <h1 className={cx("title")}>Tóm tắt đơn hàng</h1>
      <div className={cx("over-view-items")}>
        <div className={cx("over-view-item")}>
          <p>Tổng tiền hàng</p>
          <p>{ cartData.reduce((sumPrice, value) => sumPrice + value.salePrice, 0).toLocaleString("en") }đ</p>
        </div>
        <div className={cx("over-view-item")}>
          <p>Tạm tính</p>
          <p>{ cartData.reduce((sumPrice, value) => sumPrice + value.salePrice, 0).toLocaleString("en") }đ</p>
        </div>
        <div className={cx("over-view-item")}>
          <p>Phí vận chuyển</p>
          <p>0đ</p>
        </div>
        <div className={cx("over-view-item")}>
          <p>Tổng tiền hàng</p>
          <p><strong>{ cartData.reduce((sumPrice, value) => sumPrice + value.salePrice, 0).toLocaleString("en") }đ</strong></p>
        </div>
      </div>
      <div className={cx("inner-notes")}>
        <div className={cx("inner-note")}>
          <AlertIcon/>
          <p>Miễn <b>đổi trả</b> đối với sản phẩm đồng giá / sale trên 50%</p>
        </div>
        <div className={cx("inner-note", "success")}>
          <CheckIcon/>
          <p> Đơn hàng của bạn được Miễn phí ship</p>
        </div>
      </div>
      <div className={cx("purchase")}>
        <button onClick={() => handleCreateOrder()}>Đặt hàng</button>
      </div>
    </div>
  );
};
export default CartSummary;