import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, Link } from "react-router-dom";
import AdvSearchCreate from "./AdvSearchCreate";
import { storeApi } from "../fakeApi/storeApi";
import AdvSearchEdit from "./AdvSearchEdit";
import {
  advanceSearchGame,
  deleteGameById,
  getAllEditionByGame,
  getGameCollectionByDate,
} from "../Services/Crud";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import ModalConfirm from "../Components/ModalConfirm";
import { mtgApi } from "../api/mtgAdmin";
import styled from "styled-components";
import { removeProduct } from "../Services/cardCrud";
import { GoSettings } from "react-icons/go";
import ModalView from "../Components/ModalView";
import AdjustComponent from "../Components/AdjustComponent";

const AdvanceSearch = () => {
  const { addToast } = useToasts();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const optionsVisibility = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const [results, setResults] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [isModalSettingOpen, setIsModalSettingOpen] = useState(false);

  const [itemSelected, setItemSelected] = useState(null);
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);

  const [gameSelected, setGameSelected] = useState(null);
  const [editionSelected, setEditionSelected] = useState(null);
  const [visibilitySelected, setVisibilitySelected] = useState(
    optionsVisibility[0]
  );

  const getAllGame = () => {
    getGameCollectionByDate()
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        setGameSelected(opt[0]);

        setOptionGameCollection(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllEdition = () => {
    getAllEditionByGame(gameSelected.value)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        const allValue = {
          label: "All",
          value: "",
        };

        setEditionSelected(allValue);
        setOptionGameEditions([allValue, ...opt]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEditionSelected = (ev) => {
    setEditionSelected(ev);
  };

  const onHandleSearch = () => {
    const { name } = getValues();
    const data = {
      name: name,
      gameEdition: editionSelected?.value,
      inStock: visibilitySelected?.value,
    };
    mtgApi
      .post(`/card/advSearchEdition/${gameSelected.value}?limit=50`, data)

      .then((res) => {
        console.log("adv", res);

        setResults(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHandleSelectGame = () => {
    mtgApi
      .get(`/card/productPage/${gameSelected.value}`)
      .then((res) => {
        setResults(res.data.data.card);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGame();
    // getCardProduct();
  }, []);

  useEffect(() => {
    if (gameSelected) {
      getAllEdition();
    }
  }, [gameSelected]);

  // useEffect(() => {
  //   if (gameSelected) {
  //     onHandleSelectGame();
  //   }
  // }, [gameSelected]);

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

  const onHandleSetting = (item) => {
    setIsModalSettingOpen(true);
    setItemSelected(item);
  };

  const displayForm = (
    <div className="row row-cols-5">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          {...register("name")}
        />
      </div>
      <div className="col">
        <Select
          placeholder="Game Collection"
          options={optionGameCollection}
          // defaultValue={optionGameCollection[0]}
          onChange={(ev) => setGameSelected(ev)}
          value={gameSelected}
        />
      </div>
      <div className="col">
        <Select
          placeholder="Edition Collection"
          options={optionGameEditions}
          // defaultValue={optionGameEditions[0]}
          onChange={onEditionSelected}
          value={editionSelected}
        />
      </div>
      <div className="col">
        <Select
          placeholder="Visibility"
          options={optionsVisibility}
          value={visibilitySelected}
          onChange={(ev) => setVisibilitySelected(ev)}
        />
      </div>

      <div className="col">
        <div className="d-flex justify-content-around">
          <div
            className="btn btn--secondary "
            type="submit"
            onClick={onHandleSearch}
          >
            Search
          </div>
          <Link to={`/advancesearch/create`} className="mx-2">
            <button className="btn btn--outline-secondary">New</button>
          </Link>
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
            <th scope="col" style={{ width: "200px" }}>
              NAME
            </th>
            <th scope="col" style={{ width: "200px" }}>
              GAME COLLECTION
            </th>
            <th scope="col">PRICE (NM)</th>
            <th scope="col">NM</th>
            <th scope="col">EX</th>
            <th scope="col">FOIL_NM</th>
            <th scope="col">FOIL_EX</th>
            <th scope="col">ADMIN</th>
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
                  <div className="d-flex flex-nowrap align-items-center">
                    <div>
                      <img
                        src={item.img ?? "/assets/images/logo-white.png"}
                        alt={item.name}
                        height="40px"
                        className="me-3"
                      />
                    </div>
                    <div>
                      <span className="limit-line-2 ">{item.name}</span>
                    </div>
                  </div>
                </td>
                <td>{item?.gameEdition?.name}</td>
                <td>{(item.price.nm ?? 0.0).toFixed(2)}</td>
                <td>{item.stock.nm}</td>
                <td>{item.stock.ex}</td>
                <td>{item.stock.foil_nm}</td>
                <td>{item.stock.foil_ex}</td>
                <td>Admin</td>
                <td>
                  <Badge>Published</Badge>
                </td>
                <td className="text-nowrap">
                  <Link to={`/advancesearch/${item._id}`} className="mx-2">
                    <span className="mx-1" type="button">
                      <img
                        src="/assets/images/icon/edit.png"
                        alt="edit"
                        width="16px"
                      />
                    </span>
                  </Link>

                  <span
                    className="mx-1"
                    type="button"
                    onClick={() => onHandleSetting(item)}
                  >
                    <GoSettings />
                  </span>

                  <span
                    className="mx-1"
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
      <div className="py-4 container">
        <div className="h4">Advance Search</div>
        <div>{displayForm}</div>
        <div>{results.length ? displayTable : ""}</div>
      </div>

      <ModalConfirm
        isOpen={isModalDelete}
        setIsOpen={setIsModalDeleteOpen}
        title="Delete"
        detail={`Are you sure you want to delete ?`}
        callbackFn={onHandleDelete}
      />

      <ModalView
        isOpen={isModalSettingOpen}
        setIsOpen={setIsModalSettingOpen}
        title="Adjust Quantity"
        styleMore={{ p: 0 }}
      >
        <AdjustComponent
          item={itemSelected}
          callBackFn={() => setIsModalSettingOpen(false)}
          callBackCancelFn={() => setIsModalSettingOpen(false)}
        />
      </ModalView>
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
