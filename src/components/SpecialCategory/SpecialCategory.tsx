import { memo, useEffect, useState } from "react";
import classnames from "classnames/bind";

import styles from "./SpecialCategory.module.scss";
import { ProductModel } from "../../models/Product";
import Product from "../Product/Product";
import axios from "../../services/CustomAxios";


const cx = classnames.bind(styles);

function SpecialCategory({ title, tag } : { title : string, tag : string}) {
    const [activeCategoryTab, setActiveCategoryTab] = useState(0);
    const [specialProducts, setSpecialProducts] = useState<{ type: string, products: ProductModel[] }[]>();

    useEffect(() => {   
        const fetchData = async () => {
            const response = await axios.get(`product/all-by-tag?tag=${tag}`);        
                if(response.data) {
                    setSpecialProducts(response.data.data);
                }
        };

        fetchData();
    }, [])

    return ( 
        specialProducts && specialProducts.reduce((count, item) => item.products.length != 0 ? ++count : count, 0) !== 0 &&
        <section className={cx("special-products-category")}>
            <div className={cx("title-section")}>
                {title}
            </div>
            <div className={cx("body-section")}>
                <div className={cx("product-category")}>
                    <ul>
                        {
                            specialProducts?.map((value, index) => {
                                return <li 
                                        key={ index } 
                                        className = { cx("product-category-tab", { "active" : index === activeCategoryTab }) }
                                        onClick={ () => setActiveCategoryTab(index) }
                                        > 
                                            {value.type}
                                        </li>
                            })
                        }
                    </ul>
                </div>
                <div className={cx("products")}>
                    <div className={cx("products-wrapper")}>
                    {
                        specialProducts && specialProducts[activeCategoryTab]?.products.map(product => {
                            return <Product key={product.id} product={product} addItemCallback={() => {}}/>
                        })
                    }
                    </div>
                </div>
            </div>
            <div className={cx("footer-section")}>
                <div className={cx("view-all-nav")}>
                    <a href="/category?group=ladies&name=Áo%20sơ%20mi">Xem tất cả</a>
                </div>
            </div>
        </section>
     );
}

export default memo(SpecialCategory);