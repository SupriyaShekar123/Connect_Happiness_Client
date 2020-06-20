import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import events from "./events/reducer";
import eventsDetails from "./eventsDetails/reducer";

export default combineReducers({
  appState,
  user,
  events,
  eventsDetails,
});
