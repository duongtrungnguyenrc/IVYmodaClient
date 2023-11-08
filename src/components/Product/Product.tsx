import classnames from "classnames/bind";
import styles from "./Product.module.scss";

import { ProductModel } from "../../models/Product";
import { HeartIcon, ShoppingBagIcon } from "../../assets/Icons";
import { ReactEventHandler } from "react";
import CartProduct from "../../models/CartProduct";


const cx = classnames.bind(styles);

const Product = ({ product, addItemCallback } : { product: ProductModel, addItemCallback : Function }) => {

    const handleAddCartItem : ReactEventHandler = (e) => {
        e.preventDefault();
        addItemCallback(
            {
                id: product.id,
                imgSrc: product.images[0].src,
                productName: product.name,
                salePrice: product.salePrice,
                quantity: 1,
                size: "S",
                color: "Red",
            } as unknown as CartProduct
        );
        console.log("add success");
        
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
                                    product.colors.slice(0, 3).map((color) => {
                                        return (
                                            <li key={color.id} style={{background: color.src}} className={cx("color-option", {
                                                "checked": false
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
                            <a href="" onClick={ handleAddCartItem }><ShoppingBagIcon/></a>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default Product;