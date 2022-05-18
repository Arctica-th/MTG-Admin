import React from "react";
import { useParams } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import GCollectionEl from "../Components/GCollectionEl";

const GCollectionEdit = () => {
  let { gcId } = useParams();

  return (
    <div className="container-fluid py-4">
      <div className="h4">
        <BsChevronLeft /> Edit
      </div>
      <GCollectionEl />
    </div>
  );
};

export default GCollectionEdit;
