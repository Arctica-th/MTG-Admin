import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { getConfigPricingById, postConfigPricing } from "../Services/Crud";
import { useDispatch } from "react-redux";
import { updateIsLoading } from "../redux/action/dataAction";
import { useToasts } from "react-toast-notifications";

const ConfigPricingDetail = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, getValues, reset } = useForm();
  const [pricingData, setPricingData] = useState();

  const getConfigPriceData = (gameMasterId) => {
    dispatch(updateIsLoading(true));
    getConfigPricingById(gameMasterId)
      .then((res) => {
        console.log(res);
        reset(res.data);
        setPricingData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(updateIsLoading(false));
      });
  };

  const onHandleSave = () => {
    const { nm, nm_foil, etched, ex, ex_foil, common, uncommon, rare, mythic } =
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
      mythic,
      game: id,
    };

    postConfigPricing(data)
      .then((res) => {
        console.log("postConfigPricing", res);

        navigate("/config-pricing");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getConfigPriceData(id);
    }
  }, [id]);

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
          {pricingData?.game?.name}
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
            <BsChevronLeft /> {pricingData?.game?.name}
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
                {...register("nm", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of NM_Foil (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("nm_foil", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of Etched (THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("etched", {
                  valueAsNumber: true,
                })}
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
                {...register("ex", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of EX_Foil (Multiply Rate % from NM_Foil)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ex_foil", {
                  valueAsNumber: true,
                })}
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
                {...register("common", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of Uncommon (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("uncommon", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of Rare (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("rare", {
                  valueAsNumber: true,
                })}
              />
              <TextField
                label="Price of Mystic (Minimum Price THB)"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("mythic", {
                  valueAsNumber: true,
                })}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPricingDetail;
