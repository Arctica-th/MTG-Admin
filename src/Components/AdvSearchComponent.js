import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { colors } from "../Data/colorData";
import {
  getAllEditionByGame,
  getGameCollectionByDate,
  getTcgPlayerGameDetail,
} from "../Services/Crud";
import { onHandleOnlyNumber, readFileDataTo64 } from "../Services/Func";
import { updateIsLoading } from "../redux/action/dataAction";

const AdvSearchComponent = ({ hooksForm }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const gameMasterTemp = "62893b464048140c7019367b";
  const {
    register,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = hooksForm;

  const [image64, setImage64] = useState(null);
  // const [cardDetail, setCardDetail] = useState(null);
  const [priceType, setPriceType] = useState("normal");
  const [optionGameCollection, setOptionGameCollection] = useState([]);
  const [optionGameEditions, setOptionGameEditions] = useState([]);
  // const [configPrice, setConfigPrice] = useState(null);

  const watchGameMaster = watch("gameMaster");
  const styles = {
    image64: {
      height: "336px",
      objectFit: "contain",
    },
  };

  // const getPriceRate = useCallback(async () => {
  //   try {
  //     const response = await getConfigPricingById(watchGameMaster);

  //     // setConfigPrice(response.data);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }, [gameMasterTemp, watchGameMaster]);

  // useEffect(() => {
  //   getPriceRate();
  // }, [getPriceRate]);

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
      .catch((err) => {});
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
      .catch((err) => {});
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
        const { data } = res.data;
        // setCardDetail(data);

        const list = {
          ...data,
          name: data.name,
          detail: data.detail,
          gameEdition: data.gameEdition.id,
          rarity: data.optionalDetail.rarity,
          price: data.price,
          gameMaster: gameMasterTemp,
          stock: data.stock,
          color: data?.optionalDetail?.color_identity?.length
            ? data?.optionalDetail?.color_identity
            : ["CL"],
          checked: {
            normal: {
              nm: true,
              ex: false,
              foil_nm: false,
              foil_ex: false,
            },
          },
        };

        reset(list);

        setImage64(data.img);

        addToast(res.data.message || "success", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        // setCardDetail(null);
        // setImage64("");
        // reset("");

        addToast(err.message ?? "Cannot get this Card serial", {
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
    <Card>
      <CardContent>
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
              error={!!errors?.cardSerial}
              helperText={errors?.cardSerial?.message}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              sx={{
                height: "100%",
                width: "100%",
              }}
              variant="contained"
              color="info"
              onClick={onGetTcgGameDetail}
              disabled={!!!watch("cardSerial") || !optionGameCollection.length}
            >
              Search Card for Scryfall
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors?.gameMaster}>
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
              <FormHelperText error>
                {errors?.gameMaster?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              fullWidth
              disabled={!optionGameEditions.length}
              error={!!errors?.game_edition}
            >
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
              <FormHelperText error>
                {errors?.gameEdition?.message}
              </FormHelperText>
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
              error={!!errors?.name}
              helperText={errors?.name?.message}
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
              error={!!errors?.detail}
              helperText={errors?.detail?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Rarity"
              {...register("rarity")}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              error={!!errors?.rarity}
              helperText={errors?.rarity?.message}
            />
            {/* <FormControl fullWidth>
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
            </FormControl> */}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors?.color}>
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

              <FormHelperText error>{errors?.color?.message}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const displayPricingNormal = (
    <Box>
      <Box>
        <Controller
          control={control}
          name="checked.normal.nm"
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch(`checked.normal.nm`)}
                    // checked={value}
                    onChange={(ev) => onChange(ev.target.checked)}
                  />
                }
                label="NM"
              />
            );
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.nm"
              normalPrice={watch("price.scryfall.usd")}
              rate="1.00"
              usdExchange={watch("price.config.nm")}
              // usdExchange={+watch("price.config.nm")}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              isDisabled={!watch("checked.normal.nm")}
              keyName="stock.normal.nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <Controller
          control={control}
          name="checked.normal.ex"
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch(`checked.normal.ex`)}
                    // checked={value}
                    onChange={(ev) => onChange(ev.target.checked)}
                  />
                }
                label="EX"
              />
            );
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.ex"
              rate={watch("price.config.ex")}
              normalPrice={watch("price.scryfall.usd")}
              usdExchange={watch("price.config.nm")}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              isDisabled={!watch("checked.normal.ex")}
              keyName="stock.normal.ex"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <Controller
          control={control}
          name="checked.normal.foil_nm"
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={value}
                    checked={watch(`checked.normal.foil_nm`)}
                    onChange={(ev) => onChange(ev.target.checked)}
                  />
                }
                label="Foil_NM"
              />
            );
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.foil_nm"
              rate="1.00"
              usdExchange={watch("price.config.nm_foil")}
              normalPrice={watch("price.scryfall.usd_foil")}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              isDisabled={!watch("checked.normal.foil_nm")}
              keyName="stock.normal.foil_nm"
              hooksForm={hooksForm}
              remaining={0}
            />
          </Grid>
        </Grid>

        <Divider sx={{ marginBlock: "20px" }} />
      </Box>
      <Box>
        <Controller
          control={control}
          name="checked.normal.foil_ex"
          render={({ field: { onChange, value } }) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch(`checked.normal.foil_ex`)}
                    // checked={value}
                    onChange={(ev) => onChange(ev.target.checked)}
                  />
                }
                label="Foil_EX"
              />
            );
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PriceComponent
              keyName="price.normal.foil_ex"
              rate={watch("price.config.ex_foil")}
              usdExchange={watch("price.config.nm_foil")}
              normalPrice={watch("price.scryfall.usd_foil")}
              hooksForm={hooksForm}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <StockComponent
              isDisabled={!watch("checked.normal.foil_ex")}
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
              usdExchange={32}
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
              usdExchange={32}
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
              usdExchange={32}
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
              usdExchange={32}
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
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );

  const displayImage = (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );

  const displayVisibility = (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );

  const displayPackage = (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  );

  // return (
  //   <div className="row g-2">
  //     <div className="col-9">
  //       <div className="mb-2">{displayBasicInfo}</div>
  //       <div className="my-2">{displayPricing}</div>
  //       <div className="my-2">{displayImage}</div>
  //     </div>
  //     <div className="col-3">
  //       <div className="mb-2">{displayPackage}</div>
  //       <div className="mb-2">{displayVisibility}</div>
  //     </div>
  //   </div>
  // );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Stack spacing={2}>
          {displayBasicInfo}
          {displayPricing}
          {displayImage}
        </Stack>
      </Grid>
      <Grid item xs={12} md={3}>
        <Stack spacing={2}>
          {displayPackage}
          {displayVisibility}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AdvSearchComponent;

