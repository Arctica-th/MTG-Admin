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
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";
import { removeProduct } from "../Services/cardCrud";

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
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);

  const [gameSelected, setGameSelected] = useState(null);
  const [editionSelected, setEditionSelected] = useState(null);

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

  const optionsVisibility = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const getCardProduct = () => {
    mtgApi.get(`/card/getAllByName/Card/20/20`).then((res) => {
      setResults(res.data.data);
    });
  };

  const getAllGame = () => {
    mtgApi
      .get(`/game/getAllByDate/1/20`)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setOptionGameCollection(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllEdition = () => {
    mtgApi
      .get(`/edition/getAllEdition/,/1/,`)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setOptionGameEditions(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditionSelected = (ev) => {
    setEditionSelected(ev);
    mtgApi
      .get(`/card/getAllCardByEdition/${ev.value}/1/20'`)
      .then((res) => {
        setResults(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleSearch = () => {
    const { name } = getValues();
    const data = {
      name: name,
    };
    mtgApi
      .post(`/card/advSearchEdition`, data)
      .then((res) => {
        setResults(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleSelectGame = () => {
    const data = {
      gameMaster: gameSelected.value,
    };

    mtgApi
      .post(`/card/productPage/{gameMaster}`, data)
      .then((res) => {
        setResults(res.data.data.card);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGame();
    getCardProduct();
    getAllEdition();
  }, []);

  useEffect(() => {
    if (gameSelected) {
      onHandleSelectGame();
    }
  }, [gameSelected]);

  const onDeleteClick = (item) => {
    setIsModalDeleteOpen(true);
    setItemSelected(item);
  };

  const onHandleDelete = () => {
    const { id } = itemSelected;

    removeProduct(id)
      .then((res) => {
        addToast(res.message ?? "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        addToast(err.message ?? "error", {
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
          <Select
            placeholder="Game Collection"
            options={optionGameCollection}
            onChange={(ev) => setGameSelected(ev)}
            value={gameSelected}
          />
        </div>
        <div className="col">
          <Select
            placeholder="Edition Collection"
            options={optionGameEditions}
            onChange={onEditionSelected}
            value={editionSelected}
          />
        </div>
        <div className="col">
          <Select placeholder="Visibility" options={optionsVisibility} />
        </div>
        <div className="col">
          <div className="d-flex justify-content-around">
            <div className="btn btn--secondary " onClick={onHandleSearch}>
              Search
            </div>
            <Link to={`${url}/create`} className="mx-2">
              <button className="btn btn--outline-secondary">New</button>
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
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <img
                    src={item.img ?? "/assets/images/logo-white.png"}
                    alt={item.name}
                    height="40px"
                    className="me-3"
                  />
                  <span>{item.name}</span>
                </td>
                <td>{item?.gameEdition?.name}</td>
                <td>{item.price.usd}</td>
                <td>
                  <Badge>{item.stock} in stock</Badge>
                </td>
                <td>
                  <Badge>Published</Badge>
                </td>
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

const Badge = styled.div`
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;

  width: 70px;
  height: 30px;

  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #57f000;
  border-radius: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;

  letter-spacing: 0.15px;

  color: #2ebf4f;
`;
