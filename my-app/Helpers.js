export function formatDateTime(date) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
