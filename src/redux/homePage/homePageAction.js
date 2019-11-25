import * as types from "./homePageTypes";

export const getTasksAC = tasks => ({
  type: types.GET_TASKS,

  payload: {
    tasks
  }
});

export const changeTaskAC = (id, text, status) => ({
  type: types.CHANGE_TACK,

  payload: {
    id,
    text,
    status
  }
});

export const getCountTasksAC = count => ({
  type: types.GET_COUNT_TASKS,

  payload: {
    count
  }
});

export const fetchingNowAC = fetchingNow => ({
  type: types.FETCHING_NOW,

  payload: {
    fetchingNow
  }
});

export const makedMistakeAC = finishToken => ({
  type: types.FINISH_TOKEN,

  payload: {
    finishToken: { finishToken }
  }
});

export const happenedErrorAC = isError => ({
  type: types.HAPPENED_ERROR,

  payload: {
    isError: { isError }
  }
});
