import { useState} from "react";
import { ChevronDownIcon, ChevronUpIcon} from "../../assets/Icons";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { ProductModel } from "../../models/Product";

const cx = classNames.bind(styles);


const ProductDetail = ({ product } : { product: ProductModel }) => {
    const [ isShow, setIsShow ] = useState(false);

    const handleShowContent = () => {
       setIsShow((prevState) => {
        return prevState ? false : true;
       })
    };
    
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

export default ProductDetail;