import api from "../http-common"; //

const getAll = () => {
  return api.get('/customers');
};

const register = (name, rut, phone, email) => {
  return api.post('/customers', null, {
    params: { name, rut, phone, email }
  });
};

const changeStatus = (id, newStatus) => {
  return api.put(`/customers/${id}/status`, null, {
    params: { newStatus }
  });
};

export default { getAll, register, changeStatus };