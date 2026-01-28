export interface Shipment {
  id: string;
  shipperName: string;
  carrierName: string;
  pickupLocation: string;
  deliveryLocation: string;
  deliveryDate: string;
  pickupDate: string;
  status: string;
  rate: number;
  flagged: boolean;
  createdAt: string;
}
