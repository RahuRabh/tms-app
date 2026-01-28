import { createContext, useContext, useState } from "react";
import { type Shipment } from "../types";

interface ShipmentUIContextType {
  openAdd: () => void;
  openEdit: (Shipment: Shipment) => void;
  closeForm: () => void;
  isFormOpen: boolean;
  editingShipment: Shipment | null;
}

const ShipmentUIContext = createContext<ShipmentUIContextType | null>(null);

export const useShipmentUI = () => {
  const ctx = useContext(ShipmentUIContext);
  if (!ctx) throw new Error("ShipmentUIContext not found");
  return ctx;
};

export const ShipmentUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);

  const openAdd = () => {
    setEditingShipment(null);
    setFormOpen(true);
  };

  const openEdit = (shipment: Shipment) => {
    setEditingShipment(shipment);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingShipment(null);
  }

  return (
    <ShipmentUIContext.Provider
      value={{ openAdd, openEdit, closeForm, isFormOpen, editingShipment }}
    >
      {children}
    </ShipmentUIContext.Provider>
  );
};
