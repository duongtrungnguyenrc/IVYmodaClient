import { ReactEventHandler, memo, useEffect, useState } from "react";
import styles from "./ProductsFilter.module.scss";
import classNames from "classnames/bind";
import axios from "../../services/CustomAxios";
import { useDebouncedCallback } from "use-debounce";
import ProductFilter from "../../models/ProductFilter";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

function ProductsFilter({ applyFilterCallback, category } : { applyFilterCallback: Function, category ?: string }) {
    const [ activeOptions, setActiveOptions ] = useState<number[]>([]);
    const [ filterOptions, setFilterOptions ] = useState<{ sizes: { id: number, name: string }[], colors: { id: number, src: string, name: string }[] }>();
    const [filter, setFilter] = useState<ProductFilter>({
        color: "",
        size: "",
        tag: "",
        rangePrice: { min: 0, max: 10000000 }
    });
    const params = useSearchParams();
    const categoryParams = params[0].get("name") || params[0].get("category");
      

    useEffect(() => {
        const fetchFilterOptions = async () => {
            let query = "/product/filter";
            if(category) {
                query += `?category=${category && category != "" ? category : categoryParams}`;
            }
            const response = await axios.get(query);

            if(response.status === 200) {
                setFilterOptions(response.data);                
            }
        }
        fetchFilterOptions();        
    }, [category, categoryParams]);

    
    const toggleFilterGroup = (activeOption: number) => {
        setActiveOptions((prevState) => {
            if (prevState.includes(activeOption)) {
                return prevState.filter((option) => option !== activeOption);
            } else {
                return [...prevState, activeOption];
            }
        });
    };

    const handleInput = useDebouncedCallback((e) => {
        if (e.target instanceof HTMLInputElement) {
            const name = e.target.name;
            const value = e.target.value;            

            if(name.trim() == "max" || name.trim() == "min") {
                if(name === "max") {                    
                    setFilter((prevState) => ({
                        ...prevState,
                        rangePrice: {
                            ...prevState.rangePrice,
                            [name]: (10000000 - parseFloat(value))
                        }
                    }));
                }
        
                else {
                    setFilter((prevState) => ({
                        ...prevState,
                        rangePrice: {
                            ...prevState.rangePrice,
                            [name]: parseFloat(value)
                        }
                    }));
                }
            } else {
                setFilter((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }            
        }        
    }, 300);

    const handleSubmit : ReactEventHandler = (e) => {
        e.preventDefault();        
        applyFilterCallback(filter);
    }

    const handleReset : ReactEventHandler = (e) => {
        e.preventDefault();
        applyFilterCallback(null);
    }
    
    return ( 
        <div className={cx("side-bar")}>
           <form method="post" onSubmit={handleSubmit} onReset={handleReset}>
                <ul>
                    <li>
                        <p className={cx({"active" : activeOptions?.includes(0)})}>Size
                            <button type="button" onClick={() => toggleFilterGroup(0)}>
                                <span className={cx("show-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                </span>
                                <span className={cx("hide-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </span>
                            </button>
                        </p>
                        <div className={cx("sub-list-side")}>
                            {
                                filterOptions?.sizes.map((size) => {                                    
                                    return  <label key={size.id} className={cx("item-sub-list")}>
                                                <input className="field-cat" type="radio" name="size" value={ size.name } onChange={handleInput} />
                                                <span>{ size.name }</span>
                                            </label>
                                })

                            }
                        </div>
                    </li>
                    <li>
                        <p className={cx({"active" : activeOptions?.includes(1)})}>Màu sắc
                            <button type="button" onClick={() => toggleFilterGroup(1)}>
                                <span className={cx("show-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                </span>
                                <span className={cx("hide-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </span>
                            </button>
                        </p>
                        <div className={cx("sub-list-side")}>
                            {
                                filterOptions?.colors.map((color) => {
                                    return <label key={color.id} style={{background: color.src}} className={cx("color-option", {"checked": false})}>
                                                <input type="radio" name="color" value={color.name} onChange={handleInput}/>
                                                <span><img src={color.src} alt={color.name} /></span>                                          
                                            </label>
                                })
                            }
                        </div>
                    </li>
                    <li>
                        <p className={cx({"active" : activeOptions?.includes(2)})}>Mức giá
                            <button type="button" onClick={() => toggleFilterGroup(2)}>
                                <span className={cx("show-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                </span>
                                <span className={cx("hide-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </span>
                            </button>
                        </p>
                        <div className={cx("sub-list-side")}>
                            <div className={cx("range-price")}>
                                <div className="d-flex">
                                    <input type="range" name="min" id="" className="w-100 form-range" min={0} max={5000000} onChange={handleInput} />
                                    <input type="range" name="max" id="" className="w-100 form-range" min={0} max={5000000} onChange={handleInput} />
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span>{filter.rangePrice.min.toLocaleString("en")}đ</span>
                                    <span>{filter.rangePrice.max.toLocaleString("en")}đ</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <p className={cx({"active" : activeOptions?.includes(3)})}>Mức chiết khấu
                            <button type="button" onClick={() => toggleFilterGroup(3)}>
                                <span className={cx("show-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                </span>
                                <span className={cx("hide-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </span>
                            </button>
                        </p>
                        <div className={cx("sub-list-side")}>
                            <input type="hidden" name="hid_size"/>
                            <label className={cx("item-sub-list")}>
                                <input className="field-cat" type="radio" name="size" value="s"/>
                                <span>S</span>
                            </label>
                            <label className={cx("item-sub-list")}>
                                <input className="field-cat" type="radio" name="size" value="m"/>
                                <span>M</span>
                            </label>
                            <label className={cx("item-sub-list")}>
                                <input className="field-cat" type="radio" name="size" value="l"/>
                                <span>L</span>
                            </label>
                            <label className={cx("item-sub-list")}>
                                <input className="field-cat" type="radio" name="size" value="xl"/>
                                <span>XL</span>
                            </label>
                            <label className={cx("item-sub-list")}>
                                <input className="field-cat" type="radio" name="size" value="xxl"/>
                                <span>XXL</span>
                            </label>
                        </div>
                    </li> */}
                    <li>
                        <p className={cx({"active" : activeOptions?.includes(3)})}>Nâng cao
                            <button type="button" onClick={() => toggleFilterGroup(3)}>
                                <span className={cx("show-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                                    </svg>
                                </span>
                                <span className={cx("hide-icon")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                    </svg>
                                </span>
                            </button>
                        </p>
                        <div className={cx("sub-list-side", "flex-column")}>
                            <label htmlFor="new-tag" className="d-flex gap-2">
                                <input type="radio" id="new-tag" name="tag" value="NEW"  onChange={handleInput}/>
                                Sản phẩm mới
                            </label>
                            <label htmlFor="best-seller-tag" className="d-flex gap-2">
                                <input type="radio" id="best-seller-tag" name="tag" value="BEST_SELLER"  onChange={handleInput}/>
                                Sản phẩm bán chạy
                            </label>
                        </div>
                    </li>
                </ul>
                <div className={cx("btn-group")}>
                    <button type="reset" className={cx("btn")}>Bỏ lọc</button>
                    <button type="submit" className={cx("btn")}>Lọc</button>
                </div>
           </form>
        </div>
     );
}

export default memo(ProductsFilter);