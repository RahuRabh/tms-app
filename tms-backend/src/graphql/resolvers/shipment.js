const Shipment = require("../../models/shipments");
const { requireAuth, requireRole } = require("../../middleware/auth");

module.exports = {
  Query: {
    shipments: async (_, { filter, pagination, sort }) => {
      const query = {};

      // Filtering
      if (filter?.status) query.status = filter.status;
      if (filter?.carrierName) query.carrierName = filter.carrierName;
      if (filter?.flagged !== undefined) query.flagged = filter.flagged;

      // Pagination
      const page = pagination?.page || 1;
      const limit = pagination?.limit || 10;
      const skip = (page - 1) * limit;

      // Sorting
      const sortOptions = {};
      if (sort?.field) {
        sortOptions[sort.field] = sort.order || -1;
      } else {
        sortOptions.createdAt = -1;
      }

      const [shipments, totalCount] = await Promise.all([
        Shipment.find(query).sort(sortOptions).skip(skip).limit(limit),
        Shipment.countDocuments(query),
      ]);

      return {
        shipments,
        totalCount,
      };
    },

    shipment: async (_, { id }) => {
      const shipment = await Shipment.findById(id);
      if (!shipment) {
        throw new Error(`Shipment with id ${id} not found`);
      }
      return shipment;
    },
  },

  Mutation: {
    addShipment: async (_, args, { user }) => {
      requireRole(user, "admin");
      return Shipment.create(args);
    },

    updateShipment: async (_, { id, ...updates }, { user }) => {
      requireRole(user, "admin");
      return Shipment.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteShipment: async (_, { id }, { user }) => {
      requireRole(user, "admin");
      await Shipment.findByIdAndDelete(id);
      return true;
    },

    flagShipment: async (_, { id, flagged }, { user }) => {
      requireAuth(user);
      return Shipment.findByIdAndUpdate(id, { flagged }, { new: true });
    },
  },
};
