import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { logout } from "../auth/auth.js";
import { Menubar } from "primereact/menubar";
import { Outlet } from "react-router-dom";

function Base() {
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
  return (
    <>
      <Menubar model={menu} />
      <ConfirmPopup />
      <Outlet />
    </>
  );
}

export default Base;