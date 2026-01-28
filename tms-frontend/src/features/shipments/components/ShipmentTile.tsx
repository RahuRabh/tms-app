import { type Shipment } from "../types";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Alert,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { FLAG_SHIPMENT, DELETE_SHIPMENT } from "../graphql/mutations";
import { GET_SHIPMENTS } from "../graphql/queries";
import { useSnackbar } from "notistack";

interface FlagMutationResponse {
  flagShipment: {
    id: string;
    flagged: boolean;
    __typename: string;
  };
}

export default function ShipmentsTile({
  onEdit,
  loading,
  error,
  userRole,
  onSelect,
  shipments,
}: {
  loading: boolean;
  shipments: Shipment[];
  onEdit: (s: Shipment) => void;
  userRole: "admin" | "employee";
  onSelect: (s: Shipment) => void;
  error?: any;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeShipment, setActiveShipment] = useState<Shipment | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const openMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    shipment: Shipment,
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setActiveShipment(shipment);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setActiveShipment(null);
  };

  const [flagShipment] = useMutation<FlagMutationResponse>(FLAG_SHIPMENT, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { page: 1, limit: 10 } },
    ],
    onCompleted: (data) => {
      const message = data.flagShipment.flagged ? "Flagged" : "Unflagged";
      enqueueSnackbar(`Shipment ${message}`, { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Operation failed", { variant: "error" });
    },
  });

  const [deleteShipment] = useMutation(DELETE_SHIPMENT, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { page: 1, limit: 10 } },
    ],
    onCompleted: () => {
      enqueueSnackbar("Shipment deleted", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Operation failed", { variant: "error" });
    },
  });

  return (
    <Grid container spacing={2}>
      {/* ERROR STATE */}
      {error && (
        <Grid size={12}>
          <Alert severity="error">
            Failed to load shipments. Please try again.
          </Alert>
        </Grid>
      )}
      {/* LOADING STATE */}
      {loading &&
        Array.from({ length: 6 }).map((_, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={`skeleton-${i}`}>
            <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Skeleton variant="text" width="60%" height={28} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>

                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="65%" />
                <Skeleton variant="text" width="65%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={24}
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

      {/* EMPTY STATE */}
      {!loading && !error && shipments.length === 0 && (
        <Grid size={12}>
          <Alert severity="info">No shipments found.</Alert>
        </Grid>
      )}

      {/* SUCCESS STATE */}
      {!loading &&
        !error &&
        shipments.map((s) => (
          <Grid size={{ xs: 12, md: 4 }} key={s.id}>
            <Card
              onClick={() => onSelect(s)}
              sx={{
                borderRadius: 3,
                boxShadow: 2,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{s.shipperName}</Typography>
                  <IconButton onClick={(e) => openMenu(e, s)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {s.pickupLocation} → {s.deliveryLocation}
                </Typography>
                <Typography>Carrier: {s.carrierName}</Typography>
                <Typography>
                  PickUp Date:{" "}
                  {s.pickupDate
                    ? new Date(parseInt(s.pickupDate)).toLocaleDateString()
                    : "N/A"}
                </Typography>
                <Typography>
                  Delivery Date:{" "}
                  {s.deliveryDate
                    ? new Date(parseInt(s.deliveryDate)).toLocaleDateString()
                    : "N/A"}
                </Typography>
                <Typography>Rate: ₹{s.rate}</Typography>
                <Chip
                  label={s.status}
                  color={
                    s.status === "Delivered"
                      ? "success"
                      : s.status === "In Transit"
                        ? "warning"
                        : "default"
                  }
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
        {userRole === "admin" && (
          <MenuItem onClick={() => onEdit(activeShipment!)}>Edit</MenuItem>
        )}

        <MenuItem
          onClick={() => {
            if (activeShipment)
              flagShipment({
                variables: {
                  id: activeShipment.id,
                  flagged: !activeShipment.flagged,
                },
              });
            closeMenu();
          }}
        >
          {activeShipment?.flagged ? "Unflag" : "Flag"}
        </MenuItem>

        {userRole === "admin" && (
          <MenuItem
            onClick={() => {
              if (activeShipment)
                deleteShipment({ variables: { id: activeShipment.id } });
              closeMenu();
            }}
          >
            Delete
          </MenuItem>
        )}
      </Menu>
    </Grid>
  );
}
