import api from "../http-common";

const getAll = () => api.get("/tools");

const register = (name, category, replacementValue, pricePerDay, stock) =>
  api.post("/tools", null, {
    params: { name, category, replacementValue, pricePerDay, stock },
  });

const getAvailable = () => api.get("/tools/available");

export default { getAll, register, getAvailable }; 

