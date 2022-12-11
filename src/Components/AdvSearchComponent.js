import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";
// import Select from "react-select";
import {
  getAllEditionByGame,
  getCardScryfall,
  getGameCollectionByDate,
  getTcgPlayerGameDetail,
} from "../Services/Crud";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const AdvSearchComponent = ({ hooksForm }) => {
  const { register, errors, reset, watch, setValue } = hooksForm;
  const [image64, setImage64] = useState(null);
  const [priceType, setPriceType] = useState("normal");
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);
  const [gameSelected, setGameSelected] = useState(null);
  const [editionSelected, setEditionSelected] = useState(null);
  const usdExchange = 36;
  const watchGameMaster = watch("gameMaster");

  const styles = {
    image64: {
      height: "336px",
      objectFit: "contain",
    },
  };

  const getAllGame = () => {
    getGameCollectionByDate()
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        // setGameSelected(opt[0]);
        setValue("gameMaster", opt[0].value);
        setOptionGameCollection(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllEdition = () => {
    getAllEditionByGame(watchGameMaster)
      .then((res) => {
        const opt = res.data.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });

        // setEditionSelected(allValue);
        setOptionGameEditions(opt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputImage = async (ev) => {
    const file = await ev.target.files[0];
    const img64 = await readFileDataTo64(file);

    setImage64(img64);
  };

  const onGetTcgGameDetail = () => {
    // const gameEdition = "62622eded4b22aa0d995e0e2";
    const gameEditionScryFall = "628a86af0971793aeec9df3b";

    const watchScryfallSearch = watch("cardSerial");

    getTcgPlayerGameDetail(watchScryfallSearch, gameEditionScryFall)
      .then((res) => {
        const { data } = res.data;

        const list = {
          ...data,
          name: data.name,
          detail: data.detail,
          gameEdition: data.gameEdition,
          rarity: data.optionalDetail[0]?.rarity,
          price: data.price,
          stock: data.stock,
          color: data.optionalDetail[0].colors[0],
        };
        reset(list);
        setImage64(data.img);
      })
      .catch((err) => {
        console.log(err);
      });

    // getCardScryfall(watchScryfallSearch, gameEditionScryFall).then((res) => {
    //   const { data } = res.data;
    //   console.log({ data });
    //   const list = {
    //     name: data.name,
    //     detail: data.detail,
    //     gameEdition: data.gameEdition,
    //     rarity: data.optionalDetail[0]?.rarity,
    //     price: data.price,
    //     stock: data.stock,
    //     color: data.optionalDetail[0].colors[0],
    //   };

    //   reset(list);
    //   setImage64(data.img);
    // });
  };

  useEffect(() => {
    getAllGame();
  }, []);
  // useEffect(() => {
  //   setValue("gameMaster", opt[0].value);
  // }, []);

  useEffect(() => {
    if (watchGameMaster) {
      getAllEdition();
    }
  }, [watchGameMaster]);

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextField
              label="ID of Scryfall"
              variant="outlined"
              {...register("cardSerial")}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <div className="btn btn--secondary " onClick={onGetTcgGameDetail}>
              Search Card for Scryfall
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <TextField
              label="Game Collection"
              variant="outlined"
              fullWidth
              {...register("gameMaster")}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}

            <FormControl fullWidth>
              <InputLabel id="game_collection">Game Collection</InputLabel>
              <Select
                labelId="game_collection"
                id="game_collection-select"
                {...register("gameMaster")}
                label="Game Collection"
              >
                {!!optionGameCollection.length &&
                  optionGameCollection.map((opt) => {
                    return <MenuItem value={opt.value}>{opt.label}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <TextField
              label="Edition Collection"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("gameEdition")}
            /> */}

            <FormControl fullWidth>
              <InputLabel id="game_edition">Edition Collection</InputLabel>
              <Select
                labelId="game_edition"
                id="edition_collection-select"
                {...register("gameEdition")}
                label="Edition Collection"
              >
                {!!optionGameEditions.length &&
                  optionGameEditions.map((opt) => {
                    return <MenuItem value={opt.value}>{opt.label}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              {...register("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product Detail"
              variant="outlined"
              fullWidth
              disabled
              multiline
              minRows={3}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("detail")}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              label="Variations"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("variation")}
            />
          </Grid> */}
          {/* <Grid item xs={12}>
            <TextField
              label="Format"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("format")}
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              label="Rarity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("rarity")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Color"
              variant="outlined"
              fullWidth
              {...register("color")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const displayPricingNormal = (
    <Box>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="NM" />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.nm"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              keyName="stock.normal.nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="EX" />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.ex"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              keyName="stock.normal.ex"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Foil_NM"
          />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.foil_nm"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              keyName="stock.normal.foil_nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Foil_EX"
          />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.foil_ex"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              keyName="stock.normal.foil_ex"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
    </Box>
  );

  const displayPricingCustom = (
    <Box>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="NM" />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.nm"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              label="Add new stock quantity"
              keyName="stock.nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="EX" />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.ex"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              label="Add new stock quantity"
              keyName="stock.ex"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Foil_NM"
          />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.foil_nm"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              label="Add new stock quantity"
              keyName="stock.foil_nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Foil_EX"
          />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.foil_ex"
              rate="1.00"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              label="Add new stock quantity"
              keyName="stock.foil_ex"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
    </Box>
  );

  const displayPricing = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Pricing</div>

        <FormControl>
          <RadioGroup
            row
            onChange={(ev) => setPriceType(ev.target.value)}
            value={priceType}
          >
            <FormControlLabel
              value="normal"
              control={<Radio />}
              label="Normal Pricing (USD)"
              sx={{ marginRight: "60px" }}
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom Pricing (THB)"
            />
          </RadioGroup>
        </FormControl>

        {priceType === "normal" ? displayPricingNormal : displayPricingCustom}
      </div>
    </div>
  );

  const displayImage = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Image</div>
        <div className="text-center my-3">
          {image64 && <img src={image64} alt="slip" style={styles.image64} />}
        </div>
        <div>
          <label className="label-upload">
            + Upload Image
            <input
              className=""
              type="file"
              accept="image/*"
              id="input-file"
              onChange={onInputImage}
            />
          </label>
        </div>
      </div>
    </div>
  );

  const displayInventory = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Inventory</div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="SKU"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Stock quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("stock")}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const displayVisibility = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Visibility</div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility-radio"
              defaultChecked
            />
            <label className="form-check-label">Published</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="visibility-radio"
            />
            <label className="form-check-label">Hidden</label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-9">
        <div className="mb-2">{displayBasicInfo}</div>
        <div className="my-2">{displayPricing}</div>
        {/* <div className="my-2">{displayInventory}</div> */}
        <div className="my-2">{displayImage}</div>
      </div>
      <div className="col-3">
        <div className="mb-2">{displayVisibility}</div>
      </div>
    </div>
  );
};

export default AdvSearchComponent;

const PriceComponent = ({ keyName, rate, usdExchange, hooksForm }) => {
  const { register, watch } = hooksForm;
  const watchPrice = (+watch(keyName) ?? 0.0).toFixed(2);

  return (
    <>
      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        {...register(keyName)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Stack spacing={1} mt={2}>
        <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
          Summary
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            NM Price (USD)
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            {watchPrice} $
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            (Price x Rate USD/THB) * {rate}
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            ({watchPrice} x {usdExchange}) * {rate}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="500" color="#28A745">
            Total Price
          </Typography>
          <Typography fontWeight="500" color="#28A745">
            {watchPrice} THB
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

const StockComponent = ({
  label = "Quantity",
  keyName,
  hooksForm,
  remaining = 0,
}) => {
  const { register, watch } = hooksForm;

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        {...register(keyName)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Stack spacing={1} mt={2}>
        <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
          Summary
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            Latest of stock
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            {watch(keyName) ?? 0}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            Remaining Stock
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            {remaining}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="500" color="#28A745">
            Total Stock
          </Typography>
          <Typography fontWeight="500" color="#28A745">
            {+(watch(keyName) ?? 0) + 0}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
