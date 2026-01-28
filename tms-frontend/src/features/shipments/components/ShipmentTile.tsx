import { useState } from "react";

import { type Shipment } from "../types";

import { useSnackbar } from "notistack";

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
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMutation } from "@apollo/client/react";
import { FLAG_SHIPMENT, DELETE_SHIPMENT } from "../graphql/mutations";

import getStatusStyles from "../../../utils/statusStyle";
import formatDate from "../../../utils/formatDate";

interface FlagMutationResponse {
  flagShipment: {
    id: string;
    flagged: boolean;
    __typename: string;
  };
}

interface DeleteResponse {
  deleteShipment: boolean;
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
  onCompleted: (data) => {
    const message = data.flagShipment.flagged ? "Flagged" : "Unflagged";
    enqueueSnackbar(`Shipment ${message}`, { variant: "success" });
  },
  onError: (error) => {
    enqueueSnackbar(error.message || "Operation failed", { variant: "error" });
  },
});

    const [deleteShipment] = useMutation<DeleteResponse>(DELETE_SHIPMENT, {
      update(cache, { data }, { variables }) {
      if (data?.deleteShipment) {
        const normalizedId = cache.identify({ __typename: 'Shipment', id: variables?.id });
        cache.evict({ id: normalizedId });
        cache.gc();
      }
    },
      onCompleted: () => {
        enqueueSnackbar("Shipment deleted", { variant: "info" });
      },
      onError: () => {
        enqueueSnackbar("Operation failed", { variant: "error" });
      },
    });

  function DataRow({
    label,
    value,
    isBold = false,
  }: {
    label: string;
    value: string;
    isBold?: boolean;
  }) {
    return (
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.primary", fontWeight: isBold ? 800 : 600 }}
        >
          {value}
        </Typography>
      </Box>
    );
  }

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
                borderRadius: 4,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "light"
                      ? "0 12px 24px -10px rgba(0,0,0,0.1)"
                      : "0 12px 24px -10px rgba(0,0,0,0.5)",
                  borderColor: "primary.main",
                },
                cursor: "pointer",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "text.primary" }}
                  >
                    {s.shipperName}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => openMenu(e, s)}
                    sx={{ mt: -0.5, mr: -0.5 }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Stack spacing={1}>
                  <DataRow label="Carrier" value={s.carrierName} />
                  <DataRow
                    label="Timeline"
                    value={`${formatDate(s.pickupDate)} - ${formatDate(s.deliveryDate)}`}
                  />
                  <DataRow
                    label="Rate"
                    value={`₹${s.rate.toLocaleString("en-IN")}`}
                    isBold
                  />
                </Stack>

                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Chip
                    label={getStatusStyles(s.status).label}
                    color={getStatusStyles(s.status).color}
                    size="small"
                    sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  />
                </Box>
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
