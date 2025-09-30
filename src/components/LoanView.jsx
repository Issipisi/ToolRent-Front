import { useEffect, useState } from "react";
import loanService from "../services/loan.service";
import customerService from "../services/customer.service";
import toolGroupService from "../services/toolGroup.service";
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography,
  MenuItem, Stack
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const LoanView = () => {
  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);

  /* ---- nuevos estados ---- */
  const [customers, setCustomers] = useState([]);        // lista clientes
  const [tools, setTools] = useState([]);                // lista herramientas
  const [form, setForm] = useState({
    customerId: "",
    toolGroupId: "",
    dueDate: dayjs(), // dayjs object
  });

  /* ---- carga inicial ---- */
  const loadLoans = async () => {
    const res = await loanService.getActive();
    setLoans(res.data);
  };

  const loadCustomers = async () => {
    const res = await customerService.getActive();
    setCustomers(res.data);
  };

  const loadTools = async () => {
    const res = await toolGroupService.getAvailable();
    setTools(res.data);
  };

  useEffect(() => {
    loadLoans();
    loadCustomers();
    loadTools();
  }, []);

  /* ---- handlers ---- */
  const handleRegister = async () => {
    await loanService.register(
      form.toolGroupId,
      form.customerId,
      form.dueDate.toISOString() 
    );
    setOpen(false);
    setForm({ customerId: "", toolGroupId: "", dueDate: dayjs() });
    loadLoans();
  };

  const handleReturn = async (loanId) => {
    await loanService.returnLoan(loanId);
    loadLoans();
  };

  /* ---- render ---- */
  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>Active Loans</Typography>

      <Button
        variant="contained"
        sx={{ mb: 3, background: "#6c63ff", ":hover": { background: "#c77dff" } }}
        onClick={() => setOpen(true)}
      >
        Registrar Préstamo
      </Button>

      {/*  tabla igual que antes  */}
      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f0ff" }}>
            <TableRow>
              <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Cliente</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Herramienta</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Fecha préstamo</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Fecha Entrega</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Estado</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((l) => (
              <TableRow key={l.id} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                <TableCell>{l.id}</TableCell>
                <TableCell>{l.customerName}</TableCell>
                <TableCell>{l.toolName}</TableCell>
                <TableCell>{l.loanDate}</TableCell>
                <TableCell>{l.dueDate}</TableCell>
                <TableCell>{l.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd" }}
                    onClick={() => handleReturn(l.id)}
                  >
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    {/* -------- Modal con selectores -------- */}
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ style: { minHeight: 560 } }}>
    <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>New Loan</DialogTitle>
    <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        {/* Selector Cliente */}
        <TextField
        select
        label="Customer"
        value={form.customerId}
        onChange={(e) => setForm({ ...form, customerId: e.target.value })}
        >
        {customers.map((c) => (
            <MenuItem key={c.id} value={c.id}>
            {c.name} ‑ {c.rut}
            </MenuItem>
        ))}
        </TextField>

        {/* Selector Herramienta */}
        <TextField
        select
        label="Tool Group"
        value={form.toolGroupId}
        onChange={(e) => setForm({ ...form, toolGroupId: e.target.value })}
        >
        {tools.map((t) => (
            <MenuItem key={t.id} value={t.id}>
            {t.name} ({t.category}) ‑ stock: {t.units.length}
            </MenuItem>
        ))}
        </TextField>

        {/* DateTime Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
            label="Due Date & Time"
            value={form.dueDate}
            onChange={(newVal) => setForm({ ...form, dueDate: newVal })}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    </DialogContent>

    <DialogActions>
        <Button onClick={() => setOpen(false)} sx={{ color: "#4a4a68" }}>Cancel</Button>
        <Button onClick={handleRegister} variant="contained" sx={{ background: "#6c63ff", ":hover": { background: "#c77dff" } }}>
        Save
        </Button>
    </DialogActions>
    </Dialog>
    </Paper>
  );
};

export default LoanView;