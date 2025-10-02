import { useEffect, useState } from "react";
import tariffService from "../services/tariff.service";
import toolGroupService from "../services/toolGroup.service";
import {
  Button, Paper, TextField, Typography, Stack, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";

const TariffView = () => {
  /* ---------------- TARIFAS GLOBALES -------------- */
  const [rent, setRent] = useState("");
  const [fine, setFine] = useState("");

  /* ---------------- TARIFA POR GRUPO ----------------- */
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupRent, setGroupRent] = useState("");
  const [groupFine, setGroupFine] = useState("");

  /* ---------- CARGAS ---------- */
  useEffect(() => {
    // tarifas globales
    tariffService.getAll().then((res) => {
      if (res.data.length) {
        setRent(res.data[0].dailyRentalRate);
        setFine(res.data[0].dailyFineRate);
      }
    });
    toolGroupService.getAll().then((res) => setGroups(res.data));
  }, []);

  /* ---------- GUARDAR TARIFA GLOBAL ---------- */
  const saveGlobal = async () => {
    try{
    await tariffService.update(parseFloat(rent), parseFloat(fine));
    alert("Tarifa Global actualizada");
    }  catch (e) {
       alert("Error: " + e.response?.data || "Tariff failed");
    }
  };

  /* ---------- CARGAR TARIFA DEL GRUPO SELECCIONADO ---------- */
  const loadGroupTariff = (groupId) => {
    const g = groups.find((gr) => gr.id === groupId);
    if (g) {
      setGroupRent(g.tariff.dailyRentalRate);
      setGroupFine(g.tariff.dailyFineRate);
    }
  };

  /* ---------- GUARDAR TARIFA DEL GRUPO ---------- */
  const saveGroupTariff = async () => {
    if (!selectedGroup) return;
    try{
        await toolGroupService.updateTariff(selectedGroup, parseFloat(groupRent), parseFloat(groupFine));
        alert("Tarifa de Herramienta Actualizada");
    }  catch (e) {
       alert("Error: " + e.response?.data || "Tariff failed");
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <Paper sx={{ p: 4, background: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff", textAlign: "center" }}>
        Configure Tariffs
      </Typography>

      {/* ---------- SECCIÓN 1: TARIFA GLOBAL (RF4.1 + RF4.2) ---------- */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Global Tariffs</Typography>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, mb: 4, alignItems: "center" }}>
        <TextField label="Daily Rental Rate ($)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} fullWidth />
        <TextField label="Daily Fine Rate ($)" type="number" value={fine} onChange={(e) => setFine(e.target.value)} fullWidth />
        <Button variant="contained" onClick={saveGlobal}>Save Global Tariffs</Button>
      </Stack>

      {/* ---------- SECCIÓN 2: TARIFA POR GRUPO (RF4.1 + RF4.2) ---------- */}
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Edit Tariff per Tool Group</Typography>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, alignItems: "center" }}>
        <TextField
          select
          label="Select Tool Group"
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(e.target.value);
            loadGroupTariff(e.target.value);
          }}
          fullWidth
        >
          <MenuItem value="">-- Choose --</MenuItem>
          {groups.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name} ({g.category})
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Group Rental Rate ($)" type="number" value={groupRent} onChange={(e) => setGroupRent(e.target.value)} fullWidth />
        <TextField label="Group Fine Rate ($)" type="number" value={groupFine} onChange={(e) => setGroupFine(e.target.value)} fullWidth />
        <Button variant="contained" onClick={saveGroupTariff}>Save Group Tariff</Button>
      </Stack>
    </Paper>
  );
};

export default TariffView;