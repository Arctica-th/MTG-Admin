import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AdvSearchCreate from "./AdvSearchCreate";
import { storeApi } from "../fakeApi/storeApi";
import AdvSearchEdit from "./AdvSearchEdit";

const AdvanceSearch = () => {
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
    tableEl: {
      display: "flex",
      maxWidth: "400px",
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
      <div className="row row-cols-5">
        <div className="col">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col">
          <Select placeholder="Game Collection" />
        </div>
        <div className="col">
          <Select placeholder="Edition Collection" />
        </div>
        <div className="col">
          <Select placeholder="Visibility" />
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
          {results?.map((item) => {
            return (
              <tr>
                <td className="text-center">{item.id}</td>
                <td className="text-start">
                  <div style={styles.tableEl}>
                    <img
                      src={item.image}
                      alt={item.title}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="text-start">
                  <div style={styles.tableEl}>
                    <img
                      src={item.image}
                      alt={item.title}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td className="text-center">{item.price}</td>
                <td className="text-center">{item.id}</td>
                <td>Published</td>
                <td className="text-nowrap">
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
            <div className="h4">Advance Search</div>
            <div>{displayForm}</div>
            <div>{displayTable}</div>
          </div>
        </Route>
        <Route path={`${path}/create`}>
          <AdvSearchCreate />
        </Route>
        <Route path={`${path}/edit/:advId`}>
          <AdvSearchEdit />
        </Route>
      </Switch>
    </div>
  );
};

export default AdvanceSearch;
