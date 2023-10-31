export function convertDateToISO(date: string) {
  const [day, month, year] = date.split("/");
  const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
  return isoDate;
}
