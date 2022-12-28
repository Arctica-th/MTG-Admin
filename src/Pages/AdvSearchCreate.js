import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import AdvSearchComponent from "../Components/AdvSearchComponent";
import { useForm } from "react-hook-form";
import { addNewCard } from "../Services/cardCrud";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { updateIsLoading } from "../redux/action/dataAction";

const AdvSearchCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const profile = useSelector((state) => state.profileReducer.profile);
  const hooksForm = useForm();

  const {
    register,
    getValues,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = hooksForm;

  const onHandleCreate = () => {
    dispatch(updateIsLoading(true));

    const values = getValues();
    const { name, detail, rarity, gameEdition, cardSerial, img, color } =
      values;
    const watchData = watch();

    const data2 = {
      optionalDetail: [
        {
          object: "card",
          released_at: dayjs().format("YYYY-MM-DD"),
          // layout: "normal",
          colors: [color],
          color_identity: [color],
          // foil: true,
          // nonfoil: true,
          // finishes: ["nonfoil", "foil"],
          rarity,
        },
      ],
      name,
      detail,
      price: {
        scryfall: {
          usd: values.price.scryfall.usd,
          usd_foil: values.price.scryfall.usd_foil,
          usd_etched: values.price.scryfall.usd_etched,
          eur: values.price.scryfall.eur,
          eur_foil: values.price.scryfall.eur_foil,
          tix: values.price.scryfall.tix,
        },
        normal: {
          nm: values.price.normal.nm,
          ex: values.price.normal.ex,
          foil_nm: values.price.normal.foil_nm,
          foil_ex: values.price.normal.foil_ex,
          foil_etched: values.price.normal.foil_etched,
        },
      },
      cardSerial: cardSerial,
      img,
      gameEdition,
      stock: {
        normal: {
          nm: values.stock.normal.nm,
          ex: values.stock.normal.ex,
          foil_nm: values.stock.normal.foil_nm,
          foil_ex: values.stock.normal.foil_ex,
          foil_etched: values.stock.normal.foil_etched,
        },
      },
      updateBy: profile.id,
    };

    console.log({ data2 });

    addNewCard(data2)
      .then((res) => {
        console.log(res.data.data);
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });

        navigate("/advancesearch");
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/advancesearch")} role="button">
          <BsChevronLeft /> Create
        </div>
        <div>
          <button
            className="btn btn--secondary "
            onClick={onHandleCreate}
            disabled={!profile}
          >
            Create
          </button>
        </div>
      </div>
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchCreate;
