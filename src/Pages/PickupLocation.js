import React from "react";
import Select from "react-select";

const PickupLocation = () => {
  const displayForm = (
    <div>
      <div className="row">
        <div className="col-4">
          <input type="text" className="form-control" placeholder="Location" />
        </div>
        <div className="col-4">
          <Select placeholder="Status" />
        </div>
        <div className="col-2">
          <button className="btn btn--secondary ">Search</button>
        </div>
        <div className="col-2">
          <button className="btn btn--outline-secondary">New</button>
        </div>
      </div>
    </div>
  );
  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">LOCATION</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">TIME</th>
            <th scope="col">VISIBILITY</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
            <td>Otto</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">Pickup location</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
    </div>
  );
};

export default PickupLocation;
