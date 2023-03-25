import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { mtgApi } from "./api/mtgAdmin";
import MainLayout from "./Layout/MainLayout";
import Accessory from "./Pages/Accessory";
import Admin from "./Pages/Admin";
import AdvanceSearch from "./Pages/AdvanceSearch";
import Customer from "./Pages/Customer";
import EditionCollection from "./Pages/EditionCollection";
import GameCollection from "./Pages/GameCollection";
import Login from "./Pages/Login";
import OrderDetail from "./Pages/OrderDetail";
import OrderList from "./Pages/OrderList";
import PickupLocation from "./Pages/PickupLocation";
import Seal from "./Pages/Seal";
import { useSelector } from "react-redux";
import { loginAPI } from "./api/loginAPI";
import ConfigPricing from "./Pages/ConfigPricing";
import ConfigPricingDetail from "./Pages/ConfigPricingDetail";
import AccessoryCreate from "./Pages/AccessoryCreate";
import AccessoryEdit from "./Pages/AccessoryEdit";
import AdvSearchCreate from "./Pages/AdvSearchCreate";
import AdvSearchEdit from "./Pages/AdvSearchEdit";
import CustomerDetail from "./Pages/CustomerDetail";
import ECollectionCreate from "./Pages/ECollectionCreate";
import ECollectionEdit from "./Pages/ECollectionEdit";
import GCollectionCreate from "./Pages/GCollectionCreate";
import GCollectionEdit from "./Pages/GCollectionEdit";
import SealCreate from "./Pages/SealCreate";
import SealEdit from "./Pages/SealEdit";
import CustomPrice from "./Pages/CustomPrice";
import SpinnerTool from "./Components/SpinnerTool";
import NotFound from "./Pages/NotFound";
import Test from "./Pages/Test";
import History from "./Pages/History";
import Transaction from "./Pages/Transaction";
import Color from "./Pages/Color";
import Rarity from "./Pages/Rarity";

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const { token } = useSelector((state) => state.profileReducer.profile);
  const isLoading = useSelector((state) => state.dataReducer.isLoading);
  console.log({ token });

  useEffect(() => {
    if (token) {
      mtgApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loginAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      {isLoading && <SpinnerTool />}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<OrderList />} />
          <Route path="/pickuplocation" element={<PickupLocation />} />
          <Route path="/gamecollection" element={<GameCollection />} />
          <Route
            path="/gamecollection/create"
            element={<GCollectionCreate />}
          />
          {/* <Route
            path="/gamecollection/edit/:gcId"
            element={<GCollectionEdit />}
          /> */}
          <Route path="/editioncollection" element={<EditionCollection />} />
          <Route
            path="/editioncollection/create"
            element={<ECollectionCreate />}
          />
          <Route
            path="/editioncollection/edit/:ecId"
            element={<ECollectionEdit />}
          />
          <Route path="/advancesearch" element={<AdvanceSearch />} />
          <Route path="/advancesearch/create" element={<AdvSearchCreate />} />
          <Route path="/advancesearch/edit/:id" element={<AdvSearchEdit />} />
          <Route path="/advancesearch/history/:id" element={<History />} />
          <Route path="/seal" element={<Seal />} />
          <Route path="/seal/create" element={<SealCreate />} />
          <Route path="/seal/edit/:sealId" element={<SealEdit />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/accessory/create" element={<AccessoryCreate />} />
          <Route path="/accessory/edit/:acsId" element={<AccessoryEdit />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/config-pricing" element={<ConfigPricing />} />
          <Route path="/config-pricing/:id" element={<ConfigPricingDetail />} />
          <Route path="/custom-price" element={<CustomPrice />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/:customerId" element={<CustomerDetail />} />
          <Route path="/orderdetail/:orderNo" element={<OrderDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/color" element={<Color />} />
          <Route path="/rarity" element={<Rarity />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
