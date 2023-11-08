import { useRef, useState, useCallback, memo } from "react";
import classNames from "classnames/bind";

import styles from "./ProductGallery.module.scss";
import { ChevronDownIcon, ChevronUpIcon } from "../../assets/Icons";
import ProductImage from "../../models/ProductImage";

const cx = classNames.bind(styles);

interface coordinatesModel {
  x: number;
  y: number;
}

function ProductGallery( { images } : { images : ProductImage[] } ) {
    const [ isHover, setIsHover ] = useState(false);
    const [mouseCoordinates, setMouseCoordinates] = useState<coordinatesModel>({
        x: 0,
        y: 0,
    });

    const galleryFrameRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        galleryFrameRef.current && setMouseCoordinates({
            x: event.clientX - galleryFrameRef.current.offsetLeft,
            y: event.clientY - galleryFrameRef.current.offsetTop,
        });
        setIsHover(true);
    }, []);  

    const style = {
        backgroundImage: `url(${images[0].src})`,
        transform : isHover ? "scale(2)" : "scale(1)", 
        transformOrigin: galleryFrameRef.current ? `${mouseCoordinates.x / galleryFrameRef.current.clientWidth * 100}% ${mouseCoordinates.y / galleryFrameRef.current.clientHeight * 100}%` : undefined
    };

    return (
        <div className={cx("product-gallery")}>
            <div ref={galleryFrameRef} className={cx("main-gallery-frame")} onMouseMove={handleMouseMove} onMouseLeave={() => setIsHover(false)}>
                <div className={cx("main-gallery-image")} style={style}/>
            </div>
            <div className={cx("side-gallery-frame")}>
                <button>
                    <ChevronUpIcon/>
                </button>
                <div className={cx("slider-gallery")}>
                    {
                        images.map((image) => {
                            return  <div key={image.id} className={cx("slider-gallery-item")}>
                                        <img src={image.src} alt={image.name} />
                                    </div>
                        })
                    }
                </div>
                <button>
                    <ChevronDownIcon/>
                </button>
            </div>
        </div>
    );
}

export default memo(ProductGallery);