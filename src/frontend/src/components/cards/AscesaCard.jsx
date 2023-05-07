import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";
import { memo } from "react";

function AscesaCard({ ascesa }) {
  const valueTemplate = () => {
    return (
      <>
        {ascesa.progress}/<b>{ascesa.days}</b>
      </>
    );
  };
  return (
    <div className="col-12 md:col-6">
      <Card title={ascesa.name}>
        <ProgressBar
          value={(ascesa.progress / ascesa.days) * 100}
          displayValueTemplate={valueTemplate}
        />
      </Card>
    </div>
  );
}

export const PureAscesaCard = memo(AscesaCard);

AscesaCard.propTypes = {
  ascesa: PropTypes.object,
};

export default AscesaCard;
