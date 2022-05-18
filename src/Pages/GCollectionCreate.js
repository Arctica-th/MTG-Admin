import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import GCollectionEl from "../Components/GCollectionEl";

const GCollectionCreate = () => {
  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Create
      </div>
      <GCollectionEl />
    </div>
  );
};

export default GCollectionCreate;
