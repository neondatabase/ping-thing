export const formatDate = (date) => {
  const time_stamp = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date_stamp = new Date(date).toLocaleString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${date_stamp} @${time_stamp}`;
};
