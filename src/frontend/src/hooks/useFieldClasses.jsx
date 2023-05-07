import classNames from "classnames";

export function useFieldClasses(fields, checkField = f => f) {
  let fieldClasses = {};

  fields.forEach(field => {
    fieldClasses[field] = classNames("w-full", {
      "p-invalid": checkField(field),
    });
  });

  return fieldClasses;
}
