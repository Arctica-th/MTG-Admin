import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import AdvSearchComponent from "../Components/AdvSearchComponent";
import { useForm } from "react-hook-form";
import { addNewCard } from "../Services/cardCrud";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const AdvSearchCreate = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

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
    const values = getValues();
    const { name, detail, rarity, gameEdition, cardSerial } = values;
    const watchData = watch();

    console.log({ watchData });

    // const data = {
    //   ...values,

    //   gameEdition: "62622eded4b22aa0d995e0e2",
    //   name,
    //   detail,
    //   price,
    //   cardSerial: 161421,
    //   img: "https://c1.scryfall.com/file/scryfall-cards/png/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.png?1628801678",
    //   optionalDetail: [
    //     {
    //       rarity,
    //       variation: false,
    //       set_name: "Masters 25",
    //       produced_mana: "B",
    //       'color_identity"': "B",
    //       colors: "B",
    //       mana_cost: "{B}",
    //       type_line: "Instant",
    //       layout: "normal",
    //     },
    //   ],
    //   updateBy: "6301cfc40c0ef59f62cb27a6",
    // };

    const data2 = {
      optionalDetail: [
        {
          object: "card",
          released_at: "2021-03-19",
          layout: "normal",
          image_uris: {
            small:
              "https://cards.scryfall.io/small/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
            normal:
              "https://cards.scryfall.io/normal/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
            large:
              "https://cards.scryfall.io/large/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
            png: "https://cards.scryfall.io/png/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.png?1619396979",
            art_crop:
              "https://cards.scryfall.io/art_crop/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
            border_crop:
              "https://cards.scryfall.io/border_crop/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
          },
          mana_cost: "{5}{R}",
          cmc: 6,
          type_line: "Creature — Sliver",
          oracle_text: "All Sliver creatures have double strike.",
          power: "3",
          toughness: "3",
          colors: ["R"],
          color_identity: ["R"],
          games: ["paper", "mtgo"],
          foil: true,
          nonfoil: true,
          finishes: ["nonfoil", "foil"],
          oversized: false,
          variation: false,
          set: "tsr",
          set_name: "Time Spiral Remastered",
          set_type: "masters",
          collector_number: "164",
          digital: false,
          rarity,
          flavor_text:
            "\"A rift opened, and our arrows were abruptly stilled. To move was to push the world. But the sliver's claw still twitched, red wounds appeared in Thed's chest, and ribbons of blood hung in the air.\"\n—Adom Capashen, Benalish hero",
          preview: {
            source: "Luca Van Deun",
            source_uri:
              "https://twitter.com/LegenVD/status/1366803619190874114",
            previewed_at: "2021-03-02",
          },
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
        config: {
          nm: 30,
          nm_foil: 60,
          etched: 75,
          ex: 0.85,
          ex_foil: 0.35,
          common: 85,
          uncommon: 35,
          rare: 85,
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
      img: "https://cards.scryfall.io/png/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.png?1619396979",
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
      updateBy: "6301cfc40c0ef59f62cb27a6",
    };

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
      });
  };

  return (
    <div className="container-fluid py-4">
      <div className="h4 d-flex justify-content-between align-items-center">
        <div onClick={() => navigate("/advancesearch")} role="button">
          <BsChevronLeft /> Create
        </div>
        <div>
          <button className="btn btn--secondary " onClick={onHandleCreate}>
            Create
          </button>
        </div>
      </div>
      <AdvSearchComponent hooksForm={hooksForm} />
    </div>
  );
};

export default AdvSearchCreate;
