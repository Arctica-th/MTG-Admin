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
import { advanceSearchGame, deleteGameById } from "../Services/Crud";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import ModalConfirm from "../Components/ModalConfirm";
import { getAllCardByName } from "../Services/cardCrud";

const AdvanceSearch = () => {
  const { addToast } = useToasts();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [results, setResults] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

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

  const onHandleSearch = () => {
    const { name } = getValues();

    getAllCardByName(name)
      .then((res) => {
        console.log(res);
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

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = () => {
    const { id } = itemSelected;

    deleteGameById(id)
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

  const displayForm = (
    <form>
      <div className="row row-cols-5">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("name", { value: "Dark Ritual" })}
          />
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
            <div className="btn btn-secondary" onClick={onHandleSearch}>
              Search
            </div>
            <Link to={`${url}/create`} className="mx-2">
              <button className="btn btn-outline-secondary">New</button>
            </Link>
          </div>
        </div>
      </div>
    </form>
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
          {results?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-start">
                  <div style={styles.tableEl}>
                    <img
                      src={item.img ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item?.name}</span>
                  </div>
                </td>
                <td className="text-start">
                  <div style={styles.tableEl}>
                    <img
                      src={item.img ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    />
                    <span>{item?.description}</span>
                  </div>
                </td>
                <td className="text-center">{item?.price}</td>
                <td className="text-center">{item?.stock}</td>
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
            <div className="h4">Advance Search</div>
            <div>{displayForm}</div>
            <div>{results.length ? displayTable : ""}</div>
          </div>
        </Route>
        <Route path={`${path}/create`}>
          <AdvSearchCreate />
        </Route>
        <Route path={`${path}/edit/:advId`}>
          <AdvSearchEdit />
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

export default AdvanceSearch;
