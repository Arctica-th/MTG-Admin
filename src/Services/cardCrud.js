import { mtgApi } from "../api/mtgAdmin";

export const addNewCard = async (data) => {
  //   const data = {
  //     gameEdition: "62622eded4b22aa0d995e0e2",
  //     name: "Dark Ritual",
  //     detail: "Add {B}{B}{B}.",
  //     price: 0.96,
  //     cardSerial: 161421,
  //     img: "https://c1.scryfall.com/file/scryfall-cards/png/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.png?1628801678",
  //     optionalDetail: {
  //       rarity: "common",
  //       variation: false,
  //       set_name: "Masters 25",
  //       produced_mana: "B",
  //       'color_identity"': "B",
  //       colors: "B",
  //       mana_cost: "{B}",
  //       type_line: "Instant",
  //       layout: "normal",
  //     },
  //   };

  const res = await mtgApi.post(`/card/addNewCard`, data);

  return res;
};

export const getAllCardByName = async (name) => {
  const res = await mtgApi.get(`/card/getAllByName/${name}/20/,`);

  return res;
};
