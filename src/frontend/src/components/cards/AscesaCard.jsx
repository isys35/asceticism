import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";
import { memo } from "react";
import { toLocaleDate } from "../../utils/toLocaleDate.js";
import { Button } from "primereact/button";

function AscesaCard({ ascesa }) {
  const startedAt = toLocaleDate(new Date(ascesa.started_at));
  const endedAt = toLocaleDate(new Date(ascesa.ended_at));
  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Выполнено"
        icon="pi pi-check"
      />
    </div>
  );
  return (
    <div className="col-12 md:col-6">
      <Card
        title={ascesa.name}
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
};

export default AscesaCard;
