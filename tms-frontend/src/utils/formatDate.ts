 const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    return new Date(parseInt(timestamp)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

const formatDateInput = (timestamp: string) => {
  if (!timestamp) return "";
  const date = new Date(parseInt(timestamp));
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
}

export default formatDateInput; formatDate;