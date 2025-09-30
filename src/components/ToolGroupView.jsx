import { useEffect, useState } from "react";
import toolGroupService from "../services/toolGroup.service";
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from "@mui/material";

const ToolGroupView = () => {
  const [groups, setGroups] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    replacementValue: "",
    pricePerDay: "",
    stock: "",
  });

  const loadGroups = async () => {
    const res = await toolGroupService.getAll();
    setGroups(res.data);
  };

  const handleRegister = async () => {
    await toolGroupService.register(
      form.name,
      form.category,
      form.replacementValue,
      form.pricePerDay,
      form.stock
    );
    setOpen(false);
    setForm({ name: "", category: "", replacementValue: "", pricePerDay: "", stock: "" });
    loadGroups();
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>
        Tool Groups
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3, background: "#6c63ff", ":hover": { background: "#c77dff" } }}
        onClick={() => setOpen(true)}
      >
        Registrar Herramienta
      </Button>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f0ff" }}>
            <TableRow>
              <TableCell sx={{ color: "#2e2e4e" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Categoría</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Valor de Reemplazo</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Valor renta diario</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((g) => (
              <TableRow key={g.id} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                <TableCell>{g.name}</TableCell>
                <TableCell>{g.category}</TableCell>
                <TableCell>{g.replacementValue}</TableCell>
                <TableCell>{g.tariff.dailyRentalRate}</TableCell>
                <TableCell>{g.units.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal registro */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>Nuevo Grupo de Herramientas</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <TextField label="Replacement Value" type="number" value={form.replacementValue} onChange={(e) => setForm({ ...form, replacementValue: e.target.value })} />
          <TextField label="Daily Rate" type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} />
          <TextField label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
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

export default ToolGroupView;