import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { type Shipment } from "../types";
import { useState, useEffect } from "react";

interface ShipmentFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Shipment | null;
}
const INITIAL_FORM_STATE = {
  shipperName: "",
  carrierName: "",
  pickupLocation: "",
  deliveryLocation: "",
  pickupDate: "",
  deliveryDate: "",
  rate: "",
  status: "Pending",
};

export default function ShipmentFormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: ShipmentFormDialogProps) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (initialData) {
      setForm({
        shipperName: initialData.shipperName || "",
        carrierName: initialData.carrierName || "",
        pickupLocation: initialData.pickupLocation || "",
        deliveryLocation: initialData.deliveryLocation || "",
        pickupDate: initialData.pickupDate || "",
        deliveryDate: initialData.deliveryDate || "",
        rate: String(initialData.rate ?? ""),
        status: initialData.status || "Pending",
      });
    } else {
      setForm(INITIAL_FORM_STATE);
    }
  }, [initialData, open]);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit({
      ...form,
      rate: parseFloat(form.rate),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {initialData ? "Edit Shipment" : "Add Shipment"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Shipper"
          name="shipperName"
          fullWidth
          margin="dense"
          value={form.shipperName}
          onChange={handleChange}
          disabled={!!initialData}
        />
        <TextField
          label="Carrier"
          name="carrierName"
          fullWidth
          margin="dense"
          value={form.carrierName}
          onChange={handleChange}
        />
        <TextField
          label="Pickup Location"
          name="pickupLocation"
          fullWidth
          margin="dense"
          value={form.pickupLocation}
          onChange={handleChange}
        />
        <TextField
          label="Delivery Location"
          name="deliveryLocation"
          fullWidth
          margin="dense"
          value={form.deliveryLocation}
          onChange={handleChange}
        />
        <TextField
          label="Pickup Date"
          name="pickupDate"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={form.pickupDate || ""}
          onChange={handleChange}
        />
        <TextField
          label="Delivery Date"
          name="deliveryDate"
          type="date"
          fullWidth
          margin="dense"
          InputLabelProps={{ shrink: true }}
          value={form.deliveryDate || ""}
          onChange={handleChange}
        />
        <TextField
          label="Rate"
          name="rate"
          type="number"
          fullWidth
          margin="dense"
          value={form.rate}
          onChange={handleChange}
        />
        {initialData && (
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            margin="dense"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Transit">In Transit</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
