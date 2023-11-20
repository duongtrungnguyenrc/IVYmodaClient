import classNames from "classnames/bind";
import styles from "./MainGallery.module.scss";
import { useEffect, useState } from "react";
import ProductImage from "../../models/ProductImage";
import instance from "../../services/CustomAxios";

const cx = classNames.bind(styles);

const MainGallery = () => {
  const [ gallery, setGallery ] = useState<ProductImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await instance.get("gallery/images");
      if(response.status === 200) {
        setGallery(response.data.data);
      }
    }
    fetchImages();
  }, []);

  return (
    <section className={cx("main-gallery")}>
      <div className={cx("gallery-header")}>
        GALLERY
      </div>
      <div className={cx("gallery-body")}>
        {
          gallery?.map((item) => {
            return <div className={cx("gallery-item")}>
                    <a href="">
                      <img src={ item.src } alt={ item.name } />
                    </a>
                  </div>
          })
        }
      </div>
    </section>
  );
};
export default MainGallery;