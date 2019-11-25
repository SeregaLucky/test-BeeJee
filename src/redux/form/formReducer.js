import { combineReducers } from "redux";
import * as types from "./formTypes";

const itemsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.ADD_NEW_TASK:
      return payload.task;

    default:
      return state;
  }
};

const fetchingNowReducer = (state = false, { type, payload }) => {
  switch (type) {
    case types.FETCHING_NOW:
      return payload.fetchingNow;

    default:
      return state;
  }
};

const happenedErrorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.HAPPENED_ERROR:
      return payload.isError;

    default:
      return state;
  }
};

export default combineReducers({
  newTask: itemsReducer,
  fetchingNow: fetchingNowReducer,
  happenedError: happenedErrorReducer
});
