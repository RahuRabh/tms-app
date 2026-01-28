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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import DeleteIcon from "@mui/icons-material/Delete";

import { GET_SHIPMENTS } from "../graphql/queries";
import { useMutation } from "@apollo/client/react";
import { DELETE_SHIPMENT, FLAG_SHIPMENT } from "../graphql/mutations";

import { useSnackbar } from "notistack";

interface FlagMutationResponse {
  flagShipment: {
    id: string;
    flagged: boolean;
    __typename: string;
  };
}

export default function ShipmentsGrid({
  error,
  onEdit,
  userRole,
  loading,
  onSelect,
  shipments,
}: {
  shipments: Shipment[];
  onSelect: (s: Shipment) => void;
  userRole: "admin" | "employee";
  onEdit: (s: Shipment) => void;
  loading: boolean;
  error?: any;
}) {
  const { enqueueSnackbar } = useSnackbar();

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

  const [flagShipment] = useMutation<FlagMutationResponse>(FLAG_SHIPMENT, {
    refetchQueries: [
      {
        query: GET_SHIPMENTS,
        variables: { page: 1, limit: 10 },
      },
    ],
    onCompleted: (data) => {
      const message = data.flagShipment.flagged ? "Flagged" : "Unflagged";
      enqueueSnackbar(`Shipment ${message}`, { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Operation failed", { variant: "error" });
    },
  });

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#f9fafb" }}>
            <TableCell>Shipper</TableCell>
            <TableCell>Carrier</TableCell>
            <TableCell>Pickup</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>PickUp Date</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Actions</TableCell>
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
                style={{ cursor: "pointer" }}
                sx={{ transition: "0.2s", "&:hover": { bgcolor: "#eef2ff" } }}
              >
                <TableCell>{s.shipperName}</TableCell>
                <TableCell>{s.carrierName}</TableCell>
                <TableCell>{s.pickupLocation}</TableCell>
                <TableCell>{s.deliveryLocation}</TableCell>
                <TableCell>{s.status}</TableCell>
                <TableCell>
                  {s.pickupDate
                    ? new Date(parseInt(s.pickupDate)).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {s.deliveryDate
                    ? new Date(parseInt(s.deliveryDate)).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>₹{s.rate}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    onClick={() =>
                      flagShipment({
                        variables: { id: s.id, flagged: !s.flagged },
                      })
                    }
                  >
                    {s.flagged ? (
                      <FlagIcon color="warning" />
                    ) : (
                      <OutlinedFlagIcon />
                    )}
                  </IconButton>

                  {userRole === "admin" && (
                    <IconButton onClick={() => onEdit(s)}>
                      <EditIcon />
                    </IconButton>
                  )}

                  {userRole === "admin" && (
                    <IconButton
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
