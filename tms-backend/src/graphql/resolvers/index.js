const shipmentResolvers = require("./shipment");
const authResolvers = require("./auth");

module.exports = {
  Query: {
    ...shipmentResolvers.Query,
    health: () => "TMS GraphQL API is running",
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...shipmentResolvers.Mutation,
  },
};
