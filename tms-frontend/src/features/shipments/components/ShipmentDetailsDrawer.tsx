import { Drawer, Box, Typography, Chip, Divider, IconButton } from "@mui/material";
import CommuteIcon from "@mui/icons-material/Commute";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import { type Shipment } from "../types";

import getStatusStyles from "../../../utils/statusStyle";
import formatDate from "../../../utils/formatDate";

interface ShipmentDetailsDrawerProps {
  shipment: Shipment | null;
  onClose: () => void;
}

export default function ShipmentDetailsDrawer({
  shipment,
  onClose,
}: ShipmentDetailsDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={!!shipment}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          bgcolor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      <Box p={{ xs: 2, sm: 4 }}>
        {shipment && (
          <>
            <Box
              display="flex"
              alignItems="center"
              mb={2}
              sx={{ ml: -1 }}
            >
              <IconButton onClick={onClose} sx={{ display: { md: "none" } }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="button"
                sx={{ display: { md: "none" }, ml: 1, fontWeight: 700 }}
              >
                Back to Shipments
              </Typography>

              {/* Desktop Close Icon */}
              <IconButton
                onClick={onClose}
                sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box mb={3}>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={700}
              >
                Shipment ID: {shipment.id.slice(-10).toUpperCase()}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={800}
                color="text.primary"
                gutterBottom
              >
                Shipment Details
              </Typography>
              <Chip
                label={shipment.status}
                color={getStatusStyles(shipment.status).color}
                size="small"
                sx={{ fontWeight: 700, borderRadius: 1.5 }}
              />
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box display="flex" flexDirection="column" gap={3}>
              <DetailRow label="Shipper" value={shipment.shipperName} />
              <DetailRow label="Carrier" value={shipment.carrierName} />

              <Box borderTop="1px solid" borderColor="divider">
                <Box display="flex" alignItems="center" gap={1} m={2}>
                  <CommuteIcon color="primary" fontSize="small" />
                  <Typography
                    variant="subtitle2"
                    color="text.primary"
                    fontWeight={700}
                  >
                    Logistics Route
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "action.hover",
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="success" fontSize="small" />
                    <Typography variant="body2" color="text.primary">
                      {shipment.pickupLocation}
                    </Typography>
                  </Box>

                  <Box
                    ml={1.5}
                    my={0.5}
                    sx={{
                      borderLeft: "2px dotted",
                      borderColor: "divider",
                      height: 24,
                    }}
                  />
                  <Box ml={1.5} sx={{ position: "relative" }}>
                    <NorthEastIcon
                      color="action"
                      sx={{
                        fontSize: 16,
                        position: "absolute",
                        top: "-24px",
                        left: "-8px",
                        transform: "rotate(90deg)",
                      }}
                    />
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="error" fontSize="small" />
                    <Typography variant="body2" color="text.primary">
                      {shipment.deliveryLocation}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box borderTop="1px solid" borderColor="divider">
                <Box
                  sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2, mt: 3 }}
                >
                  <DetailRow
                    label="Pick-up Date"
                    value={formatDate(shipment.pickupDate)}
                  />
                  <Box my={2} />
                  <DetailRow
                    label="Delivery Date"
                    value={formatDate(shipment.deliveryDate)}
                  />
                </Box>
              </Box>

              <DetailRow
                label="Total Rate"
                value={`₹${shipment.rate?.toLocaleString("en-IN")}`}
                isPrice
              />
            </Box>

            <Box mt={6} pt={3} borderTop="1px solid" borderColor="divider">
              <Typography variant="caption" color="text.secondary">
                Managed via UltraShip TMS Cloud
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

function DetailRow({
  label,
  value,
  isPrice = false,
}: {
  label: string;
  value: string;
  isPrice?: boolean;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        sx={{ textTransform: "uppercase" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        color={isPrice ? "primary.main" : "text.primary"}
        fontWeight={isPrice ? 700 : 500}
      >
        {value}
      </Typography>
    </Box>
  );
}
