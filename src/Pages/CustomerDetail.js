import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import axios from "axios";

const CustomerDetail = () => {
  const history = useHistory();
  let { customerId } = useParams();
  const [results, setResults] = useState(null);

  const fetchCustomer = () => {
    axios
      .get(`https://randomuser.me/api/`)
      .then((res) => {
        setResults(res.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCustomer(5);
  }, []);

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>
        <div className="text-center">
          <div>
            <img
              src={results?.picture?.large}
              alt={results?.name?.first}
              width="120px"
              className="rounded-circle"
            />
          </div>
          <div>
            {results?.name?.first} {results?.name?.last}
          </div>
          <div>{results?.email}</div>
          <div>{results?.phone}</div>
        </div>
        <div>
          <div className="h6 my-3">Address</div>
          <div className="body-1">
            {results?.location?.city} {results?.location?.country}
          </div>
        </div>
        <div>
          <div className="h6 my-3">Billing Address</div>
          <div className="body-1">
            {results?.location?.city} {results?.location?.country}
          </div>
        </div>
      </div>
    </div>
  );

  const displayOrder = (
    <div>
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">ORDER ID</th>
            <th>DATE PURCHASED</th>
            <th>STATUS</th>
            <th>AMOUNT OF ITEMS</th>
            <th>TOTAL PRICE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">#500303154</td>
            <td>05 Mar 2022</td>
            <td>Pendding</td>
            <td>9 Items</td>
            <td>฿999,999,999.00</td>
          </tr>
          <tr>
            <td className="text-center">#500303154</td>
            <td>05 Mar 2022</td>
            <td>Pendding</td>
            <td>9 Items</td>
            <td>฿999,999,999.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <div
        className="h4 my-4"
        role="button"
        onClick={() => {
          history.push("/customer");
        }}
      >
        <BsChevronLeft /> Customer Detail
      </div>
      <div className="row my-3">
        <div className="col-4">{displayBasicInfo}</div>
        <div className="col-8">{displayOrder}</div>
      </div>
    </div>
  );
};

export default CustomerDetail;
