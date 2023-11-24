import { ReactNode } from "react";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";

const AdminLayout = ({ children } : { children : ReactNode }) => {
  return (
    <main className="d-flex">
        <SideBar menu={sidebar_menu} />
        <div className="dashboard-body d-flex flex-column">
            { children }
        </div>
    </main>
  );
};
export default AdminLayout;