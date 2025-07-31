export const formatToDayMonthYear = (date) => {
  const dateobject = new Date(date);
  const day = dateobject.getDate();
  const month = dateobject.getMonth() + 1;
  const year = dateobject.getFullYear();
  return `${day}/${month}/${year}`;
};
