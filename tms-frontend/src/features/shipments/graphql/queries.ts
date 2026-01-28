import { gql } from "@apollo/client";

export const GET_SHIPMENTS = gql`
  query GetShipments(
    $page: Int
    $limit: Int
    $filter: ShipmentFilterInput
    $sort: SortInput
  ) {
    shipments(
      pagination: { page: $page, limit: $limit }
      filter: $filter
      sort: $sort
    ) {
      shipments {
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
      totalCount
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
