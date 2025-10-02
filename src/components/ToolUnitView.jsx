import { useEffect, useState } from "react";
import toolUnitService from "../services/toolUnit.service";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const ToolUnitView = () => {
  const [units, setUnits] = useState([]);
  const [openRepair, setOpenRepair] = useState(false);
  const [openRetire, setOpenRetire] = useState(false);
  const [openResolve, setOpenResolve] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const loadUnits = async () => {
    const res = await toolUnitService.getAllWithDetails();
    setUnits(res.data);
  };

  const handleSendToRepair = async () => {
    if (!selectedUnit) return;
    await toolUnitService.changeStatus(selectedUnit.id, "EN_REPARACION");
    setOpenRepair(false);
    loadUnits();
  };

  const handleRetire = async () => {
    if (!selectedUnit) return;
    await toolUnitService.changeStatus(selectedUnit.id, "DADA_DE_BAJA");
    setOpenRetire(false);
    loadUnits();
  };

  const handleResolveAvailable = async () => {
  if (!selectedUnit) return;
  await toolUnitService.resolveRepair(selectedUnit.id, false); // false = disponible
  setOpenResolve(false);
  loadUnits();
};

const handleResolveRetire = async () => {
  if (!selectedUnit) return;
  await toolUnitService.resolveRepair(selectedUnit.id, true); // true = retirar
  setOpenResolve(false);
  loadUnits();
};

  useEffect(() => { loadUnits(); }, []);

  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>Tool Units</Typography>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f0ff" }}>
            <TableRow>
              <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Herramienta</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Estado</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((u) => (
              <TableRow key={u.id} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.toolGroup?.name || "—"}</TableCell>
                <TableCell>{u.status}</TableCell>
                <TableCell>
                <Stack direction="row" spacing={1}>
                    {u.status === "IN_REPAIR" && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => { setSelectedUnit(u); setOpenResolve(true); }}
                    >
                        Resolver reparación
                    </Button>
                    )}

                    {u.status === "AVAILABLE" && (
                    <>
                        <Button
                        size="small"
                        variant="outlined"
                        onClick={() => { setSelectedUnit(u); setOpenRepair(true); }}
                        >
                        A Reparación
                        </Button>
                        <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => { setSelectedUnit(u); setOpenRetire(true); }}
                        >
                        Retirar
                        </Button>
                    </>
                    )}
                </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Reparación */}
      <Dialog open={openRepair} onClose={() => setOpenRepair(false)} maxWidth="xs">
        <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>A Reparación</DialogTitle>
        <DialogContent>
          <Typography>Unit ID: {selectedUnit?.id}</Typography>
          <Typography>Herramienta: {selectedUnit?.toolGroup?.name}</Typography>
          <Typography>El estado cambiará a "EN_REPARACIÓN". Continuar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRepair(false)}>Cancel</Button>
          <Button onClick={handleSendToRepair} variant="contained" color="warning">Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Retiro */}
      <Dialog open={openRetire} onClose={() => setOpenRetire(false)} maxWidth="xs">
        <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>Retirar</DialogTitle>
        <DialogContent>
          <Typography>Unit ID: {selectedUnit?.id}</Typography>
          <Typography>Herramienta: {selectedUnit?.toolGroup?.name || "Sin nombre"}</Typography>
          <Typography>La Herramienta será "DADA_DE_BAJA". Continuar?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRetire(false)}>Cancel</Button>
          <Button onClick={handleRetire} variant="contained" color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
      
      {/* ---------- Resolver reparación ---------- */}
      <Dialog open={openResolve} onClose={() => setOpenResolve(false)} maxWidth="xs">
      <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>
          Resolver reparación
      </DialogTitle>
      <DialogContent>
          <Typography>Unit ID: {selectedUnit?.id}</Typography>
          <Typography>Herramienta: {selectedUnit?.toolGroup?.name}</Typography>
          <Typography sx={{ mt: 2 }}>¿Qué deseas hacer?</Typography>
      </DialogContent>
      <DialogActions>
          <Button onClick={() => setOpenResolve(false)}>Cancelar</Button>
          <Button onClick={handleResolveAvailable} variant="contained" color="success">
          Marcar como disponible
          </Button>
          <Button onClick={handleResolveRetire} variant="contained" color="error">
          Dar de baja definitiva
          </Button>
      </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ToolUnitView;