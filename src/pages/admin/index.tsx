import {useState, useEffect, FormEventHandler, ChangeEvent} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import './styles.scss';
import sidebar_menu from '../../constants/sidebar-menu';
import SideBar from '../../components/Sidebar';
import { Pagination } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';
import { ProductModel } from '../../models/Product';
import ProductFilter from '../../models/ProductFilter';
import axios from "../../services/CustomAxios";
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ProductsFilter } from '../../components';


interface ResponseData {
    page: number;
    totalPages : number;
    products: Array<ProductModel>;
}

function Orders () {
    const [ data, setData ] = useState<ResponseData>({ page: 1, totalPages: 0, products: [] });
    const [ updateDataStatus, setUpdateDataStatus ] = useState<number>();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<ProductFilter>();
    const [ selectedItem, setSelectedItem ] = useState<number>(0);
    const [ groups, setGroups ] = useState<{  id: Number, name: string, groups: ProductGroup[] }[]>();
    const [ productGroup, setProductGroup ] = useState<{ type: string,  group: string, category: string}>({ type: "", group: "", category: "" });
    

    useEffect(() => {

        const fetchAllGroups = async () => {
            const response = await axios.get("product-group/all");
            if(response.status == 200) {
                setGroups(response.data.data);                
            }
        }

        const fetchAllProducts = async () => {
            if(page === 0) {
                setPage(1);
            }
            else {
                let apiRoute = `product/private/all?page=${page}&limit=20`;
                if(productGroup.type != "" && productGroup.group != "" && productGroup.category != "") {
                    apiRoute += `&category=${productGroup.category}&group=${productGroup.type.toUpperCase()}`;
                }
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
                            
                try {
                    const response = await axios.get(apiRoute);
                    setData(response.data.data);           
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
        }        
        fetchAllProducts();
        fetchAllGroups();
    }, [page, filter, updateDataStatus, productGroup.category]);

    // Search
    const __handleSearch : FormEventHandler = useDebouncedCallback((e) => {
        handleSearch(e.target.value);
    }, 300);

    // handle search
    const handleSearch = (search : string) => {
        if (search !== "") {
            let search_results : ProductModel[] = data.products.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.group.toLowerCase().includes(search.toLowerCase()) ||
                item.type.toLowerCase().includes(search.toLowerCase())
            );            
            setData((prevState) => ({...prevState, products: search_results}));
        }
        else {            
            handleChangePage(0);
        }
    }

    // Change Page 
    const handleChangePage = (newPage : number) => {
        setPage(newPage);
    }

    // remove product
    const handleRemoveProduct = async (id: number) => {
        try {
            const response = await toast.promise(
                axios.post("/product/delete", { id }), {
                    success: "Xóa sản phẩm thành công 👌",
                    pending: "Đang xử lý",
                    error: "Không thể xóa sản phẩm 🤯"
                }
            );
    
            if (response.status === 200) {
                setUpdateDataStatus(Math.random() + Math.random());
            }
        } catch (e: any) {
            if (e instanceof AxiosError) {
                toast.error(e.response?.data.message);
            } else {
                console.error("Lỗi không xác định:", e);
            }
    
            localStorage.removeItem("token");
            setTimeout(() => {
                location.href = "/login";
            }, 3000);
        }
    };
    
    // handle change product Group
    const handleChangeProductGroup = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setProductGroup((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    return(
        <div className='dashboard-container'>
            <div className="modal fade" id="confirmRemoved">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận xóa</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Bạn có chắc chắn muốn xóa sản phẩm {selectedItem} không?
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => handleRemoveProduct(selectedItem)}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
            <SideBar menu={sidebar_menu} />
            <div className="dashboard-body">
                <div className='dashboard-content pe-2'>
                    <DashboardHeader updateCallback = { setUpdateDataStatus }/>
                    <div className="row px-3">
                        <div className="col-9">
                            <div className='dashboard-content-container'>
                                <div className='dashboard-content-header'>
                                    <h2>Danh sách sản phẩm</h2>
                                    <div className="d-flex dashboard-filter">
                                        <form action="" className='d-flex gap-2 me-2'>
                                            <div className="form-group">
                                                <select name="type" id="" className="form-select" onChange={handleChangeProductGroup}>
                                                    <option value="" selected disabled>Loại sản phẩm</option>
                                                    {
                                                        groups?.map(type => {
                                                            return <option value={type.name}>for {type.name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select name="group" id="" className="form-select"  onChange={handleChangeProductGroup}>
                                                    <option value="" selected disabled>Nhóm sản phẩm</option>
                                                    {
                                                        productGroup.type != "" ?
                                                        groups?.filter(value => value.name.toLowerCase() === productGroup.type.toLowerCase())[0].groups.map(group => {
                                                            return <option value={group.name}>{group.name}</option>
                                                        }): undefined
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <select name="category" id="" className="form-select"  onChange={handleChangeProductGroup}>
                                                    <option value="" selected disabled>Danh mục sản phẩm</option>
                                                    {
                                                        productGroup.group != "" ?
                                                        groups?.filter(value => value.name.toLowerCase() === productGroup.type.toLowerCase())[0].groups
                                                        .filter(value => value.name.toLowerCase() === productGroup.group.toLowerCase())[0].productCategories.map(category => {
                                                            return <option value={category.name}>{category.name}</option>
                                                        }): undefined
                                                    }
                                                </select>
                                            </div>
                                        </form>
                                        <div className='dashboard-content-search'>
                                            <input
                                                type='text'
                                                placeholder='Search..'
                                                className='dashboard-content-input'
                                                onChange={__handleSearch} />
                                        </div>
                                    </div>
                                </div>

                                <table>
                                    <thead>
                                            <th>ID</th>
                                            <th>TÊN</th>
                                            <th>NHÓM</th>
                                            <th>DANH MỤC</th>
                                            <th>GIÁ</th>
                                            <th>MÀU SẮC</th>
                                            <th></th>
                                    </thead>

                                    {data.totalPages !== 0 ?
                                        <tbody>
                                            {
                                                data.products.map((product, index) => {
                                                    return(
                                                        <tr key={index} className="data-row">
                                                            <td><span>#{product.id}</span></td>
                                                            <td>
                                                                <div className='product-left'>
                                                                    <img 
                                                                        src={product.images[0].src}
                                                                        className='dashboard-content-avatar'
                                                                        alt={product.name} />
                                                                    <span>{product.name}</span>
                                                                </div>
                                                            </td>
                                                            <td><span>{product.group}</span></td>
                                                            <td><span>{product.category}</span></td>
                                                            <td>
                                                                <span>{ product.salePrice.toLocaleString("en")}đ</span>
                                                            </td>
                                                            <td>
                                                                <ul>
                                                                {
                                                                    product.colors.slice(0, 6).map((color) => {
                                                                        return  <li key={color.id} style={{background: color.src}} className={"color-option"}>
                                                                                    <img src={color.src} alt={color.name} />
                                                                                </li>
                                                                    })

                                                                }
                                                                </ul>
                                                            </td>
                                                            <td className='d-flex nowrap'>
                                                                <button className='btn btn-secondary me-2'>Sửa</button>
                                                                <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#confirmRemoved" onClick={() => setSelectedItem(product.id)}>Xóa</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    : null}
                                </table>

                                {data.totalPages !== 0 ?
                                    <div className='dashboard-content-footer'>
                                        <Pagination>
                                            <Pagination.First onClick={() => handleChangePage(1)}/>
                                            <Pagination.Prev onClick={() => page > 1 ? handleChangePage(page - 1) : undefined}/>
                                            {
                                                new Array(data.totalPages).fill(null).map((_value, index) => {
                                                    const i = index + 1;
                                                    return <Pagination.Item key={index} active={page === i} onClick={() => handleChangePage(index + 1)}>{i}</Pagination.Item>
                                                })
                                            }
                                            <Pagination.Next onClick={() => page < data.totalPages ? handleChangePage(page + 1) : undefined}/>
                                            <Pagination.Last onClick={() => handleChangePage(data.totalPages)}/>
                                        </Pagination>
                                    </div>
                                : 
                                    <div className='dashboard-content-footer'>
                                        <span className='empty-table'>No data</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-3 filter-frame">
                            <ProductsFilter applyFilterCallback={ setFilter } category={productGroup.category}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders;