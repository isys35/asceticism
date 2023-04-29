import {Card} from "primereact/card";
import PropTypes from "prop-types";
import { ProgressBar } from "primereact/progressbar";

function AscesaCard({ ascesa }) {
  const valueTemplate = () => {

    return (
      <>
        {ascesa.progress}/<b>{ascesa.days}</b>
      </>
    );
  };
  return (
    <Card title={ascesa.name}>
      <ProgressBar value={(ascesa.progress/ascesa.days)*100} displayValueTemplate={valueTemplate}></ProgressBar>
    </Card>
  );
}

AscesaCard.propTypes = {
  ascesa: PropTypes.object
};

export default AscesaCard;