import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";
import { memo, useEffect, useRef, useState } from "react";
import { toLocaleDate } from "../../utils/toLocaleDate.js";
import { Button } from "primereact/button";
import { ascesAPI } from "../../api/api.js";
import { Menu } from "primereact/menu";
import { confirmDialog } from "primereact/confirmdialog";
import { useToast } from "../../views/Base.jsx";
import { canCompleteAscesa } from "../../utils/canCompleteAscesa.js";

function AscesaCard({ ascesa, deleteAscesa, completeAscesa }) {
  const { toast } = useToast();
  const startedAt = toLocaleDate(new Date(ascesa.started_at));
  const endedAt = toLocaleDate(new Date(ascesa.ended_at));
  const [completeButtonTitle, setCompleteButtonTitle] = useState("");
  const [completeButtonDisabled, setCompleteButtonDisabled] = useState(false);
  const menu = useRef(null);

  const complete = () => {
    ascesAPI
      .complete(ascesa.id)
      .then(response => completeAscesa(response.data));
  };

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
  ];

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      {canCompleteAscesa(ascesa.started_at) && (
        <Button
          label={completeButtonTitle}
          icon="pi pi-check"
          disabled={completeButtonDisabled}
          onClick={complete}
        />
      )}
    </div>
  );

  const title = (
    <div className="flex justify-content-between align-items-center">
      <div>{ascesa.name}</div>
      <Button
        icon="pi pi-ellipsis-h"
        rounded
        text
        severity="secondary"
        onClick={e => menu.current.toggle(e)}
      />
      <Menu
        model={menuItems}
        popup
        ref={menu}
      />
    </div>
  );

  useEffect(() => {
    if (ascesa.completed_active_day) {
      setCompleteButtonTitle("");
      setCompleteButtonDisabled(true);
    } else {
      setCompleteButtonTitle("Выполнить");
      setCompleteButtonDisabled(false);
    }
  }, [ascesa.completed_active_day]);

  return (
    <div className="col-12 md:col-6">
      <Card
        title={title}
        footer={footer}>
        <ProgressBar
          className="mb-5"
          value={Math.floor((ascesa.progress / ascesa.days) * 100)}
        />
        <p className="flex justify-content-between align-items-center">
          <span className="font-bold text-xl">
            {ascesa.progress}/{ascesa.days}
          </span>
          <span className="font-light text-sm">
            С {startedAt} по {endedAt}
          </span>
        </p>
      </Card>
    </div>
  );
}

export const PureAscesaCard = memo(AscesaCard);

AscesaCard.propTypes = {
  ascesa: PropTypes.object,
  deleteAscesa: PropTypes.func,
  completeAscesa: PropTypes.func,
};

export default AscesaCard;
