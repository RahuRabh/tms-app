import { gql } from "@apollo/client";

export const FLAG_SHIPMENT = gql`
  mutation FlagShipment($id: ID!, $flagged: Boolean!) {
    flagShipment(id: $id, flagged: $flagged) {
      id
      flagged
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;

export const ADD_SHIPMENT = gql`
  mutation AddShipment(
    $shipperName: String!
    $carrierName: String!
    $pickupLocation: String!
    $deliveryLocation: String!
    $pickupDate: String!
    $deliveryDate: String!
    $rate: Float
  ) {
    addShipment(
      shipperName: $shipperName
      carrierName: $carrierName
      pickupLocation: $pickupLocation
      deliveryLocation: $deliveryLocation
      pickupDate: $pickupDate
      deliveryDate: $deliveryDate
      rate: $rate
    ) {
      id
      status
      pickupDate
      deliveryDate
      rate
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment(
    $id: ID!
    $carrierName: String
    $pickupLocation: String
    $deliveryLocation: String
    $pickupDate: String
    $deliveryDate: String
    $status: String
    $rate: Float
  ) {
    updateShipment(
      id: $id
      carrierName: $carrierName
      pickupLocation: $pickupLocation
      deliveryLocation: $deliveryLocation
      pickupDate: $pickupDate
      deliveryDate: $deliveryDate
      status: $status
      rate: $rate
    ) {
      id
      status
      pickupDate
      deliveryDate
      rate
    }
  }
`;