import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { defaultValues } from "../Data/configPricingData";

const ConfigPricing = () => {
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
          {defaultValues.length &&
            defaultValues.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <span className="d-flex align-items-center justify-content-between">
                      <span>{el.gameCollection}</span>
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
