import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client/react";

import { Box, Chip, Pagination, Stack, Typography } from "@mui/material";

import { useSnackbar } from "notistack";

import { GET_SHIPMENTS } from "../graphql/queries";
import { ADD_SHIPMENT, UPDATE_SHIPMENT } from "../graphql/mutations";

import type { Shipment } from "../types";

import ShipmentsGrid from "../components/ShipmentsGrid";
import ShipmentsTile from "../components/ShipmentTile";
import ShipmentDetailsDrawer from "../components/ShipmentDetailsDrawer";
import ShipmentFormDialog from "../components/ShipmentFormDialog";

import { useShipmentUI } from "../context/ShipmentUIContext";

interface ShipmentData {
  shipments: {
    shipments: Shipment[];
    totalCount: number;
  };
}

export default function ShipmentPage() {
  const { view } = useParams();
  const currentView = view === "title" ? "title" : "grid";
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    field: string;
    order: number;
  }>({
    field: "createdAt",
    order: -1,
  });
  const { openEdit, isFormOpen, closeForm, editingShipment } = useShipmentUI();

  const [page, setPage] = useState(1);
  const limit = 10;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role as "admin" | "employee";

  const { enqueueSnackbar } = useSnackbar();

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );

  const [addShipment] = useMutation(ADD_SHIPMENT, {
    refetchQueries: [
      {
        query: GET_SHIPMENTS,
        variables: {
          page,
          limit: 10,
          filter: activeFilter ? { status: activeFilter } : null,
          sort: sortConfig,
        },
      },
    ],
    onCompleted: () => {
      enqueueSnackbar("Shipment Added", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Operation failed", { variant: "error" });
    },
  });

  const [updateShipment] = useMutation(UPDATE_SHIPMENT, {
    refetchQueries: [
      {
        query: GET_SHIPMENTS,
        variables: {
          page,
          limit: 10,
          filter: activeFilter ? { status: activeFilter } : null,
          sort: sortConfig,
        },
      },
    ],
    onCompleted: () => {
      enqueueSnackbar("Shipment Updated", { variant: "info" });
    },
    onError: () => {
      enqueueSnackbar("Operation failed", { variant: "error" });
    },
  });

  const handleFormSubmit = (data: any) => {
    if (editingShipment) {
      updateShipment({
        variables: {
          id: editingShipment.id,
          carrierName: data.carrierName,
          pickupLocation: data.pickupLocation,
          deliveryLocation: data.deliveryLocation,
          pickupDate: data.pickupDate,
          deliveryDate: data.deliveryDate,
          status: data.status,
          rate: data.rate,
        },
      });
    } else {
      addShipment({ variables: data });
    }
  };

  const { data, loading, error } = useQuery<ShipmentData>(GET_SHIPMENTS, {
    variables: {
      page: page,
      limit: limit,
      filter: activeFilter ? { status: activeFilter } : null,
      sort: sortConfig,
    },
  });

  const totalPages = Math.ceil((data?.shipments?.totalCount || 0) / limit);

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === -1 ? 1 : -1,
    }));
  };

  const statuses = ["Pending", "In Transit", "Delivered", "Cancelled"];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-end" },
          mb: { xs: 0, md: 3 },
          gap: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "text.primary",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          Shipments
        </Typography>

        <Stack direction="row" spacing={1} mb={3}>
          {statuses.map((status) => (
            <Chip
              key={status}
              label={status}
              clickable
              color={activeFilter === status ? "primary" : "default"}
              onClick={() =>
                setActiveFilter(activeFilter === status ? null : status)
              }
              variant={activeFilter === status ? "filled" : "outlined"}
            />
          ))}
        </Stack>
      </Box>

      {currentView === "grid" ? (
        <ShipmentsGrid
          error={error}
          onEdit={openEdit}
          loading={loading}
          userRole={userRole}
          onSelect={setSelectedShipment}
          shipments={data?.shipments?.shipments ?? []}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      ) : (
        <ShipmentsTile
          error={error}
          onEdit={openEdit}
          loading={loading}
          userRole={userRole}
          shipments={data?.shipments?.shipments ?? []}
          onSelect={setSelectedShipment}
        />
      )}

      <ShipmentDetailsDrawer
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
      />

      <ShipmentFormDialog
        key={editingShipment?.id || "new-shipment"}
        open={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        initialData={editingShipment}
      />

      {!loading && !error && (
        <Box display="flex" justifyContent="center" mt={4} mb={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
