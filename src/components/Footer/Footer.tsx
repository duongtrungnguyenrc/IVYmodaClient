import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { memo } from 'react';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx("bottom-site")}>
            <div className="bottom-wrapper">
                <div className={cx("main-bottom")}>
                    <div className={cx("bottom-left")}>
                        <div className={cx("certificates")}>
                            <a href="">
                                <img src="https://pubcdn.ivymoda.com/ivy2/images/logo-footer.png" alt="" />
                            </a>
                            <a href="">
                                <img src="https://images.dmca.com/Badges/dmca_protected_16_120.png?ID=0cfdeac4-6e7f-4fca-941f-57a0a0962777" alt="" />
                            </a>
                            <a href="">
                                <img src="https://pubcdn.ivymoda.com/ivy2/images/img-congthuong.png" alt="" />
                            </a>
                        </div>
                        <div className={cx("content")}>
                            <div className={cx("info-content")}>
                                <p>Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650</p>
                                <p><b>Địa chỉ đăng ký:</b> Tổ dân phố Tháp, P.Đại Mỗ, Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam</p>
                                <p><b>Số điện thoại:</b> 0243 205 2222/ 090 589 8683</p>
                                <p><b>Email:</b> cskh@ivy.com.vn</p>
                            </div>
                            <ul className={cx("social-links")}>
                                <li><a href=""><img src="https://pubcdn.ivymoda.com/ivy2/images/ic_fb.svg" alt="" /></a></li>
                                <li><a href=""><img src="https://pubcdn.ivymoda.com/ivy2/images/ic_gg.svg" alt="" /></a></li>
                                <li><a href=""><img src="https://pubcdn.ivymoda.com/ivy2/images/ic_instagram.svg" alt="" /></a></li>
                                <li><a href=""><img src="https://pubcdn.ivymoda.com/ivy2/images/ic_pinterest.svg" alt="" /></a></li>
                                <li><a href=""><img src="https://pubcdn.ivymoda.com/ivy2/images/ic_ytb.svg" alt="" /></a></li>
                            </ul>
                            <div className={cx("hotline")}>
                                <a href="tel:02466623434">HOTLINE: 0246 662 3434</a>
                            </div>
                        </div>
                    </div>
                    <div className={cx("bottom-center")}>
                        <div className="introduction">
                            <h3 className="title-footer">
                                Giới thiệu
                            </h3>
                            <p><a href="">Về IVY moda</a></p>
                            <p><a href="">Tuyển dụng</a></p>
                            <p><a href="">Hệ thống cửa hàng</a></p>
                        </div>
                        <div className="customer-services">
                            <h3 className="title-footer">
                                Dịch vụ khách hàng
                            </h3>
                            <p><a href="">Chính sách điều khoản</a></p>
                            <p><a href="">Hướng dẫn mua hàng</a></p>
                            <p><a href="">Chính sách thanh toán</a></p>
                            <p><a href="">Chính sách đổi trả</a></p>
                            <p><a href="">Chính sách bảo hành</a></p>
                            <p><a href="">Chính sách giao nhận vận chuyển</a></p>
                            <p><a href="">Chính sách thẻ thành viên</a></p>
                            <p><a href="">Hệ thống cửa hàng</a></p>
                            <p><a href="">Q&A</a></p>
                        </div>
                        <div className="contact">
                            <h3>Liên hệ</h3>
                            <p><a href="">Hotline</a></p>
                            <p><a href="">email</a></p>
                            <p><a href="">Live chat</a></p>
                            <p><a href="">Messenger</a></p>
                            <p><a href="">Liên hệ</a></p>
                        </div>
                    </div>
                    <div className={cx("bottom-right")}>
                        <div className={cx("register-form")}>
                            <h3>Nhận thông tin các chương trình của IVY moda</h3>
                            <form method="post" action="">
                                <input type="text" placeholder="Nhập địa chỉ email"/>
                                <button type="submit">Đăng kí</button>
                            </form>
                        </div>
                        <div className={cx("download-app-invite")}>
                            <h3>Download App</h3>
                            <ul>
                                <li>
                                    <a id="app_ios" href="http://ios.ivy.vn" className="link-white" target="_blank" title="Tải App IVYmoda trên App Store"> <img src="https://pubcdn.ivymoda.com/ivy2/images/appstore.png" className="img-fluid" alt=""/> </a>
                                </li>
                                <li>
                                    <a id="app_android" href="http://android.ivy.vn" className="link-white" target="_blank" title="Tải App IVYmoda trên Google Play"> <img src="https://pubcdn.ivymoda.com/ivy2/images/googleplay.png" className="img-fluid" alt=""/> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("copyright")}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM199.4 312.6c-31.2-31.2-31.2-81.9 0-113.1s81.9-31.2 113.1 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9c-50-50-131-50-181 0s-50 131 0 181s131 50 181 0c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0c-31.2 31.2-81.9 31.2-113.1 0z"/>
                </svg>
                IVYmoda All rights reserved
            </div>
        </footer>
    )
}

export default memo(Footer);