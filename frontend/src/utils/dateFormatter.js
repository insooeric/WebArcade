const dateFormatter = (date) => {
  let result = "";
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  result = `${year} ${month} ${day}`;

  return result;
};

export { dateFormatter };
