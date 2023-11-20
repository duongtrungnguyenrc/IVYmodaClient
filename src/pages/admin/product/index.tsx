import {useState, useEffect, FormEventHandler, ChangeEvent} from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
import './styles.scss';
import { Pagination } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';
import { ProductModel } from '../../../models/Product';
import ProductFilter from '../../../models/ProductFilter';
import axios from "../../../services/CustomAxios";
import { toast } from 'react-toastify';
import { AxiosError, AxiosResponse } from 'axios';
import { ProductsFilter, Skeleton } from '../../../components';
import { AdminLayout } from '../../../layouts';


interface ResponseData {
    page: number;
    totalPages : number;
    products: Array<ProductModel>;
}

interface GroupResponse {  id: Number, name: string, groups: ProductGroup[] }
interface ModelResponse { id: number, height: string, width: string, threeRoundMeasurements: string }

function Product () {
    const [ data, setData ] = useState<ResponseData>({ page: 1, totalPages: 0, products: [] });
    const [ updateDataStatus, setUpdateDataStatus ] = useState<number>();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState<ProductFilter>();
    const [ selectedItem, setSelectedItem ] = useState<number>(0);
    const [ productGroup, setProductGroup ] = useState<{ type: string,  group: string, category: string}>({ type: "", group: "", category: "" });
    const [ groups, setGroups ] = useState<GroupResponse[]>();
    const [ models, setModels ] = useState<ModelResponse[]>();

    useEffect(() => {
        const fetchAllGroups = async () => {
            const response = await axios.get("product-group/all");
            if(response.status == 200) {
                const responseData = response.data.data as GroupResponse[];
                setGroups(responseData); 
                setProductGroup({ type: responseData[0].name, group: responseData[0].groups[0].name, category: responseData[0].groups[0].productCategories[0].name });
            }
        }

        const fetchAllModels = async () => {
            const response = await axios.get("product-model/all");
            if(response.status == 200) {
                setModels(response.data.data);                
            }
        }
        fetchAllGroups();
        fetchAllModels();
    }, []);
    
    useEffect(() => {
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

        groups && groups.length !== 0 && fetchAllProducts();               

    }, [page, filter, updateDataStatus, productGroup.category]);

    // Search
    const __handleSearch : FormEventHandler = useDebouncedCallback((e) => {
        handleSearch(e.target.value);
    }, 300);

    // handle search
    const handleSearch = (search : string) => {
        if (search !== "") {
            let search_results : ProductModel[] = data.products.filter((item) =>
                item.id == parseInt(search.trim()) ||
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
        <AdminLayout>
            <div className="modal fade" id="remove-confirm-modal">
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
            <div className="dashboard-body">
                <div className="modal fade" id="update-product-modal">
                    <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Thêm sản phẩm</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form method="post">
                                <div className="row">
                                    <div className="mb-3 mt-3 col-4">
                                        <label htmlFor="group" className="form-label">Nhóm sản phẩm:</label>
                                        <select id="group" className="form-select" name="group">
                                            <option selected disabled>{ data.products[selectedItem]?.group }</option>
                                            {
                                                
                                                // data?.map((generalGroup) => {
                                                //     return  <>
                                                //                 <option key={generalGroup.id + ""} value={generalGroup.id + ""} disabled>{ generalGroup.name.toUpperCase() }</option>
                                                //                 {
                                                //                     generalGroup.groups.map((group) => {
                                                //                         return <option key={group.id} value={group.id + ""}>{ group.name }</option>
                                                //                     })
                                                //                 }
                                                //             </>
                                                // })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3 mt-3 col-4">
                                        <label htmlFor="category" className="form-label">Danh mục:</label>
                                        <select id="category" className="form-select" name="category">
                                            <option selected disabled>{ data.products[selectedItem]?.category }</option>
                                            {
                                                // data?.map((generalGroup) => {
                                                //     return  <>
                                                //                 {
                                                //                     generalGroup.groups.map((group) => {
                                                //                         return  <>
                                                //                                     <option key={group.id} disabled value={group.id + ""}>{ group.name + " - " + generalGroup.name.toUpperCase() }</option>
                                                //                                 {
                                                //                                     group.productCategories.map((category) => {
                                                //                                         return  <option key={category.id} value={category.id}>{ category.name }</option>
                                                //                                     })
                                                //                                 }
                                                //                                 </>
                                                //                     })
                                                //                 }
                                                //             </>
                                                // })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3 mt-3 col-4">
                                        <label htmlFor="quantity" className="form-label">Số lượng:</label>
                                        <input type="number" className="form-control" id="quantity" name="inStock" defaultValue={0} required/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                                            <input type="text" 
                                                className="form-control" 
                                                id="name" 
                                                placeholder="Nhập tên sản phẩm" 
                                                name="name" 
                                                defaultValue={ data.products[selectedItem]?.name } 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="basePrice" className="form-label">Giá vốn:</label>
                                            <input type="number" 
                                                className="form-control" 
                                                id="basePrice" 
                                                placeholder="Nhập giá vốn" 
                                                name="basePrice" 
                                                defaultValue={ data.products[selectedItem]?.basePrice } 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="salePrice" className="form-label">Giá bán:</label>
                                            <input type="number"
                                                className="form-control" 
                                                id="salePrice" 
                                                placeholder="Nhập giá bán" 
                                                name="salePrice" 
                                                defaultValue={ data.products[selectedItem]?.salePrice } 
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label htmlFor="model" className="form-label">Người mẫu:</label>
                                            <select id="model" className="form-select" name="model">
                                                <option selected disabled>{ data.products[selectedItem]?.model.id }</option>
                                                {/* {
                                                   data.products[selectedItem]?.map((model) => {
                                                        return <option value={ model.id }>{ model.id }</option>
                                                    })
                                                } */}
                                            </select>
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="description" className="form-label">Mô tả sản phẩm:</label>
                                            <textarea 
                                                className="form-control" 
                                                id="description" 
                                                name="description" 
                                                defaultValue={ data.products[selectedItem]?.description } 
                                                rows={5}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="">Màu sắc:</label>
                                                <div className="w-100 border mt-2 color-list rounded" style={{height: "110px"}}>
                                                    <ul>
                                                        {
                                                           data.products[selectedItem]?.colors?.map((color) => {
                                                                return <li key={color.id} className="color-option">
                                                                            <img src={color.src} alt={color.name} />
                                                                        </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                                <label htmlFor="" className="mt-3">Kích cỡ:</label>
                                                <div className="w-100 border mt-2 size-list rounded" style={{height: "110px"}}>
                                                {
                                                    data.products[selectedItem]?.sizes.map((size) => {
                                                        return  <label key={size.name} className="size-option">
                                                                    <span>{size.name}</span>
                                                                </label>
                                                    })
                                                }
                                                </div>
                                                <label htmlFor="" className="mt-3">Hình ảnh:</label>
                                                <div className="w-100 border mt-2 image-list rounded" style={{height: "120px"}}>
                                                    <ul>
                                                        {
                                                            data.products[selectedItem]?.images?.map((image) => {
                                                                return <li key={image.name} className="image-option">
                                                                            <img src={image.src} alt={image.name} />
                                                                        </li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="row">
                                                    <div className="mb-3 col-12">
                                                        <label htmlFor="resourceType" className="form-label">Loại tài nguyên:</label>
                                                        <select id="resourceType" name="resourceType" className="form-select">
                                                            <option selected disabled>Chọn loại tài nguyên</option>
                                                            <option value="images">Hình ảnh</option>
                                                            <option value="colors">Màu sắc</option>
                                                            <option value="sizes">Kích cỡ</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-6 pe-1">
                                                        <label htmlFor="name" className="form-label">Tên tài nguyên:</label>
                                                        <input type="text" className="form-control" id="name" placeholder="Nhập tên" name="name" />
                                                    </div>
                                                    <div className="col-6 ps-1">
                                                        <label htmlFor="extraCoefficient" className="form-label">Chi phí thêm:</label>
                                                        <input type="number" 
                                                            className="form-control" 
                                                            id="extraCoefficient" 
                                                            placeholder="Nhập tỉ lệ" 
                                                            name="extraCoefficient" 
                                                        />
                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        <label htmlFor="src" className="form-label">Địa chỉ:</label>
                                                        <input type="text" 
                                                            className="form-control" 
                                                            id="src" 
                                                            placeholder="Nhập địa chỉ tài nguyên" 
                                                            name="src" 
                                                        />
                                                    </div>
                                                    <div className="col-12 mt-3">
                                                        <button type="button" className="btn btn-dark w-100">Thêm</button>
                                                    </div>
                                                    <div className="" style={{marginTop: "45px"}}>
                                                        <label htmlFor="preserveMethods" className="form-label">Thông tin bảo quản:</label>
                                                        <textarea 
                                                            className="form-control" 
                                                            id="preserveMethods" 
                                                            name="preserveMethods" 
                                                            rows={5}
                                                        >
                                                            { data.products[selectedItem]?.preserveMethods.map((method) => method.description) }
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="reset" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                    <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">Lưu</button>
                                </div>
                            </form>
                        </div>


                        </div>
                    </div>
                </div>
                <div className='dashboard-content pe-2'>
                    <DashboardHeader updateCallback = { setUpdateDataStatus } groups={groups} models={models}/>
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
                                                            return <option key={type.id + ""} value={type.name}>for {type.name}</option>
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
                                                            return <option key={group.id} value={group.name}>{group.name}</option>
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
                                                            return <option key={category.id} value={category.name}>{category.name}</option>
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

                                        <tbody>
                                            {
                                                data.totalPages !== 0 ?
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
                                                            <td>
                                                                <div className='d-flex nowrap'>
                                                                    <button 
                                                                        className='btn btn-secondary me-2' 
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#update-product-modal" 
                                                                        onClick={() => setSelectedItem(product.id)}
                                                                    >
                                                                        Sửa
                                                                    </button>
                                                                    <button 
                                                                        className='btn btn-dark' data-bs-toggle="modal" 
                                                                        data-bs-target="#remove-confirm-modal" 
                                                                        onClick={() => setSelectedItem(product.id)}
                                                                    >
                                                                        Xóa
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <>
                                                        {
                                                            Array(20).fill(null).map((_item, index) => {
                                                                return <tr key={ index } className='data-row'>
                                                                            <td><Skeleton variant='text' width={20}/></td>
                                                                            <td>
                                                                            <div className="product-left">
                                                                                    <Skeleton className='me-3' variant='rectangular' width={50} height={80}/>
                                                                                    <Skeleton variant='text' width={150}/>
                                                                            </div>
                                                                            </td>
                                                                            <td><Skeleton variant='text' width={30}/></td>
                                                                            <td><Skeleton variant='text' width={50}/></td>
                                                                            <td><Skeleton variant='text' width={100}/></td>
                                                                            <td>
                                                                                <ul>
                                                                                    <li className='color-option'>
                                                                                        <Skeleton variant='round' width={20} height={20}/>
                                                                                    </li>
                                                                                    <li className='color-option'>
                                                                                        <Skeleton variant='round' width={20} height={20}/>
                                                                                    </li>
                                                                                    <li className='color-option'>
                                                                                        <Skeleton variant='round' width={20} height={20}/>
                                                                                    </li>
                                                                                    <li className='color-option'>
                                                                                        <Skeleton variant='round' width={20} height={20}/>
                                                                                    </li>
                                                                                </ul>
                                                                            </td>
                                                                            <td>
                                                                                <div className="d-flex nowrap">
                                                                                    <Skeleton className='me-2' variant='rectangular' width={55} height={40}/>
                                                                                    <Skeleton className='me-2' variant='rectangular' width={55} height={40}/>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                            })
                                                        }
                                                    </>
                                            }
                                        </tbody>
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
        </AdminLayout>
    )
}

export default Product;