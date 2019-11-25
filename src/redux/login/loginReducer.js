import { combineReducers } from "redux";

import { loginPageAPI } from "../../api/api";

const GET_TOKEN = "GET_TOKEN";
const FETCHING_NOW = "login/FETCHING_NOW";
const MAKED_MISTAKE = "login/MAKED_MISTAKE";
const HAPPENED_ERROR = "login/HAPPENED_ERROR";

/*
 * REDUCER
 */
const loginTokenReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_TOKEN:
      // console.log(payload.token);
      return payload.token;

    default:
      return state;
  }
};

const fetchingNowReducer = (state = false, { type, payload }) => {
  switch (type) {
    case FETCHING_NOW:
      return payload.fetchingNow;

    default:
      return state;
  }
};

const makedMistakeReducer = (state = null, { type, payload }) => {
  switch (type) {
    case MAKED_MISTAKE:
      return payload.makedMistake;

    default:
      return state;
  }
};

const happenedErrorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case HAPPENED_ERROR:
      return payload.isError;

    default:
      return state;
  }
};

/*
 * ACTIONS
 */
export const getTokenAC = token => ({
  type: GET_TOKEN,

  payload: {
    token
  }
});

export const fetchingNowAC = fetchingNow => ({
  type: FETCHING_NOW,

  payload: {
    fetchingNow
  }
});

export const makedMistakeAC = makedMistake => ({
  type: MAKED_MISTAKE,

  // payload: {
  //   makedMistake
  // }
  payload: {
    makedMistake: { makedMistake }
  }
});

export const happenedErrorAC = isError => ({
  type: HAPPENED_ERROR,

  payload: {
    isError: { isError }
  }
});

/*
 * THUNK
 */
export const loginingThunk = (username, password) => dispatch => {
  dispatch(fetchingNowAC(true));

  loginPageAPI
    .postLigin(username, password)
    .then(res => {
      // console.log(res);
      // console.log(res.message.password);

      if (res.status !== "ok") {
        console.log("Введены не верные данные");
        dispatch(makedMistakeAC(res.message.password));
        return;
      }

      dispatch(getTokenAC(res.message.token));
      // dispatch(happenedErrorAC(null));
      // dispatch(makedMistakeAC(null));
    })
    .catch(err => {
      console.log(err);
      dispatch(happenedErrorAC(err));
    })
    .finally(() => dispatch(fetchingNowAC(false)));
};

export default combineReducers({
  loginToken: loginTokenReducer,
  fetchingNow: fetchingNowReducer,
  happenedError: happenedErrorReducer,
  makedMistake: makedMistakeReducer
});
