import React, { useState, useEffect } from "react";
import { readFileDataTo64 } from "../Services/Func";
import Select from "react-select";
import { getTcgPlayerGameDetail } from "../Services/Crud";
import { useForm } from "react-hook-form";

const AdvSearchComponent = ({ hooksForm }) => {
  const { register, errors, reset } = hooksForm;
  const [image64, setImage64] = useState(null);

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
        <div className="my-2">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="ID of TCG Player"
                value={105554}
              />
            </div>
            <div className="col-auto">
              <div className="btn btn--secondary " onClick={onGetTcgGameDetail}>
                Search Card for TCG Player
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Game Collection"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Edition Collection"
                {...register("gameEdition")}
              />
            </div>
          </div>
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("name")}
          />
        </div>
        <div className="my-2">
          <textarea
            className="form-control"
            placeholder="Product Detail"
            {...register("detail")}
          />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Variations"
          />
        </div>
        <div className="my-2">
          <input type="text" className="form-control" placeholder="Format" />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Rarity"
            {...register("rarity")}
          />
        </div>
        <div className="my-2">
          <input type="text" className="form-control" placeholder="Color" />
        </div>
      </div>
    </div>
  );

  const displayPricing = (
    <div className="card">
      <div className="card-body">
        <div className="h6">Pricing</div>
        <div className="my-2">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Price"
                {...register("price")}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Discount"
              />
            </div>
          </div>
        </div>
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
        <div className="my-2">
          <input type="text" className="form-control" placeholder="SKU" />
        </div>
        <div className="my-2">
          <input
            type="text"
            className="form-control"
            placeholder="Stock quantity"
            {...register("stock")}
          />
        </div>
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
