import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import HandymanIcon from '@mui/icons-material/Handyman';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiscountIcon from "@mui/icons-material/Discount";
import HailIcon from "@mui/icons-material/Hail";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Sidemenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  useEffect(() => {
  const root = document.getElementById("root");
  if (root) root.inert = open;
}, [open]);

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/customers")}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/tools")}>
          <ListItemIcon>
            <HandymanIcon />
          </ListItemIcon>
          <ListItemText primary="Herramientas" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/loans")}>
          <ListItemIcon>
            <CreditScoreIcon />
          </ListItemIcon>
          <ListItemText primary="Préstamos" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/returns")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Préstamo con multa " />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/reports")}>
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/kardex")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Kárdex" />
        </ListItemButton>
      </List>

      <Divider />

      <List>

        <ListItemButton onClick={() => navigate("/paycheck/vacations")}>
          <ListItemIcon>
            <HailIcon />
          </ListItemIcon>
          <ListItemText primary="Vacaciones" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/paycheck/medicalleave")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Licencias Medicas" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >{listOptions()}</Drawer>
    </div>
  );
}
