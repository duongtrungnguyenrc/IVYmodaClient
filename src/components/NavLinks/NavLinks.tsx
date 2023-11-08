import classNames from "classnames/bind";
import styles from "./NavLinks.module.scss";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

function NavLinks() {
    const params = useSearchParams();
    const links : String[] = [];
    params[0].forEach((value) => {
        links.push(value)
    })
    
    return ( 
        <div className={cx("nav-links")}>
            <ul>
                <li><a title="Trang chủ" href="">Trang chủ</a></li>
                {
                    links.map((nav) => {
                        return <li key={nav.toString()}><a title="Áo" href="">{nav.toString()}</a></li>

                    })
                }
            </ul>
        </div>
     );
}

export default NavLinks;