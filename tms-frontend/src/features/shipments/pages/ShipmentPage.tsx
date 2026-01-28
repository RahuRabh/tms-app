import { useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client/react";

import { Box, Typography } from "@mui/material";

import { GET_SHIPMENTS } from "../graphql/queries";
import { ADD_SHIPMENT, UPDATE_SHIPMENT } from "../graphql/mutations";

import type { Shipment } from "../types";

import ShipmentsGrid from "../components/ShipmentsGrid";
import ShipmentsTile from "../components/ShipmentTile";
import ShipmentDetailsDrawer from "../components/ShipmentDetailsDrawer";
import ShipmentFormDialog from "../components/ShipmentFormDialog";

import { useShipmentUI } from "../context/ShipmentUIContext";

import { useSnackbar } from "notistack";

interface ShipmentData {
  shipments: Shipment[];
}

export default function ShipmentPage() {
  const { view } = useParams();
  const currentView = view === "title" ? "title" : "grid";

  const { openEdit, isFormOpen, closeForm, editingShipment } = useShipmentUI();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userRole = user?.role as "admin" | "employee";

  const { enqueueSnackbar } = useSnackbar();

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null,
  );

  const [addShipment] = useMutation(ADD_SHIPMENT, {
    refetchQueries: [
      { query: GET_SHIPMENTS, variables: { page: 1, limit: 10 } },
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
      { query: GET_SHIPMENTS, variables: { page: 1, limit: 10 } },
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
    variables: { page: 1, limit: 10 },
  });

  if (error) return <Typography>Error loading shipments.</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" mb={2}>
          Shipments
        </Typography>
      </Box>

      {currentView === "grid" ? (
        <ShipmentsGrid
          error={error}
          onEdit={openEdit}
          loading={loading}
          userRole={userRole}
          onSelect={setSelectedShipment}
          shipments={data?.shipments ?? []}
        />
      ) : (
        <ShipmentsTile
          error={error}
          onEdit={openEdit}
          loading={loading}
          userRole={userRole}
          shipments={data?.shipments ?? []}
          onSelect={setSelectedShipment}
        />
      )}

      <ShipmentDetailsDrawer
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
      />

      <ShipmentFormDialog
        open={isFormOpen}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
        initialData={editingShipment}
      />
    </Box>
  );
}
