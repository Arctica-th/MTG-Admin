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
import React from "react";
import { BsSearch } from "react-icons/bs";
import { convertCurrency } from "../Services/Func";

const CustomPrice = () => {
  const defaultValues = [
    {
      cardName: "Frieza, Universe 7 Combination",
      gameCollection: "Dragon Ball Super Card Game",
      edition: "Realm of the Gods",
      scryfallPrice: 2000,
      price: {
        nm: 2750,
        ex: 1750,
        foil_nm: 1250,
        foil_ex: 1000,
      },
      admin: "Kristin Watson",
    },
    {
      cardName: "Realm of the Gods - Black Kamehameha",
      gameCollection: "Dragon Ball Super Card Game",
      edition: "Realm of the Gods",
      scryfallPrice: 3500,
      price: {
        nm: 2750,
        ex: 1750,
        foil_nm: 1250,
        foil_ex: 1000,
      },
      admin: "Kristin Watson",
    },
  ];

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
          {defaultValues.length &&
            defaultValues.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el.cardName}</td>
                  <td>{el.gameCollection}</td>
                  <td>{convertCurrency(el.scryfallPrice)}</td>
                  <td>{convertCurrency(el.price.nm)}</td>
                  <td>{convertCurrency(el.price.ex)}</td>
                  <td>{convertCurrency(el.price.foil_nm)}</td>
                  <td>{convertCurrency(el.price.foil_ex)}</td>
                  <td>{el.admin}</td>
                  <td>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Button
                        variant="contained"
                        sx={{ background: "#5581B3" }}
                      >
                        Approve
                      </Button>
                      <Button variant="outlined" color="error">
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
