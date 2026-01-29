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

import formatDateInput from "../../../utils/formatDate";

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
  const [errors, setErrors] = useState<any>({});
  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    let tempErrors: any = {};
    if (!form.shipperName) tempErrors.shipperName = "Required Shipper Name";
    if (!form.carrierName) tempErrors.carrierName = "Required Carrier Name";
    if (!form.pickupLocation)
      tempErrors.pickupLocation = "Required Pickup Location";
    if (!form.deliveryLocation)
      tempErrors.deliveryLocation = "Required Delivery Location";
    if (!form.rate) tempErrors.rate = "Required Rate";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        shipperName: initialData.shipperName || "",
        carrierName: initialData.carrierName || "",
        pickupLocation: initialData.pickupLocation || "",
        deliveryLocation: initialData.deliveryLocation || "",
        pickupDate: formatDateInput(initialData.pickupDate),
        deliveryDate: formatDateInput(initialData.deliveryDate),
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
    if (validate()) {
      onSubmit({
        ...form,
        rate: parseFloat(form.rate),
      });
      onClose();
    }
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
          error={!!errors.shipperName}
          helperText={errors.shipperName}
          fullWidth
          margin="dense"
          value={form.shipperName}
          onChange={handleChange}
          disabled={!!initialData}
        />
        <TextField
          label="Carrier"
          name="carrierName"
          error={!!errors.carrierName}
          helperText={errors.carrierName}
          fullWidth
          margin="dense"
          value={form.carrierName}
          onChange={handleChange}
        />
        <TextField
          label="Pickup Location"
          name="pickupLocation"
          error={!!errors.pickupLocation}
          helperText={errors.pickupLocation}
          fullWidth
          margin="dense"
          value={form.pickupLocation}
          onChange={handleChange}
        />
        <TextField
          label="Delivery Location"
          name="deliveryLocation"
          error={!!errors.deliveryLocation}
          helperText={errors.deliveryLocation}
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
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {min: today}
          }}
          value={form.pickupDate || ""}
          onChange={handleChange}
        />
        <TextField
          label="Delivery Date"
          name="deliveryDate"
          type="date"
          fullWidth
          margin="dense"
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { min: form.pickupDate || today}
          }}
          value={form.deliveryDate || ""}
          onChange={handleChange}
        />
        <TextField
          label="Rate"
          name="rate"
          error={!!errors.rate}
          helperText={errors.rate}
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
