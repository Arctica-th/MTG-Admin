import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BsChevronRight } from "react-icons/bs";
import CustomerDetail from "./CustomerDetail";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const Customer = () => {
  const [results, setResults] = useState([]);
  let { path, url } = useRouteMatch();

  const fetchCustomer = (limit) => {
    axios
      .get(`https://randomuser.me/api/?results=${limit}`)
      .then((res) => {
        setResults(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCustomer(5);
  }, []);

  const displayForm = (
    <div>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="Name" />
        </div>

        <div className="col-auto">
          <button className="btn btn--secondary ">Search</button>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item, index) => {
            return (
              <tr>
                <td className="text-center">{index + 1}</td>
                <td>
                  <span>
                    <img
                      src={item.picture.thumbnail}
                      width="25px"
                      className="rounded-circle me-3"
                    />
                    <span>
                      {item.name.first} {item.name.last}
                    </span>
                  </span>
                </td>
                <td>{item.email}</td>
                <td>
                  {item.location.city} {item.location.country}
                </td>
                <td>
                  <Link to={`${url}/${item.login.uuid}`}>
                    <BsChevronRight />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <Switch>
      <Route exact path={path}>
        <div className="py-4 container">
          <div className="h4">Customer</div>
          <div>{displayForm}</div>
          <div>{displayTable}</div>
        </div>
      </Route>
      <Route path={`${path}/:customerId`}>
        <CustomerDetail />
      </Route>
    </Switch>
  );
};

export default Customer;
