import { API } from "./base.js";

export const ascesAPI = {
  list: () => API.get("/asces"),
  create: values => {
    let data = { ...values };
    data.started_at = data.started_at.getTime();
    return API.post("/asces", data);
  },
  complete: ascesa_id => {
    return API.post(`/asces/${ascesa_id}/complete`);
  },
  delete: ascesa_id => {
    return API.delete(`/asces/${ascesa_id}`);
  },
  complete_all: () => API.post("/asces/complete"),
  reset: ascesa_id => {
    return API.post(`/asces/${ascesa_id}/reset`);
  },
};
