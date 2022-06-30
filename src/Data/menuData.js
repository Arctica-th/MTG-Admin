export const menuData = [
  {
    id: "menu_01",
    title: "Order List",
    iconUrl: "/assets/images/icon/order.svg",
    path: "/",
    list: [],
  },
  {
    id: "menu_02",
    title: "Product List",
    iconUrl: "/assets/images/icon/product.svg",
    list: [
      {
        label: "Game Collection",
        path: "/gamecollection",
      },
      {
        label: "Edition Collection",
        path: "/editioncollection",
      },
      {
        label: "Advance Search",
        path: "/advancesearch",
      },
      {
        label: "Seal",
        path: "/seal",
      },
      {
        label: "Accessory",
        path: "/accessory",
      },
    ],
  },
  // {
  //   id: "menu_03",
  //   title: "Master Data",
  //   iconUrl: "/assets/images/icon/master.svg",
  //   list: [
  //     {
  //       label: "Pickup location",
  //       path: "/pickuplocation",
  //     },
  //     {
  //       label: "Variations",
  //       path: "/variations",
  //     },
  //     {
  //       label: "Format",
  //       path: "/format",
  //     },
  //     {
  //       label: "Rarity",
  //       path: "/rarity",
  //     },
  //     {
  //       label: "Color",
  //       path: "/color",
  //     },
  //     {
  //       label: "Card Type",
  //       path: "/cardtype",
  //     },
  //     {
  //       label: "Card Condition",
  //       path: "/cardcondition",
  //     },
  //   ],
  // },
  {
    id: "menu_04",
    title: "Member Management",
    iconUrl: "/assets/images/icon/member.svg",
    list: [
      {
        label: "Admin",
        path: "/admin",
      },
      {
        label: "Customer",
        path: "/customer",
      },
    ],
  },
];
