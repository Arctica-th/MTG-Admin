import React, { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { defaultValues } from "../Data/configPricingData";
import { getGameMaster } from "../Services/Crud";

const ConfigPricing = () => {
  const [gameList, setGameList] = useState([]);

  const getData = () => {
    console.log("22");
    getGameMaster()
      .then((res) => {
        setGameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>#</th>
            <th>Game collection</th>
          </tr>
        </thead>
        <tbody>
          {gameList.length &&
            gameList.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="d-flex align-items-center justify-content-between">
                      <span>{el.name}</span>
                      <Link to={`/config-pricing/${el.id}`}>
                        <BsChevronRight size="1.2rem" color="black" />
                      </Link>
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div className="py-4 container">
        <div className="h4">Config Pricing</div>
        <div className="mb-4">
          All lists are for the setting goods price of the game collection.
        </div>
        {displayTable}
      </div>
    </div>
  );
};

export default ConfigPricing;
