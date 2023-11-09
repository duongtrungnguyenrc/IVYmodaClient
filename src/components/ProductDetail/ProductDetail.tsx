import { useState, memo } from "react";
import { ChevronDownIcon, ChevronUpIcon, HeartIcon, MinusIcon, PlusIcon, RulerIcon, StarIcon } from "../../assets/Icons";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { ProductModel } from "../../models/Product";
import CartProduct from "../../models/CartProduct";

const cx = classNames.bind(styles);


const MoreDetail = ({ product } : { product: ProductModel }) => {
    const [ isShow, setIsShow ] = useState(false);

    const handleShowContent = () => {
       setIsShow((prevState) => {
        return prevState ? false : true;
       })
    };

    const handleAddToCart = () => {
        const item : CartProduct = {
            id: product.id,
            imgSrc: product.images[0].src,
            productName: product.name,
            salePrice: product.salePrice,
            quantity: 1,
            size: string,
            color: string,
        }
    }
    
    return (
        <div className={cx("product-detail", "more-detail")}>
            <div className={cx("more-detail-tabs")}>
                <div className={cx("more-detail-tab", "active")}>
                    Giới thiệu
                </div>
                <div className={cx("more-detail-tab")}>
                    Chi tiết sản phẩm
                </div>
                <div className={cx("more-detail-tab")}>
                    Bảo quản
                </div>
            </div>
            <div className={cx("tab-body")}>
                <div className={cx("content")}>
                    <div className={cx("content-tab", { "show": isShow }, "active")}>
                        <p>
                            { product.description }
                        </p>
                        <div className={cx("sub-content-tab")}>
                            <p>
                                <strong>Mẫu mặc size:</strong> M
                            </p>
                            <p>
                                <strong>Chiều cao:</strong> { product.model.height }
                            </p>
                            <p>
                                <strong>Cân nặng:</strong> { product.model.weight }
                            </p>
                            <p>
                                <strong>Số đo:</strong>  { product.model.threeRoundMeasurements }
                            </p>
                            <p>Mẫu mặc size M Lưu ý: Màu sắc sản phẩm thực tế sẽ có sự chênh lệch nhỏ so với ảnh do điều kiện ánh sáng khi chụp và màu sắc hiển thị qua màn hình máy tính/ điện thoại.</p>
                        </div>
                    </div>
                    <div className={cx("content-tab")}>
                        <p>
                            Đầm dáng suông được nhấn ở eo. Thân trên đầm bao gồm những chi tiết: cổ tròn, phía trước là chi tiết cut-out phối cùng các hạt ngọc trai tạo điểm nhấn, tay ngắn hơi phồng nhẹ. Dáng đầm dài qua gối, phía sau có xẻ tà.
                        </p>
                        <div className={cx("sub-content-tab")}>
                            <p>
                                Một thiết kế đầm phù hợp cho nàng thanh lịch và yêu thích phong cách cổ điển. Chất liệu tuysi cao cấp giữ form dáng đầm luôn chỉn chu, thiết kế đầm giúp che khuyết điểm và tôn lên vóc dáng nàng. Phần cut-out hướng ánh mắt người nhìn vào những chi tiết đắt giá. Mẫu đầm dành cho nàng đi làm và đi sự kiện.
                            </p>
                            <p>
                                <strong>Mẫu mặc size:</strong> M
                            </p>
                            <p>
                                <strong>Chiều cao:</strong> 1m67
                            </p>
                            <p>
                                <strong>Cân nặng:</strong> 50kg
                            </p>
                            <p>
                                <strong>Số đo:</strong>  83-65-93cm
                            </p>
                        </div>
                    </div>
                    <div className={cx("content-tab")}>
                        <p>
                            Đầm dáng suông được nhấn ở eo. Thân trên đầm bao gồm những chi tiết: cổ tròn, phía trước là chi tiết cut-out phối cùng các hạt ngọc trai tạo điểm nhấn, tay ngắn hơi phồng nhẹ. Dáng đầm dài qua gối, phía sau có xẻ tà.
                        </p>
                        <div className={cx("sub-content-tab")}>
                           {
                            product.preserveMethods.map((method) => {
                                return <p key={ method.id }>{ method.description }</p>
                            })
                           }
                        </div>
                    </div>
                </div>
                <button 
                    className={cx("show-more-btn")} 
                    onClick={() => handleShowContent()}
                    >
                    {
                        isShow ? <ChevronUpIcon/> : <ChevronDownIcon/>
                    }
                </button>
            </div>
        </div>
    )
}

const MemoizedMoreDetail = memo(MoreDetail);

const ProductDetail = ({ product } : { product: ProductModel }) => {
    const [ activeData, setActiveData ] = useState<{ color: string, size: string, quantity: number }>({ color: product.colors[0].name, size: "", quantity: 1 });

    const setQuantity = (quantity : number) => {
        setActiveData((prevState) => { 
            return {...prevState, quantity: quantity};
         })
    }

    const decreaseQuantity = () => {
        if(activeData.quantity > 1) {
            setQuantity(activeData.quantity - 1);
        }
    }

    const increaseQuantity = () => {
        if(activeData.quantity < 10) {
            setQuantity(activeData.quantity + 1);
        }
    }
    
    return ( 
        <div className={cx("product-details")}>
            <h1>{product.name}</h1>
            <div className={cx("product-detail", "detail-sub-info")}>
                <p>SKU: 45S2770</p>
                <div className={cx("customer-rated")}>
                    <div className={cx("rated-stars")}>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                        <StarIcon/>
                    </div>
                    <span>(1 Đánh giá)</span>
                </div>
            </div>
            <div className={cx("product-detail", "price-detail")}>
                <p>{product.salePrice.toLocaleString('en-US')} VNĐ</p>
            </div>
            <div className={cx("product-detail", "color-detail")}>
                <p>Màu sắc: { activeData.color }</p>
                <div className={cx("color-options")}>
                    {
                        product?.colors.map((color) => {
                            return  <label className={cx("color-option", "active")}>
                                        <input type="radio" name="color" value={color.id} defaultChecked/>
                                        <span>
                                            <img src={color.src} alt={color.name} />
                                        </span>
                                    </label>
                        })
                    }
                </div>
            </div>
            <div className={cx("product-detail", "size-detail")}>
                <div className={cx("size-options")}>
                    {
                        product?.sizes.map((size) => {
                            return (
                                <label key={size.id} className={cx("size-option", "active")}>
                                    <input type="radio" name="size" defaultChecked/>
                                    <span>{size.name}</span>
                                </label>
                            )
                        })
                    }
                </div>
                <a href=""><RulerIcon/>Kiểm tra size của bạn</a>
            </div>
            <div className={cx("product-detail", "quantity-detail")}>
                <p>Số lượng</p>
                <div className={cx("quantity-group")}>
                    <button className={cx("minus")} onClick={() => decreaseQuantity()}><MinusIcon/></button>
                    <input type="text" value={activeData.quantity + "" }/>
                    <button className={cx("plus")} onClick={() => increaseQuantity()}><PlusIcon/></button>
                </div>
            </div>
            <div className={cx("product-detail", "actions-detail")}>
                <div className={cx("actions-group")}>
                    <button className={cx("dark-btn")} onClick={() => handleAddToCart()}>Thêm vào giỏ</button>
                    <button>Mua hàng</button>
                    <button className={cx("love")}><HeartIcon/></button>
                </div>
                <div className={cx("find-at-store")}>
                    <a href="">Tìm tại cửa hàng</a>
                </div>
            </div>
            <MemoizedMoreDetail product={product}/>
        </div>
     );
}

export default ProductDetail;