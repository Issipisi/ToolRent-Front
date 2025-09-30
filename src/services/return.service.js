import api from "../http-common";

/* Lista préstamos ACTIVOS (sin devolver) */
const getActive = () => api.get("/loans/active");

/* Devolver préstamo → backend calcula multa y devuelve DTO */
const returnLoan = (loanId) => api.put(`/loans/${loanId}/return`);

export default { getActive, returnLoan };