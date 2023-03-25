import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";
import Select from "react-select";
import SelectComponent from "../Components/SelectComponent";
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
  Select as MuiSelect,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { colors } from "../Data/colorData";
import { useDispatch } from "react-redux";
import { updateIsLoading } from "../redux/action/dataAction";
import { useToasts } from "react-toast-notifications";
import { values } from "lodash";

const AdvSearchComponent = ({ hooksForm }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const gameMasterTemp = "62893b464048140c7019367b";
  const { register, errors, reset, watch, setValue, control } = hooksForm;
  const [image64, setImage64] = useState(null);
  const [cardDetail, setCardDetail] = useState(null);
  const [priceType, setPriceType] = useState("normal");
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);
  const [gameSelected, setGameSelected] = useState(null);
  const [editionSelected, setEditionSelected] = useState(null);
  const [priceTypeChecked, setPriceTypeChecked] = useState(["nm"]);
  const usdExchange = 36;
  const watchGameMaster = watch("gameMaster");
  const styles = {
    image64: {
      height: "336px",
      objectFit: "contain",
    },
  };

  console.log("watch", watch("color"));

  const onPriceTypeCheck = (type) => {
    console.log({ type });
    if (priceTypeChecked.indexOf(type) !== -1) {
      const newValue = priceTypeChecked.filter((t) => t !== type);
      setPriceTypeChecked(newValue);
    } else {
      setPriceTypeChecked((value) => [...value, type]);
    }
  };

  const getGameMaster = () => {
    getGameCollectionByDate()
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
    getAllEditionByGame(watchGameMaster)
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

  const onInputImage = async (ev) => {
    const file = await ev.target.files[0];
    const img64 = await readFileDataTo64(file);

    setImage64(img64);
    setValue("img", img64);
  };

  const onGetTcgGameDetail = () => {
    const watchScryfallSearch = watch("cardSerial");

    dispatch(updateIsLoading(true));

    getTcgPlayerGameDetail(watchScryfallSearch)
      .then((res) => {
        console.log({ res });
        const { data } = res.data;
        setCardDetail(data);

        const list = {
          ...data,
          name: data.name,
          detail: data.detail,
          gameEdition: data.gameEdition.id,
          rarity: data.optionalDetail.rarity,
          price: data.price,
          gameMaster: gameMasterTemp,
          stock: data.stock,
          color: data.optionalDetail.colors,
        };
        reset(list);

        setImage64(data.img);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        console.log(err);

        addToast(err.message || "error", {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  useEffect(() => {
    getGameMaster();
  }, []);

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
              label="ID of TCG"
              variant="outlined"
              {...register("cardSerial")}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* <Select components={{ Control: SelectComponent }} placeholder="" /> */}
          </Grid>
          <Grid item xs={4}>
            <button
              className="btn btn--secondary "
              onClick={onGetTcgGameDetail}
              disabled={!!!watch("cardSerial") || !optionGameCollection.length}
            >
              Search Card for Scryfall
            </button>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Controller
              rules={{ required: true }}
              name="gameMaster"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  components={{ Control: SelectComponent }}
                  options={optionGameCollection}
                  className="w-100"
                  placeholder=""
                />
              )}
            /> */}

            <FormControl fullWidth>
              <InputLabel id="game_collection">Game Collection</InputLabel>

              <Controller
                control={control}
                name="gameMaster"
                defaultValue=""
                render={({ field }) => {
                  return (
                    <MuiSelect {...field} label="Game Collection">
                      {!!optionGameCollection.length &&
                        [...optionGameCollection].map((opt, index) => {
                          return (
                            <MenuItem value={opt.value} key={index}>
                              {opt.label}
                            </MenuItem>
                          );
                        })}
                    </MuiSelect>
                  );
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="game_edition">Edition Collection</InputLabel>

              <Controller
                control={control}
                name="gameEdition"
                defaultValue=""
                render={({ field }) => {
                  return (
                    <MuiSelect {...field} label="Edition Collection">
                      {!!optionGameEditions.length &&
                        optionGameEditions.map((opt, index) => {
                          return (
                            <MenuItem value={opt.value} key={index}>
                              {opt.label}
                            </MenuItem>
                          );
                        })}
                    </MuiSelect>
                  );
                }}
              />
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

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="rarity">Rarity</InputLabel>
              <Controller
                control={control}
                name="rarity"
                defaultValue=""
                render={({ field }) => {
                  return (
                    <MuiSelect {...field} label="Rarity">
                      <MenuItem value="common">Common</MenuItem>
                      <MenuItem value="uncommon">Uncommon</MenuItem>
                      <MenuItem value="special">Special</MenuItem>
                      <MenuItem value="rare">Rare</MenuItem>
                      <MenuItem value="mythic">Mystic</MenuItem>
                    </MuiSelect>
                  );
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="color">Color</InputLabel>
              <Controller
                control={control}
                name="color"
                defaultValue={[]}
                render={({ field }) => {
                  return (
                    <MuiSelect {...field} label="Color" multiple displayEmpty>
                      {colors.map((color, index) => {
                        return (
                          <MenuItem value={color.value} key={index}>
                            {color.label}
                          </MenuItem>
                        );
                      })}
                    </MuiSelect>
                  );
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  const displayPricingNormal = (
    <Box>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={priceTypeChecked.indexOf("nm") !== -1}
                onChange={() => onPriceTypeCheck("nm")}
              />
            }
            label="NM"
          />
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
              isDisabled={!(priceTypeChecked.indexOf("nm") !== -1)}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={priceTypeChecked.indexOf("ex") !== -1}
                onChange={() => onPriceTypeCheck("ex")}
              />
            }
            label="EX"
          />
        </FormGroup>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.ex"
              rate="0.85"
              usdExchange={usdExchange}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              isDisabled={!(priceTypeChecked.indexOf("ex") !== -1)}
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
            control={
              <Checkbox
                checked={priceTypeChecked.indexOf("foil_nm") !== -1}
                onChange={() => onPriceTypeCheck("foil_nm")}
              />
            }
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
              isDisabled={!(priceTypeChecked.indexOf("foil_nm") !== -1)}
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
            control={
              <Checkbox
                checked={priceTypeChecked.indexOf("foil_ex") !== -1}
                onChange={() => onPriceTypeCheck("foil_ex")}
              />
            }
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
              isDisabled={!(priceTypeChecked.indexOf("foil_ex") !== -1)}
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
              control={<Radio disabled />}
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
              {...register("img", {
                onChange: onInputImage,
              })}
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

  const displayPackage = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Special Foil</div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="package-radio"
              defaultChecked
            />
            <label className="form-check-label">Special Foil</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="package-radio"
            />
            <label className="form-check-label">None</label>
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
        <div className="mb-2">{displayPackage}</div>
        <div className="mb-2">{displayVisibility}</div>
      </div>
    </div>
  );
};

export default AdvSearchComponent;

const PriceComponent = ({ keyName, rate, usdExchange, hooksForm }) => {
  const [inputValue, setInputValue] = useState(0);
  const { register, watch } = hooksForm;
  const watchPrice = watch(keyName) ?? 0;

  useEffect(() => {
    const newValue = (+watchPrice / +rate / +usdExchange).toFixed(2);

    setInputValue(newValue ?? 0);
  }, [watchPrice]);

  return (
    <>
      <TextField
        label="Price"
        variant="outlined"
        disabled
        fullWidth
        // onChange={(ev) => setInputValue(ev.target.value)}
        value={inputValue}
        // {...register(keyName)}
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
            {inputValue} $
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            (Price x Rate USD/THB) * {rate}
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            ({inputValue} x {usdExchange}) * {rate}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="500" color="#28A745">
            Total Price
          </Typography>
          <Typography fontWeight="500" color="#28A745">
            {watchPrice.toFixed(2)} THB
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
  isDisabled,
}) => {
  const { register, watch, setValue } = hooksForm;

  useEffect(() => {
    if (isDisabled) {
      setValue(keyName, 0);
    }
  }, [isDisabled]);

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        onWheel={(e) => e.target.blur()}
        type="number"
        fullWidth
        disabled={isDisabled}
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
