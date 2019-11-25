import * as types from "./formType";

export const addNewTaskAC = task => ({
  type: types.ADD_NEW_TASK,

  payload: {
    task
  }
});

export const fetchingNowAC = fetchingNow => ({
  type: types.FETCHING_NOW,

  payload: {
    fetchingNow
  }
});

export const happenedErrorAC = isError => ({
  type: types.HAPPENED_ERROR,

  payload: {
    isError: { isError }
  }
});
