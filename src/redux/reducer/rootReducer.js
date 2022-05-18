import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  dataReducer,
  profileReducer,
});

export default rootReducer;
