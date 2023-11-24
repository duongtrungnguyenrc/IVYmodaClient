import classnames from "classnames/bind";
import styles from "./Product.module.scss";

import { ProductModel } from "../../models/Product";
import { HeartIcon, ShoppingBagIcon } from "../../assets/Icons";
import { useState } from "react";
import CartProduct from "../../models/CartProduct";
import { toast } from "react-toastify";
import cartService from "../../services/CartService";


const cx = classnames.bind(styles);

const Product = ({ product, reloadCallback } : { product: ProductModel, reloadCallback : Function }) => {

    const [ isSizeVisible, setIsSizeVisible ] = useState<boolean>(false);

    const handleAddCartItem = (size: {id: number, name: string, extraCoefficient: number}) => {
        const newProduct = {
            id: product.id,
            imgSrc: product.images[0].src,
            productName: product.name,
            salePrice: product.salePrice,
            sumPrice: product.salePrice,
            quantity: 1,
            size: {
                id: size.id,
                name: size.name
            },
            color: {
                id: product.colors[0].id,
                name: product.colors[0].name
            }            
        } as unknown as CartProduct
        cartService.add(newProduct);
        toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
        reloadCallback();
    }

    return (
        <>
            <div className={styles.product}>
                    {
                        product.tag && product.tag !== "" &&
                        <div className={cx("info-tag", product.tag.toLowerCase().replace("_", '-'))}>
                            {product.tag}
                        </div>
                    }
                    <div className={cx("images")}>
                        <a href={`/product?id=${product.id}`}>
                            {
                                product && (
                                    <>
                                        <img loading="lazy" className={cx("image")} src={product.images[0]?.src} alt="" />
                                        <img loading="lazy" className={cx("image", "hover-image")} src={product.images[1]?.src} alt="" />
                                    </>
                                )

                            }
                        </a>
                    </div>
                    <div className={cx("product-info")}>
                        
                        {/* product color list */}

                        <div className={cx("color-list")}>
                            <ul>
                                {
                                    product.colors.slice(0, 3).map((color, index) => {
                                        return (
                                            <li key={color.id} style={{background: color.src}} className={cx("color-option", {
                                                "checked": index === 0
                                            })}>
                                                <img src={color.src} alt={color.name} />
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <div className={cx("favourite")}>
                                <HeartIcon/>
                            </div>
                        </div>

                        {/* product name */}

                        <div className={cx("product-name")}>
                            <a href={`/product?id=${product.id}`}>{product.name}</a>
                        </div>

                        {/* produuct price */}

                        <div className={cx("product-price")}>
                            <div className={cx("price")}>{("" + product.salePrice).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                            <div className={ cx("add-to-cart-frame") }>
                                <button className={cx("add-to-cart-btn")} onClick={() => setIsSizeVisible((prevState) => !prevState)}><ShoppingBagIcon/></button>
                                <ul className={cx("toggle-size-popup", { "active": isSizeVisible })}>
                                    {
                                        product.sizes.map((size) => {
                                            return <li onClick={ () => handleAddCartItem(size) }>{ size.name }</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default Product;