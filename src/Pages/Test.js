import React, { useEffect } from "react";
import { getListCardCreated } from "../Services/Crud";

const Test = () => {
  const getData = () => {
    getListCardCreated()
      .then((res) => {})
      .catch((err) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Test</div>;
};

export default Test;
