
import "./styles.scss";

function DashboardHeader () {

    return(
        <div className="dashbord-header-container">
            <div></div>
            <div className="dashbord-header-right dropdown" >
                <button data-bs-toggle="dropdown">
                <img
                    className="dashbord-header-avatar"
                    src="https://avatars.githubusercontent.com/u/111481047?v=4" />
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/login" onClick={() => localStorage.removeItem("token")}>Đăng xuất</a></li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardHeader;