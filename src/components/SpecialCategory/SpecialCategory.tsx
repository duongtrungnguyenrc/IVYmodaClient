import { memo, useCallback, useEffect, useState } from "react";
import classnames from "classnames/bind";

import styles from "./SpecialCategory.module.scss";
import { ProductModel } from "../../models/Product";
import Product from "../Product/Product";
import axios from "../../services/CustomAxios";


const cx = classnames.bind(styles);

interface apiResponse {
    totalPages: number;
    page: number;
    products: ProductModel[];
}


function SpecialCategory({ title, apiRoute } : { title : string, apiRoute : string}) {
    const [activeCategoryTab, setActiveCategoryTab] = useState(0);
    const [specialProducts, setSpecialProducts] = useState<apiResponse>();

    useEffect(() => {   
       fetchData();
    }, [])

    const fetchData = async () => {
        const response = await axios.get(`${apiRoute}`);
        console.log(response);
        
            if(response.data) {
                setSpecialProducts(response.data.data);
            }
    };

    return ( 
        <section className={cx("special-products-category")}>
            <div className={cx("title-section")}>
                {title}
            </div>
            <div className={cx("body-section")}>
                <div className={cx("product-category")}>
                    <ul>
                        {/* {
                            specialProducts?.map((value, index) => {
                                return <li 
                                    key={index} 
                                    className = {cx("product-category-tab", { 
                                                        "active" : index === activeCategoryTab
                                                    })
                                                }
                                    onClick={() => setActiveCategoryTab(index)}
                                    >
                                        {value.type}
                                    </li>
                            })
                        } */}
                    </ul>
                </div>
                <div className={cx("products")}>
                    <div className={cx("products-wrapper")}>
                        {
                            specialProducts && specialProducts.products.map((value, index) => {
                                return <Product key={index} product={value}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={cx("footer-section")}>
                <div className={cx("view-all-nav")}>
                    <a href="">Xem tất cả</a>
                </div>
            </div>
        </section>
     );
}

export default memo(SpecialCategory);