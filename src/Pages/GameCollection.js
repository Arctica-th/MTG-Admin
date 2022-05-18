import React, { useState, useEffect } from "react";
import Select from "react-select";
import { storeApi } from "../fakeApi/storeApi";
import { convertDateToString } from "../Services/Func";
import { FaChevronRight } from "react-icons/fa";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import GCollectionCreate from "./GCollectionCreate";
import GCollectionEdit from "./GCollectionEdit";

const GameCollection = () => {
  const [results, setResults] = useState([]);
  let { path, url } = useRouteMatch();

  const styles = {
    tableDescription: {
      maxWidth: "400px",
      height: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      lineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
  };

  const getProduct = async (limit) => {
    await storeApi.get(`/products?limit=${limit}`).then((res) => {
      setResults(res.data);
    });
  };

  useEffect(() => {
    getProduct(5);
  }, []);

  const displayForm = (
    <div>
      <div className="row row-cols-3">
        <div className="col">
          <input type="text" className="form-control" placeholder="Location" />
        </div>
        <div className="col">
          <Select placeholder="Status" />
        </div>
        <div className="col">
          <div className="d-flex justify-content-around">
            <button className="btn btn-secondary">Search</button>

            <Link to={`${url}/create`} className="mx-2">
              <button className="btn btn-outline-secondary">New</button>
            </Link>
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
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>EDITION</th>
            <th>VISIBILITY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item) => {
            return (
              <tr>
                <td className="text-center">{item.id}</td>
                <td className="text-start">
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td style={styles.tableDescription}>{item.description}</td>
                <td>{item.id}</td>
                <td>Published</td>
                <td>
                  <Link to={`${url}/edit/${item.id}`} className="mx-2">
                    <span className="mx-3" type="button">
                      <img
                        src="/assets/images/icon/edit.png"
                        alt="edit"
                        width="16px"
                      />
                    </span>
                  </Link>

                  <span className="mx-3" type="button">
                    <img
                      src="/assets/images/icon/bin.png"
                      alt="bin"
                      width="16px"
                    />
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
      <Switch>
        <Route exact path={path}>
          <div className="py-4 container">
            <div className="h4">Game Collection</div>
            <div>{displayForm}</div>
            <div>{displayTable}</div>
          </div>
        </Route>
        <Route path={`${path}/create`}>
          <GCollectionCreate />
        </Route>
        <Route path={`${path}/edit/:gcId`}>
          <GCollectionEdit />
        </Route>
      </Switch>
    </div>
  );
};

export default GameCollection;
