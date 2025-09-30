import { useEffect, useState } from "react";
import returnService from "../services/return.service";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";

const ReturnView = () => {
  const [loans, setLoans] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [fine, setFine] = useState(0);

  const loadActive = async () => {
    const res = await returnService.getActive();
    setLoans(res.data);
  };

  const handleReturn = async () => {
    const res = await returnService.returnLoan(selected.id);
    setFine(res.data.fine);          
    setOpen(false);
    loadActive();                    
  };

  useEffect(() => {
    loadActive();
  }, []);

  return (
    <Paper sx={{ p: 4, background: "#ffffff" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#6c63ff" }}>
        Return Loans
      </Typography>

      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#f5f0ff" }}>
            <TableRow>
              <TableCell sx={{ color: "#2e2e4e" }}>ID</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Customer</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Tool</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Due Date</TableCell>
              <TableCell sx={{ color: "#2e2e4e" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((l) => (
              <TableRow key={l.id} hover sx={{ "&:hover": { background: "#f5f0ff" } }}>
                <TableCell>{l.id}</TableCell>
                <TableCell>{l.customerName}</TableCell>
                <TableCell>{l.toolName}</TableCell>
                <TableCell>{l.dueDate}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "#9d4edd", borderColor: "#9d4edd" }}
                    onClick={() => {
                      setSelected(l);
                      setOpen(true);
                    }}
                  >
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* -------- Modal confirmación -------- */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ background: "#f5f0ff", color: "#6c63ff" }}>
          Confirm Return
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loan #{selected?.id} will be returned.
          </Typography>
          {fine > 0 && (
            <Typography variant="h6" color="error" sx={{ mt: 1 }}>
              Fine: ${fine.toLocaleString()}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} sx={{ color: "#4a4a68" }}>
            Cancel
          </Button>
          <Button
            onClick={handleReturn}
            variant="contained"
            sx={{ background: "#6c63ff", ":hover": { background: "#c77dff" } }}
          >
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReturnView;