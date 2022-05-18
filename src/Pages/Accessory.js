import React from "react";
import Select from "react-select";

const Accessory = () => {
  const displayForm = (
    <div>
      <div className="row row-cols-4">
        <div className="col">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col">
          <Select placeholder="Game Collection" />
        </div>

        <div className="col">
          <Select placeholder="Visibility" />
        </div>
        <div className="col">
          <div className="d-flex justify-content-around">
            <button className="btn btn-secondary">Search</button>
            <button className="btn btn-outline-secondary">New</button>
          </div>
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
            <th scope="col">NAME</th>
            <th scope="col">GAME COLLECTION</th>
            <th scope="col">PRICE</th>
            <th scope="col">STOCK</th>
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
            <td>Otto</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">Accessory</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
    </div>
  );
};

export default Accessory;
