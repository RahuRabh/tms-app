import { type Shipment } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  IconButton,
  Typography,
  useTheme,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

import { useMutation } from "@apollo/client/react";
import { DELETE_SHIPMENT, FLAG_SHIPMENT } from "../graphql/mutations";

import { useSnackbar } from "notistack";

import getStatusStyles from "../../../utils/statusStyle";
// import formatDate from "../../../utils/formatDate";

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

export default function ShipmentsGrid({
  error,
  onEdit,
  userRole,
  loading,
  onSelect,
  shipments,
  onSort,
  sortConfig,
}: {
  shipments: Shipment[];
  onSelect: (s: Shipment) => void;
  userRole: "admin" | "employee";
  onEdit: (s: Shipment) => void;
  loading: boolean;
  error?: any;
  onSort: (field: string) => void;
  sortConfig: { field: string; order: number };
}) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [deleteShipment] = useMutation<DeleteResponse>(DELETE_SHIPMENT, {
    update(cache, { data }, { variables }) {
      if (data?.deleteShipment) {
        const normalizedId = cache.identify({
          __typename: "Shipment",
          id: variables?.id,
        });
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

  const [flagShipment] = useMutation<FlagMutationResponse>(FLAG_SHIPMENT, {
    onCompleted: (data) => {
      const message = data.flagShipment.flagged ? "Flagged" : "Unflagged";
      enqueueSnackbar(`Shipment ${message}`, { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Operation failed", {
        variant: "error",
      });
    },
  });

  return (
    <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor:
                theme.palette.mode === "light"
                  ? "#f9fafb"
                  : "rgba(255,255,255,0.05)",
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>Shipper</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Carrier</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Pickup</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Delivery</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell
              sortDirection={
                sortConfig.field === "rate"
                  ? sortConfig.order === 1
                    ? "asc"
                    : "desc"
                  : false
              }
              sx={{ fontWeight: 700 }}
            >
              <TableSortLabel
                active={true}
                direction={
                  sortConfig.field === "rate"
                    ? sortConfig.order === 1
                      ? "asc"
                      : "desc"
                    : "asc"
                }
                onClick={() => onSort("rate")}
                sx={{ color: "primary.main !important" }}
              >
                Rate
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* ERROR STATE */}
          {error ? (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                <Typography color="error" fontWeight={500}>
                  Failed to load shipments. Please try again.
                </Typography>
              </TableCell>
            </TableRow>
          ) : loading ? (
            /* LOADING STATE */
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`}>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={80} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={90} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={90} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={60} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="circular" width={32} height={32} />
                </TableCell>
              </TableRow>
            ))
          ) : shipments.length === 0 ? (
            /* EMPTY STATE */
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary">
                  No shipments found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            /* SUCCESS STATE */
            shipments.map((s) => (
              <TableRow
                key={s.id}
                hover
                onClick={() => onSelect(s)}
                sx={{
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { bgcolor: "action.hover !important" },
                }}
              >
                <TableCell sx={{ color: "text.primary" }}>
                  {s.shipperName}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {s.carrierName}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {s.pickupLocation}
                </TableCell>
                <TableCell sx={{ color: "text.primary" }}>
                  {s.deliveryLocation}
                </TableCell>
                <TableCell
                  sx={{
                    color: `${getStatusStyles(s.status).color}.main`,
                    fontWeight: 700,
                    textTransform: "capitalize",
                  }}
                >
                  {s.status}
                </TableCell>

                <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>
                  ₹{s.rate}
                </TableCell>
                {/* <TableCell sx={{ fontWeight: 700, color: "primary.main" }}>
                  {formatDate(s.createdAt)}
                </TableCell> */}
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="inherit"
                    onClick={() =>
                      flagShipment({
                        variables: { id: s.id, flagged: !s.flagged },
                      })
                    }
                  >
                    {s.flagged ? (
                      <FlagIcon color="warning" />
                    ) : (
                      <OutlinedFlagIcon color="action" />
                    )}
                  </IconButton>

                  {userRole === "admin" && (
                    <IconButton color="inherit" onClick={() => onEdit(s)}>
                      <EditIcon />
                    </IconButton>
                  )}

                  {userRole === "admin" && (
                    <IconButton
                      color="inherit"
                      onClick={() =>
                        deleteShipment({ variables: { id: s.id } })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
