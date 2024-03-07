import React from "react";
import menu from "./sidebar/menu";
import SidebarNavList from "./sidebar/SidebarNavList";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <div className="brand-link text-center">
        <span className="brand-text font-weight-light text-center">ADMIN</span>
      </div>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
          >
            {menu.map((menu, index) => (
              <SidebarNavList data={menu} key={index} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
