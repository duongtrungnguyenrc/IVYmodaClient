import {useState, useEffect, FormEventHandler, ChangeEvent} from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import "./styles.scss";
import { Pagination } from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";
import Product from "../../../models/Product";
import ProductFilter from "../../../models/ProductFilter";
import axios from "../../../services/CustomAxios";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import { ProductsFilter, Skeleton } from "../../../components";
import { AdminLayout } from "../../../layouts";
import NewProduct from "../../../models/NewProduct";
import { PlusIcon } from "../../../assets/Icons";

interface ResponseData {
    page: number;
    totalPages : number;
    products: Array<Product>;
}

const emptyResource = {
    name: '',
    src: '',
    extraCoefficient: 0,
}

const emptyNewProduct : NewProduct = {
    group: 0,
    category: 0,
    model: 0,
    name: '',
    images: [],
    colors: [],
    sizes: [],
    updateDescription: '',
    rating: [],
    description: '',
    basePrice: 0,
    salePrice: 0,
    inStock: 0,
    preserveMethods: [],
    tag: '',
}

interface GroupResponse {  id: Number, name: string, groups: ProductGroup[] }
interface ModelResponse { id: number, name: string, height: string, width: string, threeRoundMeasurements: string }

function ProductPage () {
    const [ data, setData ] = useState<ResponseData>({ page: 1, totalPages: 0, products: [] });
    const [ updateDataStatus, setUpdateDataStatus ] = useState<number>();
    const [ page, setPage ] = useState(1);
    const [ filter, setFilter ] = useState<ProductFilter>();
    const [ selectedItem, setSelectedItem ] = useState<number>(-1);
    const [ productGroup, setProductGroup ] = useState<{ type: string,  group: string, category: string}>({ type: "", group: "", category: "" });
    const [ groups, setGroups ] = useState<GroupResponse[]>();
    const [ models, setModels ] = useState<ModelResponse[]>();
    const [ newProduct, setNewProduct ] = useState<NewProduct>(emptyNewProduct);
    const [ resourceType, setResourceType ] = useState<string>('');
    const [ resource, setResource ] = useState<{ name: string; src: string; extraCoefficient: number }>(emptyResource);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await toast.promise(
            axios.post("/product/add", newProduct),
            {
              pending: 'Đang xử lý ...',
              success: 'Thêm sản phẩm thành công 👌',
              error: 'Không thể thêm sản phẩm 🤯'
            }
        );

        if(response.status == 200) {
            setUpdateDataStatus(Math.random());
        }
        setNewProduct(emptyNewProduct);
    };

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name: string = e.target.name;
        const value: string | number = e.target.value;

        switch(name.trim()) {
            case 'resourceType':  
                setResourceType(value as string); 
                break;
            case "preserveMethods":
                setNewProduct((prevState) => (
                    { ...prevState, 
                        preserveMethods: [
                            ...prevState.preserveMethods, 
                            { description: value }
                        ] 
                    }
                ));
                break;
            case "category":
                setNewProduct((prevState) => (
                    { ...prevState, 
                        category: parseInt(value.split("-")[0]),
                        group: parseInt(value.split("-")[1])
                    }
                ));
                break;
            default:
                setNewProduct((prevState: any) => ({ ...prevState, [name]: value }));
        }
    }, 300);

    const handleResourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string | number = e.target.value;

        setResource((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSaveResource = () => {
        if (resourceType) {
            setNewProduct((prevState) => ({
                ...prevState,
                [resourceType]: [
                    ...prevState[resourceType],
                    resource,
                ],
            }));
        }
        setResource(emptyResource); 
    };

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
                    if (page > response.data.data.totalPages) {
                        setPage(response.data.data.totalPages);
                    }       
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
    const handleSearch : FormEventHandler = useDebouncedCallback((e) => {
        const value = e.target.value;
        if (value !== "") {
            let search_results : Product[] = data.products.filter((item) =>
                item.id == parseInt(value.trim()) ||
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.group.toLowerCase().includes(value.toLowerCase()) ||
                item.type.toLowerCase().includes(value.toLowerCase())
            );            
            setData((prevState) => ({...prevState, products: search_results}));
        }
        else {            
           setUpdateDataStatus(Math.random());
        }
    }, 300);

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

    const selectedProduct = data?.products.find((product) => product.id === selectedItem);

    const updatedProduct = {
        "id": selectedProduct?.id,
        "category": 1,
        "model": 1,
        "name": selectedProduct?.name,
        "images": selectedProduct?.images,
        "colors": selectedProduct?.colors,
        "sizes": selectedProduct?.sizes,
        "updateDescription": "",
        "description": "",
        "basePrice": 760000,
        "salePrice": 950000,
        "inStock": 10,
        "preserveMethods": [],
        "tag": "NEW"
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
                            Bạn có chắc chắn muốn xóa sản phẩm { data?.products?.find((product) => product.id === selectedItem)?.name } không?
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => handleRemoveProduct(selectedItem)}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* add product form */}

            <div className="modal fade" id="addProductModal">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Thêm sản phẩm</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <form method="post" onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="my-3">
                                        <label htmlFor="category" className="form-label">Danh mục:</label>
                                        <select id="category" className="form-select" name="category" onChange={handleChange} required>
                                            <option selected disabled>Chọn danh mục sản phẩm</option>
                                            {
                                                groups?.map((generalGroup) => { 
                                                    console.log(newProduct.group);
                                                                                                
                                                    return  <>
                                                                {
                                                                    generalGroup?.groups?.map((group) => {
                                                                        return  <>
                                                                                    <option key={group.id} disabled value={group.id + ""}>{ group.name + " - " + generalGroup.name.toUpperCase() }</option>
                                                                                {
                                                                                    group.productCategories.map((category) => {
                                                                                        return  <option key={category.id} value={`${group.id}-${category.id}`}>{ category.name }</option>
                                                                                    })
                                                                                }
                                                                                </>
                                                                    })
                                                                }
                                                            </>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Tên sản phẩm:</label>
                                        <input type="text" className="form-control" id="name" placeholder="Nhập tên sản phẩm" name="name" onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="basePrice" className="form-label">Giá vốn:</label>
                                        <input type="number" className="form-control" id="basePrice" placeholder="Nhập giá vốn" name="basePrice" onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="salePrice" className="form-label">Giá bán:</label>
                                        <input type="number" className="form-control" id="salePrice" placeholder="Nhập giá bán" name="salePrice" onChange={handleChange} required/>
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="model" className="form-label">Người mẫu:</label>
                                        <select id="model" className="form-select" name="model" onChange={handleChange}>
                                            <option selected disabled>Chọn người mẫu</option>
                                            {
                                                models?.map((model) => {
                                                    return <option value={ model.id }>{ model.name }</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="description" className="form-label">Mô tả sản phẩm:</label>
                                        <textarea className="form-control" id="description" name="description" onChange={handleChange} rows={5}></textarea>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="my-3 col-12">
                                            <label htmlFor="quantity" className="form-label">Số lượng:</label>
                                            <input type="number" className="form-control" id="quantity" name="inStock" defaultValue={0} onChange={handleChange} required/>
                                        </div>
                                        <div className="mb-3 col-12">
                                            <label htmlFor="resourceType" className="form-label">Loại tài nguyên:</label>
                                            <select id="resourceType" name="resourceType" className="form-select" onChange={handleChange}>
                                                <option selected disabled>Chọn loại tài nguyên</option>
                                                <option value="images">Hình ảnh</option>
                                                <option value="colors">Màu sắc</option>
                                                <option value="sizes">Kích cỡ</option>
                                            </select>
                                        </div>
                                        <div className="col-6 pe-1">
                                            <label htmlFor="name" className="form-label">Tên tài nguyên:</label>
                                            <input type="text" className="form-control" id="name" placeholder="Nhập tên" value={resource.name} name="name" onChange={handleResourceChange}/>
                                        </div>
                                        <div className="col-6 ps-1">
                                            <label htmlFor="extraCoefficient" className="form-label">Chi phí thêm:</label>
                                            <input type="number" 
                                                className="form-control" 
                                                id="extraCoefficient" 
                                                placeholder="Nhập tỉ lệ" 
                                                value={resource.extraCoefficient} 
                                                name="extraCoefficient" 
                                                onChange={handleResourceChange} 
                                                disabled={resourceType === "images"}
                                            />
                                        </div>
                                        <div className="col-12 mt-3">
                                            <label htmlFor="src" className="form-label">Địa chỉ:</label>
                                            <input type="text" 
                                                className="form-control" 
                                                id="src" 
                                                placeholder="Nhập địa chỉ tài nguyên" 
                                                value={resource.src} 
                                                name="src" 
                                                onChange={handleResourceChange}
                                                disabled={resourceType === "sizes"}
                                            />
                                        </div>
                                        <div className="col-12 mt-3">
                                            <button type="button" className="btn btn-dark w-100" onClick={() => handleSaveResource()}>Thêm</button>
                                        </div>
                                        <div className="" style={{marginTop: "50px"}}>
                                            <label htmlFor="preserveMethods" className="form-label">Thông tin bảo quản:</label>
                                            <textarea className="form-control" id="preserveMethods" name="preserveMethods" rows={5} onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <label htmlFor="" className="mt-3">Màu sắc:</label>
                                    <div className="w-100 border mt-2 color-list rounded h-25">
                                        <ul>
                                            {
                                                newProduct?.colors?.map((color) => {
                                                    return <li key={color.name} className="color-option">
                                                                <img src={color.src} alt={color.name} />
                                                            </li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <label htmlFor="" className="mt-3">Kích cỡ:</label>
                                    <div className="w-100 border mt-2 size-list rounded h-25">
                                        {
                                        newProduct.sizes.map((size) => {
                                            return  <label key={size.name} className="size-option">
                                                        <span>{ size.name.toUpperCase() }</span>
                                                    </label>
                                        })
                                        }
                                    </div>
                                    <label htmlFor="" className="mt-3">Hình ảnh:</label>
                                    <div className="w-100 border mt-2 image-list rounded h-25">
                                        <ul>
                                            {
                                                newProduct?.images?.map((image) => {
                                                    return <li key={image.name} className="image-option">
                                                                <img src={image.src} alt={image.name} />
                                                            </li>
                                                })
                                            }
                                        </ul>
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

            {/* update product form */}

            <div className="modal fade" id="update-product-modal">
                <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Cập nhật sản phẩm</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        <form method="post">
                            <div className="row">
                                <div className="mb-3 mt-3 col-4">
                                    <label htmlFor="group" className="form-label">Mô tả cập nhật:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="mb-3 mt-3 col-4">
                                    <label htmlFor="category" className="form-label">Danh mục:</label>
                                    <select id="category" className="form-select" name="category">
                                        <option defaultChecked>{ selectedProduct?.category }</option>
                                        {
                                            groups?.map((generalGroup) => {
                                                return  <>
                                                            {
                                                                generalGroup.groups.map((group) => {
                                                                    return  <>
                                                                                <option key={group.id} disabled value={group.id + ""}>{ group.name + " - " + generalGroup.name.toUpperCase() }</option>
                                                                            {
                                                                                group.productCategories.map((category) => {
                                                                                    return  <option key={category.id} value={category.id}>{ category.name }</option>
                                                                                })
                                                                            }
                                                                            </>
                                                                })
                                                            }
                                                        </>
                                            })
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
                                            defaultValue={ selectedProduct?.name } 
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
                                            defaultValue={ selectedProduct?.basePrice } 
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
                                            defaultValue={ selectedProduct?.salePrice } 
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="model" className="form-label">Người mẫu:</label>
                                        <select id="model" className="form-select" name="model">
                                            <option defaultChecked>{ selectedProduct?.model?.name }</option>
                                            {
                                                models?.filter((model) => model.id != selectedProduct?.model?.id).map((model) => {
                                                    return <option key={model.id} value={ model.id }>{ model.name }</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="description" className="form-label">Mô tả sản phẩm:</label>
                                        <textarea 
                                            className="form-control" 
                                            id="description" 
                                            name="description" 
                                            defaultValue={ selectedProduct?.description } 
                                            rows={5}
                                        />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="">Màu sắc:</label>
                                            <div className="w-100 border mt-2 color-list rounded">
                                                <ul>
                                                    {
                                                        data?.products.find((product) => product.id === selectedItem)?.colors.map((color) => {
                                                            return <li key={color.id} className="color-option">
                                                                        <img src={color.src} alt={color.name} />
                                                                    </li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <label htmlFor="" className="mt-3">Kích cỡ:</label>
                                            <div className="w-100 border mt-2 size-list rounded">
                                            {
                                                data?.products.find((product) => product.id === selectedItem)?.sizes.map((size) => {
                                                    return  <label key={size.name} className="size-option">
                                                                <span>{size.name}</span>
                                                            </label>
                                                })
                                            }
                                            </div>
                                            <label htmlFor="" className="mt-3">Hình ảnh:</label>
                                            <div className="w-100 border mt-2 image-list rounded">
                                                <ul>
                                                    {
                                                            data?.products.find((product) => product.id === selectedItem)?.images?.map((image) => {
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
                                                        { selectedProduct?.preserveMethods.map((method) => method.description) }
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
            <div className="dashboard-body">
                <div className="dashboard-content pe-2">
                    <DashboardHeader/>
                    <div className="row px-3">
                        <div className="col-9">
                            <div className="dashboard-content-container">
                                <div className="dashboard-content-header">
                                    <h2>Danh sách sản phẩm</h2>
                                    <div className="d-flex dashboard-filter">
                                        <form action="" className="d-flex gap-2 me-2">
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
                                        <div className="dashboard-content-search">
                                            <input
                                                type="text"
                                                placeholder="Search.."
                                                className="dashboard-content-input"
                                                onChange={handleSearch} />
                                        </div>
                                    </div>
                                </div>

                                <table>
                                    <thead>
                                        <th></th>
                                        <th>ID</th>
                                        <th>TÊN</th>
                                        <th>NHÓM</th>
                                        <th>DANH MỤC</th>
                                        <th>GIÁ</th>
                                        <th>MÀU SẮC</th>
                                    </thead>

                                    <tbody>
                                        {
                                            data.products.length > 0 ?
                                            data.products.map((product) => {
                                                return(
                                                    <tr key={product.id} className="data-row"  onClick={() => setSelectedItem(product.id)}>
                                                        <td><input type="radio" name="selected" value={ product.id } checked={product.id === selectedItem}/></td>
                                                        <td><span>#{product.id}</span></td>
                                                        <td>
                                                            <div className="product-left">
                                                                <img 
                                                                    src={product.images[0]?.src}
                                                                    className="dashboard-content-avatar"
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
                                                                    return  <li key={color.id} style={{background: color?.src}} className={"color-option"}>
                                                                                <img src={color.src} alt={color.name} />
                                                                            </li>
                                                                })

                                                            }
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                )
                                            })  : <>
                                                    {
                                                        Array(20).fill(null).map((_item, index) => {
                                                            return <tr key={ index } className="data-row">
                                                                        <td><Skeleton variant="text" width={20}/></td>
                                                                        <td>
                                                                        <div className="product-left">
                                                                                <Skeleton className="me-3" variant="rectangular" width={50} height={80}/>
                                                                                <Skeleton variant="text" width={150}/>
                                                                        </div>
                                                                        </td>
                                                                        <td><Skeleton variant="text" width={30}/></td>
                                                                        <td><Skeleton variant="text" width={50}/></td>
                                                                        <td><Skeleton variant="text" width={100}/></td>
                                                                        <td>
                                                                            <ul>
                                                                                <li className="color-option">
                                                                                    <Skeleton variant="round" width={20} height={20}/>
                                                                                </li>
                                                                                <li className="color-option">
                                                                                    <Skeleton variant="round" width={20} height={20}/>
                                                                                </li>
                                                                                <li className="color-option">
                                                                                    <Skeleton variant="round" width={20} height={20}/>
                                                                                </li>
                                                                                <li className="color-option">
                                                                                    <Skeleton variant="round" width={20} height={20}/>
                                                                                </li>
                                                                            </ul>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex nowrap">
                                                                                <Skeleton className="me-2" variant="rectangular" width={55} height={40}/>
                                                                                <Skeleton className="me-2" variant="rectangular" width={55} height={40}/>
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
                                    <div className="dashboard-content-footer">
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
                                    <div className="dashboard-content-footer">
                                        <span className="empty-table">No data</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="filter-frame">
                                <ProductsFilter applyFilterCallback={ setFilter } category={productGroup.category}/>
                            </div>
                            {
                                selectedItem != -1 && 

                                    <div className="update-record-frame mt-3">
                                        <h3>Lịch sử cập nhật</h3>
                                        <div className="record-list mt-4">
                                            {
                                                data.products.find((product) => product.id === selectedItem)?.updateRecords.map((record) => {
                                                    return <div key={record.id} className="bg-light rounded border p-2">
                                                        <p className="mb-1"><strong>Thời gian:</strong> {new Date(record.time).toLocaleString()}</p>
                                                        <p className="mb-0">Mô tả: {record.description}</p>
                                                    </div>
                                                })
                                            }
                                        </div>
                                        <div className="d-flex justify-content-end nowrap mt-3">
                                            <button 
                                                className="btn btn-secondary me-2" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#update-product-modal" 
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
                                                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                                </svg>
                                            </button>
                                            <button 
                                                className="btn btn-dark" data-bs-toggle="modal" 
                                                data-bs-target="#remove-confirm-modal" 
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#fff">
                                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                               </svg>
                                            </button>
                                        </div>
                                    </div>
                            
                            }
                            <button 
                                className="btn btn-dark position-fixed" 
                                style={{bottom: "20px", right: "20px"}} 
                                data-bs-toggle="modal" 
                                data-bs-target="#addProductModal"
                            >
                                <PlusIcon fill="#fff"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ProductPage;