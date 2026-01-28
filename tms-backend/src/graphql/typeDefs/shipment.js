const gql = require("graphql-tag");

module.exports = gql`
  type Shipment {
    id: ID!
    shipperName: String!
    carrierName: String!
    pickupLocation: String!
    deliveryLocation: String!
    status: String!
    pickupDate: String
    deliveryDate: String
    rate: Float
    flagged: Boolean
    createdAt: String
    updatedAt: String
  }

  input ShipmentFilterInput {
    status: String
    carrierName: String
    flagged: Boolean
  }

  input PaginationInput {
    page: Int = 1
    limit: Int = 10
  }

  input SortInput {
    field: String = "createdAt"
    order: Int = -1
  }

  extend type Query {
    health: String
    shipments(
      filter: ShipmentFilterInput
      pagination: PaginationInput
      sort: SortInput
    ): [Shipment!]!

    shipment(id: ID!): Shipment
  }

  type Mutation {
    addShipment(
      shipperName: String!
      carrierName: String!
      pickupLocation: String!
      deliveryLocation: String!
      pickupDate: String!
      deliveryDate: String!
      rate: Float
    ): Shipment

    updateShipment(
      id: ID!
      carrierName: String
      pickupLocation: String
      deliveryLocation: String
      pickupDate: String
      deliveryDate: String
      status: String
      rate: Float
    ): Shipment

    deleteShipment(id: ID!): Boolean

    flagShipment(id: ID!, flagged: Boolean!): Shipment
  }
`;
