import {useState, useEffect, FormEventHandler} from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import './styles.scss';
import sidebar_menu from '../../constants/sidebar-menu';
import SideBar from '../../components/Sidebar';
import { Pagination } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';
import { ProductModel } from '../../models/Product';
import ProductFilter from '../../models/ProductFilter';
import axios from "../../services/CustomAxios";


interface ResponseData {
    page: number;
    totalPages : number;
    products: Array<ProductModel>;
}

function Orders () {
    const [ data, setData ] = useState<ResponseData>({ page: 1, totalPages: 0, products: [] });
    const [ updateDataStatus, setUpdateDataStatus ] = useState();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<ProductFilter>();

    useEffect(() => {
        const fetchData = async () => {
            let apiRoute = `product/all?page=${page}&limit=20&category=${"Áo sơ mi"}&group=${"LADIES"}`;
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
                setData(response.data.data);           
            }
        }
        console.log("fetch");
        
        fetchData();
    }, [page, filter, updateDataStatus]);

    // Search
    const __handleSearch : FormEventHandler = useDebouncedCallback((e) => {
        let search : string = e.target.value;
        if (search !== "") {
            let search_results : ProductModel[] = data.products.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.group.toLowerCase().includes(search.toLowerCase()) ||
                item.type.toLowerCase().includes(search.toLowerCase())
            );            
            setData((prevState) => ({...prevState, products: search_results}));
        }
        else {
            console.log("clear");
            
            handleChangePage(1);
        }
    }, 300);

    // Change Page 
    const handleChangePage = (newPage : number) => {
        setPage(newPage);
    }

    return(
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className="dashboard-body">
            <div className='dashboard-content'>
                <DashboardHeader updateCallback = { setUpdateDataStatus }/>

                <div className='dashboard-content-container'>
                    <div className='dashboard-content-header'>
                        <h2>Orders List</h2>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                placeholder='Search..'
                                className='dashboard-content-input'
                                onChange={__handleSearch} />
                        </div>
                    </div>

                    <table>
                        <thead>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>GROUP</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>COLORS</th>
                                <th>CONTROL</th>
                        </thead>

                        {data.totalPages !== 0 ?
                            <tbody>
                                {data.products.map((product, index) => (
                                    <tr key={index}>
                                        <td><span>#{product.id}</span></td>
                                        <td>
                                            <div>
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
                                        <td>
                                            <button className='btn btn-secondary me-2'>Sửa</button>
                                            <button className='btn btn-dark'>Xóa</button>
                                        </td>
                                    </tr>
                                ))}
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
            </div>
        </div>
    )
}

export default Orders;