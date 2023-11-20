import { useSearchParams } from 'react-router-dom';
import { NavLinks, ProductDetail } from "../../../components";
import { Content, ProductGallery } from "../../../components";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

import axios from '../../../services/CustomAxios';
import { ProductModel } from '../../../models/Product';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { toast } from 'react-toastify';
import cartService from '../../../services/CartService';

import styles from "./styles.module.scss";
import classNames from 'classnames/bind';
import { HeartIcon, MinusIcon, PlusIcon, RulerIcon, StarIcon } from '../../../assets/Icons';
import CartProduct from '../../../models/CartProduct';
import SpecialCategory from '../../../components/SpecialCategory';

const cx = classNames.bind(styles);

interface OptionChoice { color: { id: number; name: string }; size: { id: number; name: string } }

function Product() {
     const [searchParams] = useSearchParams();
     const [ product, setProduct ] = useState<ProductModel>();
     const [ cartData, setCartData ] = useState<CartProduct[]>([]);
     const [ quantity, setQuantity ] = useState(1);
     const [ optionChoice, setOptionChoice ] = useState<OptionChoice>({ color: { id: 0, name: "" }, size: { id: 0, name: "" } });


     useEffect(() => {
          const fetchProduct = async () => {
               const response = await axios.get(`/product/detail?id=${searchParams.get("id")}`);

               if(response.status == 200) {                    
                    setProduct(response.data.data);
               }
          }
          
          fetchProduct();
          loadCardData();
     }, []);

     const loadCardData = () => {
          const cart: CartProduct[] = cartService.load();        
          if (cart) {
               setCartData(cart);
          }
     }
 
     const decreaseQuantity = () => {
         if(quantity > 1) {
             setQuantity(quantity - 1);
         }
     }
 
     const increaseQuantity = () => {
         if(quantity < 10) {
             setQuantity(quantity + 1);
         }
     }
 
     const handleAddToCart = () => {
          if(product) {
               const item : CartProduct = {
                    id: product.id,
                    imgSrc: product.images[0].src,
                    productName: product.name,
                    salePrice: product.salePrice,
                    quantity: quantity,
                    size: optionChoice?.size,
                    color: optionChoice?.color,
               };

               if(item.color.id == 0) {
                    toast.error("Vui lòng chọn màu sắc!");
                    return;
               }
               else if(item.size.id == 0) {
                    toast.error("Vui lòng chọn kích cỡ!");
                    return;
               }         

               cartService.add(item);
               loadCardData();
               toast.success(`Đã thêm ${product?.name} vào giỏ hàng!`);
         }
     }
 
     const handleOptionChange : ChangeEventHandler = (e : ChangeEvent<HTMLInputElement>) => {
         const name = e.target.name;
         const value = JSON.parse(e.target.value);
         setOptionChoice((prevState) => {
             return {
                 ...prevState,
                 [name]: value
             }
         });
     }
     
     
    return ( 
          <DefaultLayout cartData={cartData}>
               <Content>
                    <NavLinks/>
                    <section className="d-flex mb-5">
                    
                         {
                              product && (
                                   <>
                                        <ProductGallery images={product.images}/>
                                        <div className={cx("product-details")}>
                                             <h1>{product.name}</h1>
                                             <div className={cx("product-detail", "detail-sub-info")}>
                                                  <p className='m-0'>SKU: { product.id }</p>
                                                  <div className={cx("customer-rated")}>
                                                       <div className={cx("rated-stars")}>
                                                       <StarIcon/>
                                                       <StarIcon/>
                                                       <StarIcon/>
                                                       <StarIcon/>
                                                       <StarIcon/>
                                                       </div>
                                                       <span>(1 Đánh giá)</span>
                                                  </div>
                                             </div>
                                             <div className={cx("product-detail", "price-detail")}>
                                                  <p>{product.salePrice.toLocaleString('en-US')} VNĐ</p>
                                             </div>
                                             <div className={cx("product-detail", "color-detail")}>
                                                  <p>Màu sắc: { optionChoice.color.name }</p>
                                                  <div className={cx("color-options")}>
                                                       {
                                                       product?.colors.map((color) => {
                                                            return    <label key={color.id} className={cx("color-option", "active")}>
                                                                           <input type="radio" name="color" value={JSON.stringify({ id: color.id, name: color.name })} onChange={handleOptionChange}/>
                                                                           <span>
                                                                                <img src={color.src} alt={color.name} />
                                                                           </span>
                                                                      </label>
                                                       })
                                                       }
                                                  </div>
                                             </div>
                                             <div className={cx("product-detail", "size-detail")}>
                                                  <div className={cx("size-options")}>
                                                       {
                                                       product?.sizes.map((size) => {
                                                            return (
                                                                 <label key={size.id} className={cx("size-option", "active")}>
                                                                      <input type="radio" name="size" value={JSON.stringify({ id: size.id, name: size.name })}  onChange={handleOptionChange}/>
                                                                      <span>{size.name}</span>
                                                                 </label>
                                                            )
                                                       })
                                                       }
                                                  </div>
                                                  <a href=""><RulerIcon/>Kiểm tra size của bạn</a>
                                             </div>
                                             <div className={cx("product-detail", "quantity-detail")}>
                                                  <p>Số lượng</p>
                                                  <div className={cx("quantity-group")}>
                                                       <button className={cx("minus")} onClick={() => decreaseQuantity()}><MinusIcon/></button>
                                                       <input type="text" value={quantity + "" }/>
                                                       <button className={cx("plus")} onClick={() => increaseQuantity()}><PlusIcon/></button>
                                                  </div>
                                             </div>
                                             <div className={cx("product-detail", "actions-detail")}>
                                                  <div className={cx("actions-group")}>
                                                       <button className={cx("dark-btn")} onClick={() => handleAddToCart()}>Thêm vào giỏ</button>
                                                       <button onClick={() => {handleAddToCart(); location.href = "/cart"}}>Mua hàng</button>
                                                       <button className={cx("love")}><HeartIcon/></button>
                                                  </div>
                                                  <div className={cx("find-at-store")}>
                                                       <a href="">Tìm tại cửa hàng</a>
                                                  </div>
                                             </div>
                                             <ProductDetail product={product}/>
                                        </div>
                                   </>
                              )
                         }
                    </section>
                    <SpecialCategory title={"NEW ARRIVAL"} tag='NEW'/>
               </Content>
          </DefaultLayout>
     );
}

export default Product;