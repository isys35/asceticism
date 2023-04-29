import { logout } from "../auth/auth.js";
import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import ProfileMenuButton from "../components/buttons/ProfileMenuButton.jsx";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function Base() {
  const toast = useRef(null);
  const confirmLogout = () => {
    confirmDialog({
      message: "Вы действительно хотите выйти?",
      header: "Выход",
      acceptLabel: "Да",
      rejectLabel: "Отмена",
      icon: "pi pi-exclamation-triangle",
      accept: logout,
    });
  };
  const [profileMenu, showProfileMenu] = useState(false);
  const email = localStorage.getItem("email");
  const firstName = JSON.parse(localStorage.getItem("first_name"));
  const lastName = JSON.parse(localStorage.getItem("last_name"));

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
      <Toast ref={toast} />
      <ConfirmDialog />
      <Sidebar visible={profileMenu} position="right" onHide={() => showProfileMenu(false)}>
        <div className="flex flex-column mx-auto md:mx-0"><span className="mb-2 font-semibold">{email}</span><span
          className="text-color-secondary font-medium mb-5">{firstName} {lastName}</span>
        <ul className="list-none m-0 p-0">
          <ProfileMenuButton
            icon="pi-power-off" 
            mainText="Выход"
            secondaryText="Выйти из профиля"
            onClick={confirmLogout}
          />
        </ul>
        </div>
      </Sidebar>
      <Outlet context={toast} />
    </div>
  );
}

export default Base;