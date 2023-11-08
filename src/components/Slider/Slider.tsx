import { memo } from "react";
import "./Slider.scss";

function Slider() {
    return ( 
        <section id="slider" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#slider" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#slider" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#slider" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#slider" data-bs-slide-to="3"></button>
                <button type="button" data-bs-target="#slider" data-bs-slide-to="4"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/06/21/b26a105dd5321c8217a25d7be8496de8.jpg" alt="" className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/06/19/8b562d1f47975facd6a3322fcd4b521f.jpg" alt="" className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/06/17/8ced3372ae399a334a671ad45cae31dd.jpg" alt="" className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/06/09/ec4226bcf950ded7eec7a08119b21ced.jpg" alt="" className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src="https://pubcdn.ivymoda.com/files/news/2023/05/29/56aa2a96b2157626e3816c98ef97ae8c.jpg" alt="" className="d-block w-100"/>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </section>
     );
}

export default memo(Slider);