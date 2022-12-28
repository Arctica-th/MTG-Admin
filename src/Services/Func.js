export const convertDateToString = (value, type = "date") => {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(value);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(value);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(value);

  let ho = new Intl.DateTimeFormat("th", { hour: "2-digit" }).format(value);
  let mn = new Intl.DateTimeFormat("th", { minute: "2-digit" })
    .format(value)
    .padStart(2, "0");

  if (type === "date") {
    return `${da} ${mo} ${ye}`;
  } else if (type === "date-time") {
    return `${da} ${mo} ${ye} ${ho}:${mn}`;
  } else if (type === "time") {
    return `${ho}:${mn}`;
  }
};

export const convertCurrency = (number) => {
  const formatter = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  });

  return formatter.format(number);
};

export const readFileDataTo64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};
