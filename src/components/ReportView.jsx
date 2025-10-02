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
    setTitle("Préstamos Activos");
  };

  const loadOverdue = async () => {
    const res = await reportService.overdueCustomers();
    setData(res.data);
    setTitle("Clientes con deudas");
  };

  const loadTop = async () => {
    const res = await reportService.topTools(
      from.format('YYYY-MM-DD'),
      to.format('YYYY-MM-DD')
    );
    setData(res.data);
    setTitle("Herramientas más solicitadas");
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
            label="Desde"
            value={from}
            onChange={(newVal) => setFrom(newVal ?? dayjs())}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Hasta"
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
                  {title === "Préstamos Activos" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Cliente</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Herramienta</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Fecha Préstamo</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Fecha Devolución</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Estado</TableCell>
                    </>
                  )}
                  {title === "Clientes con deudas" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Nombre</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>RUT</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>Email</TableCell>
                    </>
                  )}
                  {title === "Herramientas más solicitadas" && (
                    <>
                      <TableCell sx={{ color: "#2e2e4e" }}>Herramienta</TableCell>
                      <TableCell sx={{ color: "#2e2e4e" }}>N° solicitudes</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow key={idx} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                    {title === "Préstamos Activos" && (
                      <>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.customer?.name ?? ''}</TableCell>
                        <TableCell>{row.toolUnit?.toolGroup?.name ?? ''}</TableCell>
                        <TableCell>{row.loanDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.status ?? 'ACTIVE'}</TableCell>
                      </>
                    )}
                    {title === "Clientes con deudas" && (
                      <>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.rut}</TableCell>
                        <TableCell>{row.email}</TableCell>
                      </>
                    )}
                    {title === "Herramientas más solicitadas" && (
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