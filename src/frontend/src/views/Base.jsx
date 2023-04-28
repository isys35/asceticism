import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { logout } from "../auth/auth.js";
import { Menubar } from "primereact/menubar";
import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";

function Base() {
  const toast = useRef(null);
  const menu = [
    {
      label: "Выход",
      icon: "pi pi-fw pi-power-off",
      command: (event) => {
        confirmPopup({
          target: event.originalEvent.currentTarget,
          message: "Вы действительно хотите выйти?", 
          acceptLabel: "Да",
          rejectLabel: "Отмена",
          icon: "pi pi-exclamation-triangle",
          accept: logout,
        });
      }
    }
  ];
  const [profileMenu, showProfileMenu] = useState(false);

  return (
    <div className="content-wrapper">
      <div className="topbar">
        <div className="topbar-start">
        </div>
        <div className="topbar-end">
          <ul className="topbar-menu">
            <li className="topbar-profile">
              <button className="p-link" onClick={() => showProfileMenu(true)}>
                <Avatar icon="pi pi-user" size="large" shape="circle" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Menubar model={menu} />
      <Toast ref={toast} />
      <ConfirmPopup />
      <Outlet context={toast} />
      <Sidebar visible={profileMenu} position="right" onHide={() => showProfileMenu(false)}>
        <h4>Right Sidebar</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
    </div>
  );
}

export default Base;