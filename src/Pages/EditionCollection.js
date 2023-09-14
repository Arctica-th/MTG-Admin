import React, { useState, useEffect } from "react";
import Select from "react-select";
import { storeApi } from "../fakeApi/storeApi";

import { Link } from "react-router-dom";
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
import {
  TextField,
  Select as MuiSelect,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditionCollection = () => {
  const { addToast } = useToasts();
  const [results, setResults] = useState([]);
  const [optionGameMaster, setOptionGameMaster] = useState([]);
  const [isModalDelete, setIsModalDeleteOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

  const {
    register,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const watchGameMaster = watch("gameMaster");

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
        const filter = res.data.data.filter((el) => {
          return el.gameMaster.id === watchGameMaster;
        });

        setResults(watchGameMaster ? filter : res.data.data);

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
          <TextField
            {...register("name")}
            fullWidth
            label="Name"
            size="small"
          />
        </div>
        <div className="col-3">
          {/* <Select placeholder="Game Collection" options={optionGameMaster} /> */}
          <FormControl fullWidth>
            <InputLabel id="gameMaster-select-label">
              Game Collection
            </InputLabel>
            <MuiSelect
              size="small"
              labelId="gameMaster-select-label"
              id="gameMaster-select"
              label="Game Collection"
              {...register("gameMaster")}
            >
              {!!optionGameMaster.length &&
                optionGameMaster.map((el) => {
                  return <MenuItem value={el.value}>{el.label}</MenuItem>;
                })}
            </MuiSelect>
          </FormControl>
        </div>
        <div className="col-3">
          <FormControl fullWidth disabled>
            <InputLabel id="gameMaster-select-label">Visibility</InputLabel>
            <MuiSelect
              size="small"
              labelId="gameMaster-select-label"
              id="gameMaster-select"
              label="Visibility"
              {...register("visibility")}
            >
              {!!optionGameMaster.length &&
                optionGameMaster.map((el) => {
                  return <MenuItem value={el.value}>{el.label}</MenuItem>;
                })}
            </MuiSelect>
          </FormControl>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-between">
            <button
              className="btn btn--secondary "
              onClick={onHandleSearchGame}
            >
              Search
            </button>
            <Link to={`/editioncollection/create`} className="mx-2">
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
                    {/* <img
                      src={item.imageURL ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    /> */}
                    <span>{item?.name}</span>
                  </div>
                </td>
                <td className="text-start">
                  <div className="d-flex">
                    {/* <img
                      src={item.imageURL ?? "/assets/images/logo-white.png"}
                      alt={item?.name}
                      height="40px"
                      className="me-3"
                    /> */}
                    <span>{item?.gameMaster?.name}</span>
                  </div>
                </td>
                <td>
                  <div style={styles.tableDescription}>
                    {item?.gameMaster?.description}
                  </div>
                </td>

                <td>Published</td>
                <td className="text-nowrap">
                  <Link
                    to={{
                      pathname: `/editioncollection/edit/${item.id}`,
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
      <div className="py-4 container">
        <div className="h4">Edition Collection</div>
        <div>{displayForm}</div>
        <div>{displayTable}</div>
      </div>

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
