import classNames from 'classnames/bind';

import styles from './header.module.scss';
import { memo, useEffect, useState } from 'react';
import { GlassIcon, HeadPhoneIcon, MinusIcon, PlusIcon, ShoppingBagIcon, UserIcon } from '../../assets/Icons';
import axios from "../../services/CustomAxios";
import { Skeleton } from '..';
import CartProduct from '../../models/CartProduct';


const cx = classNames.bind(styles);

const Header = ({ cartItems } : { cartItems : CartProduct[] }) => {
    const [ data, setData ] = useState<{ name: string, groups: ProductGroup[] }[]>();
    const [ token, setToken ] = useState<string>();

    useEffect(() => {
        const authToken = localStorage.getItem("token");
        if(authToken) {
            setToken(authToken);
        }
        const fetchAllGroups = async () => {
            const response = await axios.get("product-group/all");
            if(response.status == 200) {
                setData(response.data.data);                
            }
        }
        fetchAllGroups();
    }, []);    
    
    return (
        <header className={cx("header")}>
            <div className={cx("header-container")}>
                <div className="categories-wrapper">
                    <ul className={cx("categories")}>
                        {
                            data ? data?.map((item) => {
                                return  <li key={item.name} className={cx("category")}>
                                            <label className={cx('group-name')}>
                                                { item.name.toUpperCase() }
                                            </label>
                                            <ul className={cx("sub-menu")}>
                                                <div className={cx("cat-sub-menu")}>
                                                    <div>
                                                        <a>NEW ARIVAL</a>
                                                    </div>
                                                    <div>
                                                        <a>MOMENTS OF DELIGHT</a>
                                                    </div>
                                                    <div>
                                                        <a>A SYMPHONY OF ELEGANCE</a>
                                                    </div>
                                                    <div>
                                                        <a>IVY YOU</a>
                                                    </div>
                                                    <div>
                                                        <a>SUMMER SCENT COLLECTION</a>
                                                    </div>
                                                    <div>
                                                        <a>SCENT OF THE SEA COLLECTION</a>
                                                    </div>
                                                    <div>
                                                        <a>HARMONY COLLECTION</a>
                                                    </div>
                                                    <div>
                                                        <a>TENCEL PRODUCTS</a>
                                                    </div>
                                                </div>
                                                <div className={cx("list-sub-menu")}>
                                                    {
                                                        item.groups?.map(productGroup => {
                                                            return <div key={productGroup.id + productGroup.name} className={cx("sub-menu-item")}>
                                                                        <h3><a href={ productGroup.name }>{ productGroup.name }</a></h3>
                                                                        <ul>
                                                                            {
                                                                                productGroup?.productCategories?.map(category => {
                                                                                    return <li key={category.name + Math.random()}>
                                                                                                <a href={`/category?group=${item.name}&name=${category.name}`}>{ category.name }</a>
                                                                                            </li>
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                        })
                                                    }
                                                </div>
                                            </ul>
                                        </li>
                            }) : 
                            <>
                                <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li>
                                <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li>
                                <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li>
                                {/* <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li>
                                <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li>
                                <li className={cx("category")}>
                                    <Skeleton variant='text' width={50}/>
                                </li> */}
                            </>
                        }
                        {/* <li className={cx("category")}>
                            <a href="" className="special">
                                SALE
                            </a>
                            <ul className={cx("sub-menu")}>
                                <div className={cx("list-sub-menu")}>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">Nữ</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Sale 30%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 50%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 70%</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">Kids</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Sale 30%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 50%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 70%</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">Nam</a></h3>
                                        <ul>
                                        <li>
                                                <a href="">Sale 30%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 50%</a>
                                            </li>
                                            <li>
                                                <a href="">Sale 70%</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li className={cx("category")}>
                            <a href="">
                                BỘ SƯU TẬP
                            </a>
                            <ul className={cx("sub-menu")}>
                                <div className={cx("list-sub-menu")}>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">Nữ</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">A SUMPHONY OF ELEGANCE</a>
                                            </li>
                                            <li>
                                                <a href="">ENCHANTED</a>
                                            </li>
                                            <li>
                                                <a href="">SUMMER SCENT</a>
                                            </li>
                                            <li>
                                                <a href="">MOMENTS OF DELIGHT</a>
                                            </li>
                                            <li>
                                                <a href="">SCENT OF THE SEA</a>
                                            </li>
                                            <li>
                                                <a href="">HARMONY</a>
                                            </li>
                                            <li>
                                                <a href="">TIMELESS</a>
                                            </li>
                                            <li>
                                                <a href="">DISCOVER CHARMING</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">Trẻ em</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">ORGANIC COTTON</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </li>
                        <li className={cx("category")}>
                            <a href="">
                                LIFE STYLE
                            </a>
                        </li>
                        <li className={cx("category")}>
                            <a href="">
                                VỀ CHÚNG TÔI
                            </a>
                            <ul className={cx("sub-menu")}>
                                <div className={cx("cat-sub-menu")}>
                                    <div>
                                        <a>ESSENTIAL SWEATSUIT MEN</a>
                                    </div>
                                </div>
                                <div className={cx("list-sub-menu")}>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">ÁO</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Áo sơ mi</a>
                                            </li>
                                            <li>
                                                <a href="">Áo thun</a>
                                            </li>
                                            <li>
                                                <a href="">Áo polo</a>
                                            </li>
                                            <li>
                                                <a href="">Áo len</a>
                                            </li>
                                            <li>
                                                <a href="">Áo phao</a>
                                            </li>
                                            <li>
                                                <a href="">Áo khoác</a>
                                            </li>
                                            <li>
                                                <a href="">Áo vest</a>
                                            </li>
                                            <li>
                                                <a href="">Áo len</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">QUẦN Nam</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Quần jeans</a>
                                            </li>
                                            <li>
                                                <a href="">Quần lửng/short</a>
                                            </li>
                                            <li>
                                                <a href="">Quần dài</a>
                                            </li>
                                            <li>
                                                <a href="">Quầnkaki</a>
                                            </li>
                                            <li>
                                                <a href="">Quần tây</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">GIÀY & DÉP</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Giày/Dép</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={cx("sub-menu-item")}>
                                        <h3><a href="">PHỤ KIỆN</a></h3>
                                        <ul>
                                            <li>
                                                <a href="">Phụ kiện</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </li> */}
                    </ul>
                </div>
                <div className={cx("brand")}>
                    <a href="/">
                        <img src="https://pubcdn.ivymoda.com/ivy2/images/logo.png" alt="IVY MODA LOGO" />
                    </a>
                </div>
                <div className={cx("control")}>
                    <form>
                        <button type="submit"><GlassIcon/></button>
                        <input type="text" placeholder="TÌM KIẾM SẢN PHẨM"/>
                    </form>
                    <div className={cx("actions")}>
                        <div className={cx("action")}>
                            <a href="" data-bs-toggle="dropdown">
                                <HeadPhoneIcon/>
                            </a>
                            <ul className="dropdown-menu">
                                <li><h2 className="dropdown-header">Trợ giúp</h2></li>
                                <li><a className="dropdown-item" href="#">Hotline</a></li>
                                <li><a className="dropdown-item" href="#">Live chat</a></li>
                                <li><a className="dropdown-item" href="#">Messenger</a></li>
                            </ul>
                        </div>
                        <div className={cx("action")}>
                            <a href={ token && token == "" ? "/login" : "/setting" }>
                                <UserIcon/>
                            </a>
                        </div>
                        <div className={cx("action")}>
                            <a href="" type="button" data-bs-toggle="offcanvas" data-bs-target="#cart">
                                <ShoppingBagIcon/>
                                <span className={cx("number-cart-items")}>{ cartItems?.length }</span>
                            </a>

                            {/* SLIP CART */}

                            <div className={cx("slip-cart", "offcanvas offcanvas-end")} id="cart">
                                <div className={cx("slip-cart-header", 'offcanvas-header')}>
                                    <h3 className="offcanvas-title">Giỏ hàng</h3>
                                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                                </div>
                                <div className={cx("slip-cart-body", 'offcanvas-body')}>
                                    <div className={cx("slip-cart-list")}>

                                        {/* CART ITEMS */}
                                        
                                        {
                                           cartItems?.map((item) => {
                                                return  <div key={item.id + item.productName} className={cx("slip-cart-item")}>
                                                            <div className="cart-item-img">
                                                                <img src={ item.imgSrc } alt="" />
                                                            </div>
                                                            <div className={cx("info")}>
                                                                <h3><a href="">{item.productName}</a></h3>
                                                                <div className={cx("properties")}>
                                                                    <p>Màu sắc: { item.color.name }</p>
                                                                    <p>Size: { item.size.name }</p>
                                                                </div>
                                                                <div className={cx("price-group")}>
                                                                    <div className={cx("quantity-group")}>
                                                                        <button className={cx("minus")}><MinusIcon/></button>
                                                                        <input type="text" placeholder={item.quantity + ""} disabled/>
                                                                        <button className={cx("plus")}><PlusIcon/></button>
                                                                    </div>
                                                                    <h3 className={cx("price")}>{ item.salePrice.toLocaleString("en") }đ</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                            })
                                        }

                                        {/* //// */}

                                    </div>
                                    <div className={cx("slip-cart-bottom")}>
                                        <div className={cx("slip-cart-total-price")}>
                                            Tổng cộng:
                                            <strong>{ cartItems?.reduce((sumPrice, value) => sumPrice + value.salePrice, 0).toLocaleString("en") }đ</strong>
                                        </div>
                                        <div className={cx("slip-cart-actions")}>
                                            {
                                                token && token == "" && <a href="/login">ĐĂNG NHẬP</a>
                                            }
                                            <a href="/cart">XEM GIỎ HÀNG</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);