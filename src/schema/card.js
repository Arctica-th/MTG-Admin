import * as yup from "yup";

const validationSchema = yup.object().shape({
  cardSerial: yup.string().required("ID of TCG is required"),
  gameMaster: yup.string().required("Game Collection is required"),
  gameEdition: yup.string().required("Edition Collection is required"),
  name: yup.string().required("Name is required"),
  detail: yup.string().required("Product Detail is required"),
  rarity: yup.string().required("Rarity is required"),
  color: yup.array().min(1, "At least one color must be selected"),
  img: yup.string().required("Image is required"),
  // priceType: yup.string().required("Price Type is required"),
  price: yup.object().shape({
    normal: yup.object().shape({
      nm: yup.number().required("NM Price is required"),
      ex: yup.number().required("EX Price is required"),
      foil_nm: yup.number().required("Foil_NM Price is required"),
      foil_ex: yup.number().required("Foil_EX Price is required"),
    }),
    // custom: yup.object().shape({
    //   nm: yup.number().required("Custom NM Price is required"),
    //   ex: yup.number().required("Custom EX Price is required"),
    //   foil_nm: yup.number().required("Custom Foil_NM Price is required"),
    //   foil_ex: yup.number().required("Custom Foil_EX Price is required"),
    // }),
  }),

  checked: yup.object().shape({
    normal: yup.object().shape({
      nm: yup.boolean(),
      ex: yup.boolean(),
      foil_nm: yup.boolean(),
      foil_ex: yup.boolean(),
    }),

    // custom: yup.object().shape({
    //   nm: yup.number().required("Custom NM Stock is required"),
    //   ex: yup.number().required("Custom EX Stock is required"),
    //   foil_nm: yup.number().required("Custom Foil_NM Stock is required"),
    //   foil_ex: yup.number().required("Custom Foil_EX Stock is required"),
    // }),
  }),

  stock: yup.object().shape({
    normal: yup.object().shape({
      nm: yup
        .mixed()
        .test("stock-validation", "Invalid stock value", function (value) {
          const isChecked = !!this?.from[2]?.value?.checked?.normal?.nm;

          if (isChecked) {
            return value !== undefined && !isNaN(value) && value > 0;
          }

          return true;
        }),
      ex: yup
        .mixed()
        .test("stock-validation", "Invalid stock value", function (value) {
          const isChecked = !!this?.from[2]?.value?.checked?.normal?.ex;

          if (isChecked) {
            return value !== undefined && !isNaN(value) && value > 0;
          }

          return true;
        }),
      foil_nm: yup
        .mixed()
        .test("stock-validation", "Invalid stock value", function (value) {
          const isChecked = !!this?.from[2]?.value?.checked?.normal?.foil_nm;

          if (isChecked) {
            return value !== undefined && !isNaN(value) && value > 0;
          }

          return true;
        }),
      foil_ex: yup
        .mixed()
        .test("stock-validation", "Invalid stock value", function (value) {
          const isChecked = !!this?.from[2]?.value?.checked?.normal?.foil_ex;

          if (isChecked) {
            return value !== undefined && !isNaN(value) && value > 0;
          }

          return true;
        }),
    }),
  }),
  // visibility: yup.string().required("Visibility is required"),
  // package: yup.string().required("Special Foil is required"),
});

export default validationSchema;
