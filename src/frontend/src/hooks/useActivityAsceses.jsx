import { canCompleteAscesa } from "../utils/canCompleteAscesa.js";
import { useEffect, useState } from "react";

export function useActivityAsceses(ascesData) {
  const [hasActiveAsceses, setHasActiveAsceses] = useState(false);
  const checkActiveAsceses = () => {
    return !!ascesData.filter(
      ascesa =>
        !ascesa.completed_active_day &&
        canCompleteAscesa(new Date(ascesa.started_at)),
    ).length;
  };

  useEffect(() => {
    setHasActiveAsceses(checkActiveAsceses());
  }, [ascesData]);
  return hasActiveAsceses;
}
