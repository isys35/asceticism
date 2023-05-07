import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";
import { memo, useEffect, useState } from "react";
import { toLocaleDate } from "../../utils/toLocaleDate.js";
import { Button } from "primereact/button";
import { ascesAPI } from "../../api/api.js";

function AscesaCard({ ascesa }) {
  const [ascesaItem, setAscesaItem] = useState(ascesa);
  const startedAt = toLocaleDate(new Date(ascesaItem.started_at));
  const endedAt = toLocaleDate(new Date(ascesaItem.ended_at));
  const [completeButtonTitle, setCompleteButtonTitle] = useState("");
  const [completeButtonDisabled, setCompleteButtonDisabled] = useState(false);

  const complete = () => {
    ascesAPI.complete(ascesa.id).then(response => setAscesaItem(response.data));
  };

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label={completeButtonTitle}
        icon="pi pi-check"
        disabled={completeButtonDisabled}
        onClick={complete}
      />
    </div>
  );

  useEffect(() => {
    if (ascesaItem.completed_today) {
      setCompleteButtonTitle("");
      setCompleteButtonDisabled(true);
    } else {
      setCompleteButtonTitle("Выполнить");
      setCompleteButtonDisabled(false);
    }
  }, [ascesaItem.completed_today]);

  return (
    <div className="col-12 md:col-6">
      <Card
        title={ascesaItem.name}
        footer={footer}>
        <ProgressBar
          className="mb-5"
          value={Math.floor((ascesaItem.progress / ascesaItem.days) * 100)}
        />
        <p className="flex justify-content-between align-items-center">
          <span className="font-bold text-xl">
            {ascesaItem.progress}/{ascesaItem.days}
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
};

export default AscesaCard;
