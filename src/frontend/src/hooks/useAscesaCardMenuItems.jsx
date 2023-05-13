import { ascesAPI } from "../api/api.js";
import { useToast } from "../views/Base.jsx";
import { confirmDialog } from "primereact/confirmdialog";

export function useAscesaCardMenuItems(ascesa, deleteAscesa, changeAscesa) {
  const { toast } = useToast();
  const deleteQuery = () => {
    ascesAPI.delete(ascesa.id).then(() => {
      deleteAscesa(ascesa.id);
      toast.current.show({
        severity: "success",
        summary: "Успешно",
        detail: "Аскеза успешно удалена",
        life: 3000,
      });
    });
  };

  const resetQuery = () => {
    ascesAPI.reset(ascesa.id).then(response => {
      changeAscesa(response.data);
      toast.current.show({
        severity: "success",
        summary: "Успешно",
        detail: "Аскеза успешно отменена",
        life: 3000,
      });
    });
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Вы действительно хотите удалить аскезу",
      header: "Удаление",
      acceptLabel: "Да",
      rejectLabel: "Отмена",
      icon: "pi pi-exclamation-triangle",
      accept: deleteQuery,
    });
  };

  const menuItems = [
    { label: "Удалить", icon: "pi pi-fw pi-trash", command: confirmDelete },
    {
      label: "Отмена",
      icon: "pi pi-fw pi-refresh",
      command: resetQuery,
      disabled: !ascesa.completed_active_day,
    },
  ];

  return menuItems;
}
