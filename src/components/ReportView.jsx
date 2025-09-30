import { useState } from "react";
import reportService from "../services/report.service";
import {
  Button,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const ReportView = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  /* ---------- FECHOS (solo para activos y top-tools) ---------- */
  const [from, setFrom] = useState(dayjs().subtract(1, 'month'));
  const [to, setTo] = useState(dayjs());

  /* ---------- LLAMADAS ---------- */
  const loadActive = async () => {
    const res = await reportService.activeLoans(
      from.format('YYYY-MM-DD'),
      to.format('YYYY-MM-DD')
    );
    setData(res.data);
    setTitle("Active Loans");
  };

  const loadOverdue = async () => {
    const res = await reportService.overdueCustomers();
    setData(res.data);
    setTitle("Customers with Overdue Loans");
  };

  const loadTop = async () => {
    const res = await reportService.topTools(
      from.format('YYYY-MM-DD'),
      to.format('YYYY-MM-DD')
    );
    setData(res.data);
    setTitle("Most Loaned Tools");
  };

  /* ---------- RENDER ---------- */
  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>
        Reports
      </Typography>

      {/* Selector de fechas (solo para activos y top-tools) */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <DatePicker
            label="From"
            value={from}
            onChange={(newVal) => setFrom(newVal ?? dayjs())}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="To"
            value={to}
            onChange={(newVal) => setTo(newVal ?? dayjs())}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={loadActive}>Préstamos Activos</Button>
        <Button variant="outlined" onClick={loadOverdue}>Clientes con Deudas</Button>
        <Button variant="outlined" onClick={loadTop}>Top Herramientas</Button>
      </Stack>

      {data.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#f5f0ff" }}>
                <TableRow>
                  {title === "Active Loans" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Customer</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Tool</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Loan Date</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Due Date</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Status</TableCell>
                    </>
                  )}
                  {title === "Customers with Overdue Loans" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Name</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>RUT</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Email</TableCell>
                    </>
                  )}
                  {title === "Most Loaned Tools" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>Tool</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Times Loaned</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={idx} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                    {title === "Active Loans" && (
                      <>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.customer?.name ?? ''}</TableCell>
                        <TableCell>{row.toolUnit?.toolGroup?.name ?? ''}</TableCell>
                        <TableCell>{row.loanDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.status ?? 'ACTIVE'}</TableCell>
                      </>
                    )}
                    {title === "Customers with Overdue Loans" && (
                      <>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.rut}</TableCell>
                        <TableCell>{row.email}</TableCell>
                      </>
                    )}
                    {title === "Most Loaned Tools" && (
                      <>
                        <TableCell>{row.toolGroupName}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Paper>
  );
};

export default ReportView;