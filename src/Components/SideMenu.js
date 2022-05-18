import React from "react";
import { menuData } from "../Data/menuData";
import AccordionEl from "../Elements/AccordionEl";

const SideMenu = () => {
  return (
    <div className="bg-white h-100">
      {menuData.map((item, index) => {
        return <AccordionEl menuObject={item} />;
      })}
    </div>
  );
};

export default SideMenu;
