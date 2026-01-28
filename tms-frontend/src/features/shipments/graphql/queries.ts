import { gql } from "@apollo/client";

export const GET_SHIPMENTS = gql`
  query GetShipments($page: Int, $limit: Int) {
    shipments(pagination: { page: $page, limit: $limit }) {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      pickupDate
      deliveryDate
      status
      rate
      flagged
      createdAt
    }
  }
`;

export const GET_SHIPMENT_DETAILS = gql`
  query GetShipment($id: ID!) {
    shipment(id: $id) {
      id
      shipperName
      carrierName
      pickupLocation
      deliveryLocation
      pickupDate
      deliveryDate
      status
      rate
      flagged
      createdAt
    }
  }
`;
