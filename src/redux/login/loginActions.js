import * as types from "./loginTypes";

export const getTokenAC = token => ({
  type: types.GET_TOKEN,

  payload: {
    token
  }
});

export const fetchingNowAC = fetchingNow => ({
  type: types.FETCHING_NOW,

  payload: {
    fetchingNow
  }
});

export const makedMistakeAC = makedMistake => ({
  type: types.MAKED_MISTAKE,

  payload: {
    makedMistake: { makedMistake }
  }
});

export const happenedErrorAC = isError => ({
  type: types.HAPPENED_ERROR,

  payload: {
    isError: { isError }
  }
});
