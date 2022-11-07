import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";
import Select from "react-select";
import { getTcgPlayerGameDetail } from "../Services/Crud";
import { useForm } from "react-hook-form";
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
} from "@mui/material";

const AdvSearchComponent = ({ hooksForm }) => {
  const { register, errors, reset } = hooksForm;
  const [image64, setImage64] = useState(null);
  const [priceType, setPriceType] = useState("normal");

  const styles = {
    image64: {
      height: "336px",
      objectFit: "contain",
    },
  };

  const editionOptions = [
    { label: "Realm of the Gods", value: "1" },
    { label: "Mythic Booster", value: "2" },
    { label: "Rise of the Unison Warrior (2nd Edition)", value: "3" },
  ];

  const onInputImage = async (ev) => {
    const file = await ev.target.files[0];
    const img64 = await readFileDataTo64(file);

    setImage64(img64);
  };

  const onGetTcgGameDetail = () => {
    const tcgId = "105554";
    const gameEdition = "62622eded4b22aa0d995e0e2";

    getTcgPlayerGameDetail(tcgId, gameEdition).then((res) => {
      const { data } = res.data;
      const list = {
        name: data.name,
        detail: data.detail,
        gameEdition: data.gameEdition,
        rarity: data.optionalDetail[0]?.rarity,
        price: data.price,
        stock: data.stock,
      };

      reset(list);
      setImage64(data.img);
    });
  };

  const displayBasicInfo = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Basic information</div>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextField
              label="ID of TCG Player"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={105554}
            />
          </Grid>
          <Grid item xs={4}>
            <div className="btn btn--secondary " onClick={onGetTcgGameDetail}>
              Search Card for TCG Player
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Game Collection"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Edition Collection"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("gameEdition")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
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
              multiline
              minRows={3}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("detail")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Variations"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("detail")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Format"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              {...register("detail")}
            />
          </Grid>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  NM Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36) * 1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  EX Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 0.85
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (12.00x36) * 0.85
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Foil_NM Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36)*1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Foil_EX Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36)*1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  NM Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36) * 1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Add new stock quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  EX Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 0.85
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (12.00x36) * 0.85
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Add new stock quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Foil_NM Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36)*1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Add new stock quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              {...register("price")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Foil_EX Price (USD)
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  3.00 $
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (Price x Rate USD/THB) * 1.00
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  (3.00x36)*1.00
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Price
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  108.00 THB
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Add new stock quantity"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Stack spacing={1} mt={2}>
              <Typography fontWeight="600" color="rgba(66, 82, 110, 0.86)">
                Summary
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Latest of stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  5
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  Remaining Stock
                </Typography>
                <Typography fontWeight="400" color="rgba(66, 82, 110, 0.86)">
                  2
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="500" color="#28A745">
                  Total Stock
                </Typography>
                <Typography fontWeight="500" color="#28A745">
                  7
                </Typography>
              </Box>
            </Stack>
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
        <div className="my-2">{displayInventory}</div>
        <div className="my-2">{displayImage}</div>
      </div>
      <div className="col-3">
        <div className="mb-2">{displayVisibility}</div>
      </div>
    </div>
  );
};

export default AdvSearchComponent;