const PriceComponent = ({
  keyName,
  rate,
  usdExchange,
  hooksForm,
  normalPrice,
}) => {
  const [inputValue, setInputValue] = useState(0);
  const { watch } = hooksForm;
  const watchPrice = watch(keyName) ?? 0;

  useEffect(() => {
    const newValue = (+watchPrice).toFixed(2);

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
            {normalPrice} $
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            (Price x Rate USD/THB) * {rate}
          </Typography>
          <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
            ({normalPrice} x {usdExchange}) * {rate}
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
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    control,
  } = hooksForm;

  const [errorObj, setErrorObj] = useState(null);

  useEffect(() => {
    if (isDisabled) {
      setValue(keyName, 0);
    }
  }, [isDisabled]);

  useEffect(() => {
    const key = keyName.split(".");

    if (key.length && Object.keys(errors).length) {
      const error = errors[key[0]][key[1]][key[2]];

      setErrorObj(error);
    }

    return () => {
      setErrorObj(null);
    };
  }, [errors]);

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        onWheel={(e) => e.target.blur()}
        // type="number"
        fullWidth
        onKeyDown={onHandleOnlyNumber}
        disabled={isDisabled}
        {...register(keyName, {
          valueAsNumber: true,
        })}
        InputLabelProps={{
          shrink: true,
        }}
        error={!!errorObj}
        helperText={errorObj?.message}
        // helperText={errors?.stock?.normal[keyName]?.message}
      />
      {/* <Controller
        name={keyName}
        control={control}
        render={({ field, formState: { errors }, fieldState }) => {
          
          return (
            <TextField
              {...field}
              label={label}
              variant="outlined"
              onWheel={(e) => e.target.blur()}
              type="number"
              fullWidth
              onKeyDown={onHandleOnlyNumber}
              disabled={isDisabled}
              InputLabelProps={{
                shrink: true,
              }}

              // error={!!errors[keyName]}
              // helperText={errors[keyName]?.message}
              // helperText={errors?.stock?.normal[keyName]?.message}
            />
          );
        }}
      /> */}

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
