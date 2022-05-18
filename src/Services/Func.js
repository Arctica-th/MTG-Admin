export const convertDateToString = (value) => {
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(value);
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(value);
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(value);

  return `${da} ${mo} ${ye}`;
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
