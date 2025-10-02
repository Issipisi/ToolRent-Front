import api from "../http-common";

const getAll = () => api.get("/tools");

const register = (name, category, replacementValue, pricePerDay, stock) =>
  api.post("/tools", null, {
    params: { name, category, replacementValue, pricePerDay, stock },
  });

const getAvailable = () => api.get("/tools/available");

const updateTariff = (toolGroupId, dailyRentalRate, dailyFineRate) =>
  api.put(`/tools/${toolGroupId}/tariff`, null, {
    params: { dailyRentalRate, dailyFineRate },
  });

export default { getAll, register, updateTariff, getAvailable };
