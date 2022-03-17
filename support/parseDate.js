export const displayDate = (date) => {
  const d = new Date(date);
  return `${d.toLocaleString("default", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })} — ${d.toLocaleString("default", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  })}`;
};

export const parseDate = (value) => {
  const d = new Date(value);
  const dy = ("0" + d.getDate()).slice(-2);
  const m = ("0" + (d.getMonth() + 1)).slice(-2);
  const hr = ("0" + d.getHours()).slice(-2);
  const min = ("0" + d.getMinutes()).slice(-2);
  return `${d.getFullYear()}-${m}-${dy}T${hr}:${min}`;
};
