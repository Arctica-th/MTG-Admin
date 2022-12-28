import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  Button,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { getCustomPriceList, postApproveCustomPrice } from "../Services/Crud";
import { convertCurrency } from "../Services/Func";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { updateIsLoading } from "../redux/action/dataAction";

const CustomPrice = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [customPriceList, setCustomPriceList] = useState([]);

  const onHandleConfirm = (id, isApproved) => {
    dispatch(updateIsLoading(true));
    const data = {
      isApproved,
    };

    postApproveCustomPrice(id, data)
      .then((res) => {
        console.log(res);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);

        addToast(err.data.message || "something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  const getDataList = () => {
    dispatch(updateIsLoading(true));

    getCustomPriceList()
      .then((res) => {
        setCustomPriceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  useEffect(() => {
    getDataList();
  }, []);

  console.log({ customPriceList });

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>#</th>
            <th>CARD NAME</th>
            <th>GAME COLLECTION</th>
            <th>SCRYFALL PRICE</th>
            <th>NM</th>
            <th>EX</th>
            <th>FOIL_NM</th>
            <th>FOIL_EX</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!!customPriceList.length &&
            customPriceList.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.gameCollection}</td>
                  <td> N/A </td>
                  <td>{convertCurrency(el.nm)}</td>
                  <td>{convertCurrency(el.ex)}</td>
                  <td>{convertCurrency(el.foil_nm)}</td>
                  <td>{convertCurrency(el.foil_ex)}</td>
                  <td>{el.admin}</td>
                  <td>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Button
                        variant="contained"
                        sx={{ background: "#5581B3" }}
                        onClick={() => onHandleConfirm(el.id, true)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => onHandleConfirm(el.id, false)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container py-4">
      <Typography variant="h4">Custom Price Approve</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel id="game-collection-label">Game Collection</InputLabel>
            <Select
              labelId="game-collection-label"
              id="game-collection"
              label="Game Collection"
              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value="all">All</MenuItem>
              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel id="admin-label">Admin</InputLabel>
            <Select labelId="admin-label" id="admin-collection" label="Admin">
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2} textAlign="center">
          <Button
            variant="contained"
            sx={{ background: "#5581B3" }}
            size="large"
          >
            <BsSearch />
            Search
          </Button>
        </Grid>
      </Grid>

      {displayTable}
    </div>
  );
};

export default CustomPrice;
