import { useEffect, useState } from "react";
import toolService from "../services/tool.service";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const ToolView = () => {
  const [tools, setTools] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    replacementValue: "",
    pricePerDay: "",
    stock: "",
  });

  const loadTools = async () => {
    const data = await toolService.getAll();
    setTools(data.data);
  };

  const handleRegister = async () => {
    await toolService.register(
      form.name,
      form.category,
      Number(form.replacementValue),
      Number(form.pricePerDay),
      Number(form.stock)
    );
    setOpen(false);
    setForm({ name: "", category: "", replacementValue: "", pricePerDay: "", stock: "" });
    loadTools();
  };

  const handleChangeStatus = async (id, newStatus) => {
    await toolService.changeStatus(id, newStatus);
    loadTools();
  };

  const handleDeactivate = async (id) => {
    await toolService.deactivate(id);
    loadTools();
  };

  const handleUpdateStock = async (id, newStock) => {
    await toolService.updateStock(id, newStock);
    loadTools();
  };

  const handleUpdateReplacementValue = async (id, value) => {
  await toolService.updateReplacementValue(id, value);
  loadTools();
  };

  useEffect(() => {
    loadTools();
  }, []);

  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>
        Herramientas
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
              <TableCell sx={{ color: "#2e2e4e" }}>Stock</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Estado</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools.map((t) => (
              <TableRow key={t.id} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell>{t.stock}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd", mr: 1 }}
                    onClick={() => handleChangeStatus(t.id, t.status === "AVAILABLE" ? "LOANED" : "AVAILABLE")}
                  >
                    {t.status === "AVAILABLE" ? "Prestar" : "Disponible"}
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd", mr: 1 }}
                    onClick={() => handleDeactivate(t.id)}
                  >
                    Dar de baja
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd" }}
                    onClick={() => handleUpdateStock(t.id, t.stock + 1)}
                  >
                    +1 Stock
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd", mr: 1 }}
                    onClick={() => handleUpdateReplacementValue(t.id, t.replacementValue + 1000)}
                  >
                    +1k Rep.
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal registro */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>Nueva Herramienta</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <TextField label="Valor de reposición" type="number" value={form.replacementValue} onChange={(e) => setForm({ ...form, replacementValue: e.target.value })} />
          <TextField label="Precio por día" type="number" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} />
          <TextField label="Stock inicial" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "#4a4a68" }}>Cancelar</Button>
          <Button onClick={handleRegister} variant="contained" sx={{ background: "#6c63ff", ":hover": { background: "#c77dff" } }}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ToolView;