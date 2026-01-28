const gql = require("graphql-tag");
const shipmentTypeDefs = require("./shipment");
const authTypeDefs = require("./auth");

const baseTypeDefs = gql`
  type Query {
    health: String
  }
`;

module.exports = [baseTypeDefs, shipmentTypeDefs, authTypeDefs];
