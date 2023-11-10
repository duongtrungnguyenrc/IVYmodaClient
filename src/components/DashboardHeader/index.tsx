
import "./styles.scss";
import NotificationIcon from "../../assets/icons/notification.svg";
import SettingsIcon from "../../assets/icons/settings.svg";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import NewProduct from "../../models/NewProduct";
import axios from "../../services/CustomAxios";
import { toast } from "react-toastify";

const emptyResource = {
    name: '',
    src: '',
    extraCoefficient: 0,
}

const emptyNewProduct : NewProduct = {
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

function DashboardHeader ({ updateCallback } : { updateCallback: Function }) {
    const [newProduct, setNewProduct] = useState<NewProduct>(emptyNewProduct);
    const [resourceType, setResourceType] = useState<string>('');
    const [resource, setResource] = useState<{ name: string; src: string; extraCoefficient: number }>(emptyResource);
    const [ data, setData ] = useState<{  id: Number, name: string, groups: ProductGroup[] }[]>();
    const [ models, setModels ] = useState<{ id: number, height: string, width: string, threeRoundMeasurements: string }[]>();

    useEffect(() => {
        const fetchAllGroups = async () => {
            const response = await axios.get("product-group/all");
            if(response.status == 200) {
                setData(response.data.data);                
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
            updateCallback(Math.random());
        }
        setNewProduct(emptyNewProduct);
    };

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name: string = e.target.name;
        const value: string | number = e.target.value;

        if (name.trim() === 'resourceType') {
            setResourceType(value as string);
        }
        else if(name.trim() === "preserveMethods") {
            setNewProduct((prevState) => (
                { ...prevState, 
                    preserveMethods: [
                        ...prevState.preserveMethods, 
                        { description: value }
                    ] 
                }
            ));
        }
        else {
            setNewProduct((prevState) => ({ ...prevState, [name]: value }));
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

    return(
        <div className="dashbord-header-container">
            <button className="dashbord-header-btn" data-bs-toggle="modal" data-bs-target="#addProductModal">Thêm sản phẩm</button>
            <div className="dashbord-header-right">
                <img 
                    src={NotificationIcon}
                    alt="notification-icon"
                    className="dashbord-header-icon" />
                <img 
                    src={SettingsIcon}
                    alt="settings-icon"
                    className="dashbord-header-icon" />
                <img
                    className="dashbord-header-avatar"
                    src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/328887108_3335174406743347_335102794497930188_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHUOCZ-4c-8ZB-mLYcGdXnSKw-AAZl0fTArD4ABmXR9MNwWAO2V14gZN9_nca8gzEqaa6ef4yTp8zSOtrh4SS8a&_nc_ohc=OszKM2yYze4AX-ks-w_&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfDVaCGqHFiUAOA0I_aUl6obg9WrBMD0peIFYzWx5WzCPg&oe=65529CDE" />
            </div>

            {/* add data form */}

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
                                <div className="mb-3 mt-3 col-4">
                                    <label htmlFor="group" className="form-label">Nhóm sản phẩm:</label>
                                    <select id="group" className="form-select" name="group" onChange={handleChange}>
                                        <option selected disabled>Chọn nhóm sản phẩm</option>
                                        {
                                            data?.map((generalGroup) => {
                                                return  <>
                                                            <option key={generalGroup.id + ""} value={generalGroup.id + ""} disabled>{ generalGroup.name.toUpperCase() }</option>
                                                            {
                                                                generalGroup.groups.map((group) => {
                                                                    return <option key={group.id} value={group.id + ""}>{ group.name }</option>
                                                                })
                                                            }
                                                        </>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-3 mt-3 col-4">
                                    <label htmlFor="category" className="form-label">Danh mục:</label>
                                    <select id="category" className="form-select" name="category" onChange={handleChange}>
                                        <option selected disabled>Chọn danh mục sản phẩm</option>
                                        {
                                            data?.map((generalGroup) => {
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
                                    <input type="number" className="form-control" id="quantity" name="inStock" defaultValue={0} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
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
                                                    return <option value={ model.id }>{ model.id }</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="description" className="form-label">Mô tả sản phẩm:</label>
                                        <textarea className="form-control" id="description" name="description" onChange={handleChange} rows={5}></textarea>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6">
                                            <label htmlFor="">Màu sắc:</label>
                                            <div className="w-100 border mt-2 color-list rounded" style={{height: "110px"}}>
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
                                            <div className="w-100 border mt-2 size-list rounded" style={{height: "110px"}}>
                                               {
                                                newProduct.sizes.map((size) => {
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
                                                        newProduct?.images?.map((image) => {
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
                                                <div className="" style={{marginTop: "45px"}}>
                                                    <label htmlFor="preserveMethods" className="form-label">Thông tin bảo quản:</label>
                                                    <textarea className="form-control" id="preserveMethods" name="preserveMethods" rows={5} onChange={handleChange}></textarea>
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
        </div>
    )
}

export default DashboardHeader;