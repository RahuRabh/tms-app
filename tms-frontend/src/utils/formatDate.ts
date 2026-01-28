 const formatDate = (timestamp: string) => {
    if (!timestamp) return "N/A";
    return new Date(parseInt(timestamp)).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

export default formatDate  