import React, { useState, useEffect } from "react";
import Select from "react-select";
import { storeApi } from "../fakeApi/storeApi";

import {
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import ECollectionCreate from "./ECollectionCreate";
import ECollectionEdit from "./ECollectionEdit";
import {
  deleteEditionCollection,
  deleteGameById,
  getGameCollectionByDate,
  searchGameEdition,
} from "../Services/Crud";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import ModalConfirm from "../Components/ModalConfirm";

const EditionCollection = () => {
  const { addToast } = useToasts();
  const [results, setResults] = useState([]);
  const [optionGameMaster, setOptionGameMaster] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  let { path, url } = useRouteMatch();

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm();

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

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = () => {
    const { id } = itemSelected;

    deleteEditionCollection(id)
      .then((res) => {
        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        setIsModalDeleteOpen(false);
      });
  };

  const getOptionGameMaster = () => {
    getGameCollectionByDate()
      .then((res) => {
        const list = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });

        setOptionGameMaster(list);
      })
      .catch((err) => {
        // addToast(err.message || "error", {
        //   appearance: "error",
        //   autoDismiss: true,
        // });
      });
  };

  const onHandleSearchGame = async () => {
    const { name } = getValues();
    searchGameEdition(name)
      .then((res) => {
        setResults(res.data.data);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  useEffect(() => {
    getOptionGameMaster();
  }, []);

  const displayForm = (
    <div>
      <div className="row">
        <div className="col-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            defaultValue="Flighty"
            {...register("name")}
          />
        </div>
        <div className="col-3">
          <Select placeholder="Game Collection" options={optionGameMaster} />
        </div>
        <div className="col-3">
          <Select placeholder="Visibility" />
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-between">
            <button
              className="btn btn--secondary "
              onClick={onHandleSearchGame}
            >
              Search
            </button>
            <Link to={`${url}/create`} className="mx-2">
              <button className="btn btn--outline-secondary">New</button>
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
            <th>GAME COLLECTION</th>
            <th>DESCRIPTION</th>
            <th>VISIBILITY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-start">
                  <div className="d-flex">
                    <img
                      src={item.imageURL ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item?.name}</span>
                  </div>
                </td>
                <td className="text-start">
                  <div className="d-flex">
                    <img
                      src={item.imageURL ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item?.name}</span>
                  </div>
                </td>
                <td>
                  <div style={styles.tableDescription}>{item.description}</div>
                </td>

                <td>Published</td>
                <td className="text-nowrap">
                  <Link
                    to={{
                      pathname: `${url}/edit/${item.id}`,
                      state: { editionSelected: item },
                    }}
                    className="mx-2"
                  >
                    <span className="mx-3" type="button">
                      <img
                        src="/assets/images/icon/edit.png"
                        alt="edit"
                        width="16px"
                      />
                    </span>
                  </Link>

                  <span
                    className="mx-3"
                    type="button"
                    onClick={() => onDeleteClick(item)}
                  >
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
            <div className="h4">Edition Collection</div>
            <div>{displayForm}</div>
            <div>{displayTable}</div>
          </div>
        </Route>
        <Route path={`${path}/create`}>
          <ECollectionCreate optionGameMaster={optionGameMaster} />
        </Route>
        <Route path={`${path}/edit/:ecId`}>
          <ECollectionEdit optionGameMaster={optionGameMaster} />
        </Route>
      </Switch>
      <ModalConfirm
        isOpen={isModalDelete}
        setIsOpen={setIsModalDeleteOpen}
        title="Delete"
        detail={`Are you sure you want to delete ?`}
        callbackFn={onHandleDelete}
      />
    </div>
  );
};

export default EditionCollection;
