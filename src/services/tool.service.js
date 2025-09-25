import api from "../http-common";
const base = "/tools";


const getAll = () => {
  return api.get(base);
};


const register = (name, category, replacementValue, pricePerDay, stock) => {
  return api.post(base, null, {
    params: { name, category, replacementValue, pricePerDay, stock }
  });
};


const changeStatus = (id, newStatus) => {
  return api.put(`${base}/${id}/status`, null, {
    params: { newStatus }
  });
};

/* ---------- DAR DE BAJA ---------- */
const deactivate = (id) => {
  return api.put(`${base}/${id}/desactivate`);
};

/* ---------- AJUSTAR STOCK ---------- */
const updateStock = (id, newStock) => {
  return api.patch(`${base}/${id}/stock`, null, {
    params: { newStock }
  });
};

/* ---------- ACTUALIZAR VALOR DE REPOSICIÓN ---------- */
const updateReplacementValue = (id, value) => {
  return api.patch(`${base}/${id}/replacement-value`, null, {
    params: { value }
  });
};

export default {
  getAll,
  register,
  changeStatus,
  deactivate,
  updateStock,
  updateReplacementValue
};