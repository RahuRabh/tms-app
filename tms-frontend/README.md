### 2️⃣ Frontend `README.md`

```md
# Frontend – UltraShip Dashboard

Modern React frontend utilizing the latest MUI standards and Apollo Client for state management.

## 🛠 Tech Highlights
- **MUI Theming:** Custom `createTheme` with Dark/Light mode toggle.
- **Responsive Layout:** Adaptive sidebar that transforms into a mobile drawer.
- **Performance:** Optimized re-renders using `useMemo` and smart `useEffect` hooks.
- **Data Flow:** Dynamic GraphQL variables for real-time filtering and sorting.

## 📦 Key Components
- **ShipmentsGrid:** Custom sortable table with `TableSortLabel`.
- **ShipmentsTile:** Responsive cards with interactive action menus.
- **ShipmentDetailsDrawer:** Side-panel with route visualization and status logic.
- **ShipmentFormDialog:** Single-source form handling both Add and Edit logic.