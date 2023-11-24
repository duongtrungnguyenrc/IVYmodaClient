import { useCallback, useEffect, useState } from "react";
import { NavLinks, Product, Content, ProductsFilter, Skeleton } from "../../../components";
import Pagination from 'react-bootstrap/Pagination';
import axios from "../../../services/CustomAxios";
import ProductModel from "../../../models/Product";
import { useSearchParams } from "react-router-dom";
import CartProduct from "../../../models/CartProduct";
import cartService from "../../../services/CartService";
import ProductFilter from "../../../models/ProductFilter";
import DefaultLayout from "../../../layouts/DefaultLayout";

import styles from "./styles.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ResponseData {
    page: number;
    totalPages : number;
    products: Array<ProductModel> | null;
  }

const Categories = () => {
    const [ data, setData ] = useState<ResponseData>({ page: 1, totalPages: 0, products: null });
    const [ page, setPage ] = useState(1);
    const [filter, setFilter] = useState<ProductFilter>();
    const [ cartData, setCartData ] = useState<CartProduct[]>([]);
    const params = useSearchParams();
    const group = params[0].get("group")?.toUpperCase();
    const category = params[0].get("name");

    const loadCardData = useCallback(() => {
        const cart: CartProduct[] = cartService.load();        
        if (cart) {
            setCartData(cart);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let apiRoute = `product/all?page=${page}&limit=20`;
            if(group && category)
                apiRoute +=`&category=${category}&group=${group}`;
            if(filter?.color) {
                apiRoute += `&color=${filter.color}`;
            }
            if(filter?.size) {
                apiRoute += `&size=${filter.size}`;
            }
            if(filter?.tag) {
                apiRoute += `&tag=${filter.tag}`;
            }
            if(filter && filter?.rangePrice?.min != 0 && filter?.rangePrice?.max != 0) {
                apiRoute += `&min=${filter?.rangePrice.min}&max=${filter?.rangePrice.max}`;
            }
                        
            const response = await axios.get(apiRoute);
            if(response.status == 200) {
                setData(response.data.data)
            }
        }
        fetchData();
    }, [page, filter]);

    useEffect(() => {
    loadCardData();
    }, []);

    const handleSetPage = (page : number) => {
        setPage(page);
    };

    

    return (
        <DefaultLayout cartData={cartData}>
            <Content>
                <NavLinks/>

                {/* PRODUCTS LIST */}

                <section className="products-category row">

                    <div className="col-2"><ProductsFilter applyFilterCallback={setFilter}/></div>   

                    <div className="ps-5 col-10">
                        <div className="main-title mb-4">
                            <h2>{category}</h2>
                        </div>
                        {
                            data.products ?
                            ( data.products.length != 0 ?  
                            <>
                                <div className={cx("main-products-list")}>
                                    {
                                        data.products.map((value, index) => {
                                            return <Product key={index} product={value} reloadCallback={loadCardData}/>
                                        })
                                    }
                                </div>
                                <Pagination>
                                    <Pagination.First onClick={() => handleSetPage(1)}/>
                                    <Pagination.Prev onClick={() => page > 1 ? handleSetPage(page - 1) : undefined}/>
                                    {
                                        new Array(data.totalPages).fill(null).map((_value, index) => {
                                            const i = index + 1;
                                            return <Pagination.Item key={index} active={page === i} onClick={() => handleSetPage(index + 1)}>{i}</Pagination.Item>
                                        })
                                    }
                                    <Pagination.Next onClick={() => page < data.totalPages ? handleSetPage(page + 1) : undefined}/>
                                    <Pagination.Last onClick={() => handleSetPage(data.totalPages)}/>
                                </Pagination>
                            </> : "Không tìm thấy sản phẩm phù hợp !" ) : 
                            <div className={cx("main-products-list")}>
                                {
                                    Array(20).fill(null).map(() => {
                                        return  <div>
                                                    <Skeleton variant="rectangular" height={450}/>
                                                    <div className="d-flex gap-2 mt-2">
                                                        <Skeleton variant='round' width={20} height={20}/>
                                                        <Skeleton variant='round' width={20} height={20}/>
                                                        <Skeleton variant='round' width={20} height={20}/>
                                                    </div>
                                                    <Skeleton className="mt-3" variant="text" width={250}/>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <Skeleton variant="text" width={200}/>
                                                        <Skeleton variant="rectangular" width={40} height={40}/>
                                                    </div>
                                                </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </section>

            </Content>
        </DefaultLayout>
    )
}

export default Categories;