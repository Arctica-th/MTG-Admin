import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import ECollectionComponent from "../Components/ECollectionComponent";

const ECollectionCreate = () => {
  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Create
      </div>
      <ECollectionComponent />
    </div>
  );
};

export default ECollectionCreate;
