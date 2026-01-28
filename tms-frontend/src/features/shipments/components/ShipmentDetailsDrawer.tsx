import { Drawer, Box, Typography, Chip, Divider } from "@mui/material";
import { type Shipment } from "../types";

interface ShipmentDetailsDrawerProps {
  shipment: Shipment | null;
  onClose: () => void;
}

export default function ShipmentDetailsDrawer({
  shipment,
  onClose,
}: ShipmentDetailsDrawerProps) {
  return (
    <Drawer anchor="right" open={!!shipment} onClose={onClose}>
      <Box width={350} p={3}>
        {shipment && (
          <>
            <Typography variant="h6" gutterBottom>
              Shipment Details
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography>
              <strong>Shipper:</strong>
              {shipment.shipperName}
            </Typography>
            <Typography>
              <strong>Carrier:</strong>
              {shipment.carrierName}
            </Typography>
            <Typography>
              <strong>Route:</strong>
              {shipment.pickupLocation} - {shipment.deliveryLocation}
            </Typography>
            <Typography>
              <strong>Status:</strong>
              <Chip label={shipment.status} size="small" />
            </Typography>
            <Typography>
              <strong>Rate:</strong>${shipment.rate}
            </Typography>
            <Typography>
              <strong>Created:</strong>
              {new Date(shipment.createdAt).toLocaleDateString()}
            </Typography>
          </>
        )}
      </Box>
    </Drawer>
  );
}
