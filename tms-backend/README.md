# Backend – UltraShip GraphQL API

Scalable Node.js API designed for high-concurrency logistics data.

## ⚙️ Performance Optimizations
- **Parallel Queries:** Uses `Promise.all` to fetch data and `totalCount` simultaneously.
- **Dynamic Queries:** Robust Mongoose query building for filtering and sorting.
- **RBAC Middleware:** Granular role checks (`admin` vs `employee`) at the resolver level.
- **Lean Payloads:** Efficient document updates using `{ new: true }` in Mongoose.

## 📖 Schema Design
- **Connection Pattern:** Returns `ShipmentConnection` for advanced pagination.
- **Input Objects:** Clean variable management for Filters and Pagination.
- **Custom Resolvers:** Dedicated logic for flagging and lifecycle management.