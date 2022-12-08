import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { postConfigPricing } from "../Services/Crud";

const ConfigPricingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, getValues } = useForm();
  const [pricingData, setPricingData] = useState();

  const onHandleSave = () => {
    const { nm, nm_foil, etched, ex, ex_foil, common, uncommon, rare, mystic } =
      getValues();

    const data = {
      nm,
      nm_foil,
      etched,
      ex,
      ex_foil,
      common,
      uncommon,
      rare,
      mystic,
      game: id,
    };

    postConfigPricing(data)
      .then((res) => {
        console.log("postConfigPricing", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [id]);

  const displayBreadCrump = (
    <nav style={{ BsBreadcrumbDivider: '">"' }} aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link
            to="/config-pricing"
            style={{ color: "#ECC742", textDecoration: "none" }}
          >
            Config Pricing
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pricingData?.gameCollection}
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      <div className="container-fluid py-4">
        {displayBreadCrump}
        <div className="h4 my-4 d-flex justify-content-between align-items-center">
          <div onClick={() => navigate("/config-pricing")} role="button">
            <BsChevronLeft /> {pricingData?.gameCollection}
          </div>
          <div>
            <button className="btn btn--secondary" onClick={onHandleSave}>
              Save
            </button>
          </div>
        </div>
        <div className="card shadow">
          <div className="card-body p-4">
            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Type card (THB)
              </Typography>

              <TextField
                label="Price of NM (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("nm")}
              />
              <TextField
                label="Price of NM_Foil (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("nm_foil")}
              />
              <TextField
                label="Price of Etched (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("etched")}
              />
            </Stack>

            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Type card (Multiply Rate %)
              </Typography>

              <TextField
                label="Price of EX (Multiply Rate % from NM)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ex")}
              />
              <TextField
                label="Price of EX_Foil (Multiply Rate % from NM_Foil)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ex_foil")}
              />
            </Stack>

            <Stack marginY={3} spacing={3}>
              <Typography variant="h6" color="#414749" fontWeight="600">
                Rarity (Minimum Price THB)
              </Typography>

              <TextField
                label="Price of Common (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("common")}
              />
              <TextField
                label="Price of Uncommon (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("uncommon")}
              />
              <TextField
                label="Price of Rare (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("rare")}
              />
              <TextField
                label="Price of Mystic (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("mystic")}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPricingDetail;
