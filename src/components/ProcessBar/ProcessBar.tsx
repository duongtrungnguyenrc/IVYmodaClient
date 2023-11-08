import classNames from "classnames/bind";
import styles from "./ProcessBar.module.scss";

const cx = classNames.bind(styles);

const ProcessBar = ({ currentProcess } : { currentProcess : number }) => {
    const process = [ "Giỏ hàng", "Đặt hàng", "Thanh toán", "Hoàn thành" ]
    return (
        <>
            <div className={cx("process-bar")}>
                <ul>
                   {
                    process?.map((value, index) => {
                        return  <li key={value} className={cx({"active" : index <= currentProcess - 1})}>
                                    <span>{ value }</span>
                                </li>
                    })
                   }
                </ul>
            </div>
        </>
    );
};
export default ProcessBar;