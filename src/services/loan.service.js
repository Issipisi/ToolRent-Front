import dayjs from "dayjs";
import api from "../http-common";

const getActive = () => {
  const from = dayjs().subtract(1, 'month').toISOString();
  const to   = dayjs().add(1, 'month').toISOString();
  return api.get("/loans/active", {
    params: { from, to }
  });
};

const register = (toolGroupId, customerId, dueDate) =>
  api.post("/loans", null, {
    params: { toolGroupId, customerId, dueDate },
  });

const returnLoan = (loanId) =>
  api.put(`/loans/${loanId}/return`);

export default { getActive, register, returnLoan};