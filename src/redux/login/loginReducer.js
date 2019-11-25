import { combineReducers } from 'redux';
import * as types from './loginTypes';

const loginTokenReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.GET_TOKEN:
      return payload.token;

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

const makedMistakeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.MAKED_MISTAKE:
      return payload.makedMistake;

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
  loginToken: loginTokenReducer,
  fetchingNow: fetchingNowReducer,
  happenedError: happenedErrorReducer,
  makedMistake: makedMistakeReducer,
});
