import classNames from "classnames/bind";
import styles from "./MainGallery.module.scss";

const cx = classNames.bind(styles);

const MainGallery = () => {
  return (
    <section className={cx("main-gallery")}>
      <div className={cx("gallery-header")}>
        GALLERY
      </div>
      <div className={cx("gallery-body")}>
        <div className={cx("gallery-item")}>
          <a href="">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/06/30/4877dbf98c0375a7a93436e69ddff15a.jpg" alt="" />
          </a>
        </div>
        <div className={cx("gallery-item")}>
          <a href="">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/06/30/4877dbf98c0375a7a93436e69ddff15a.jpg" alt="" />
          </a>
        </div>
        <div className={cx("gallery-item")}>
          <a href="">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/06/30/4877dbf98c0375a7a93436e69ddff15a.jpg" alt="" />
          </a>
        </div>
        <div className={cx("gallery-item")}>
          <a href="">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/06/30/4877dbf98c0375a7a93436e69ddff15a.jpg" alt="" />
          </a>
        </div>
        <div className={cx("gallery-item")}>
          <a href="">
            <img src="https://pubcdn.ivymoda.com/files/news/2023/06/30/4877dbf98c0375a7a93436e69ddff15a.jpg" alt="" />
          </a>
        </div>
      </div>
    </section>
  );
};
export default MainGallery;