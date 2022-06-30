import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import AdvSearchComponent from "../Components/AdvSearchComponent";
import { useForm } from "react-hook-form";
import { addNewCard } from "../Services/cardCrud";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const AdvSearchCreate = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const hooksForm = useForm();
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = hooksForm;

  const onHandleCreate = () => {
    const { name, price, detail, rarity } = getValues();
    const data = {
      gameEdition: "62622eded4b22aa0d995e0e2",
      name,
      detail,
      price,
      cardSerial: 161421,
      img: "https://c1.scryfall.com/file/scryfall-cards/png/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.png?1628801678",
      optionalDetail: {
        rarity,
        variation: false,
        set_name: "Masters 25",
        produced_mana: "B",
        'color_identity"': "B",
        colors: "B",
        mana_cost: "{B}",
        type_line: "Instant",
        layout: "normal",
      },
    };

    addNewCard(data)
      .then((res) => {
        console.log(res.data.data);
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        history.push("/advancesearch");
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div>
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn-secondary" onClick={onHandleCreate}>
            create
          </button>
        </div>
      </div>
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchCreate;
