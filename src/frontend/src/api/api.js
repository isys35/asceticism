import { API } from "./base.js";

export const ascesAPI = {
  list: () => API.get("/asces"),
  create: values => {
    let data = { ...values };
    data.started_at = data.started_at.getTime();
    return API.post("/asces", data);
  },
};
