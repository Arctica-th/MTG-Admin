import { IoMdSettings } from "react-icons/io";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineCollection } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";

export const menuData = [
  {
    id: "menu_01",
    title: "Order List",
    iconUrl: "/assets/images/icon/order.svg",
    Icon: BiShoppingBag,
    path: "/",
    list: [],
  },
  {
    id: "menu_02",
    title: "Product List",
    Icon: HiOutlineCollection,
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
  {
    id: "menu_06",
    title: "Custom Price Approve",
    Icon: BsShieldCheck,

    path: "/custom-price",
    list: [],
  },
  {
    id: "menu_05",
    title: "Config Pricing",
    Icon: IoMdSettings,
    iconUrl: "/assets/images/icon/config.svg",
    path: "/config-pricing",
    list: [],
  },
  {
    id: "menu_04",
    Icon: FiUsers,
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
