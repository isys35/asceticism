import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";
import { memo, useEffect, useRef, useState } from "react";
import { toLocaleDate } from "../../utils/toLocaleDate.js";
import { Button } from "primereact/button";
import { ascesAPI } from "../../api/api.js";
import { Menu } from "primereact/menu";

import { canCompleteAscesa } from "../../utils/canCompleteAscesa.js";
import { useAscesaCardMenuItems } from "../../hooks/useAscesaCardMenuItems.jsx";

function AscesaCard({ ascesa, deleteAscesa, changeAscesa }) {
  const startedAt = toLocaleDate(new Date(ascesa.started_at));
  const endedAt = toLocaleDate(new Date(ascesa.ended_at));
  const [completeButtonTitle, setCompleteButtonTitle] = useState("");
  const [completeButtonDisabled, setCompleteButtonDisabled] = useState(false);
  const menu = useRef(null);
  const menuItems = useAscesaCardMenuItems(ascesa, deleteAscesa, changeAscesa);

  const complete = () => {
    ascesAPI.complete(ascesa.id).then(response => changeAscesa(response.data));
  };

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
  changeAscesa: PropTypes.func,
};

export default AscesaCard;
