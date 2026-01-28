const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return { color: "success" as const, label: "Delivered" };
    case "intransit":
      return { color: "info" as const, label: "In Transit" };
    case "pending":
      return { color: "warning" as const, label: "Pending" };
    case "cancelled":
      return { color: "error" as const, label: "Cancelled" };
    default:
      return { color: "default" as const, label: status };
  }
};


export default getStatusStyles;