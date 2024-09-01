function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th'; // Handles 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDate(isoString) {
  const date = new Date(isoString);

  // Extract day, month, year, and time components
  const day = date.getDate();
  const month = date.toLocaleString('en-US', {month: 'short'});
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // Add the ordinal suffix to the day
  const dayWithSuffix = day + getOrdinalSuffix(day);

  return `${dayWithSuffix} ${month} ${year} ${time}`;
}
