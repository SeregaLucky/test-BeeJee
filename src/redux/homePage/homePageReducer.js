import { combineReducers } from 'redux';
import * as types from './homePageTypes';

const listReducer = (state = [], { type, payload }) => {
  switch (type) {
    case types.GET_TASKS:
      return [...payload.tasks];

    case types.CHANGE_TACK:
      return state.map(task =>
        task.id === payload.id
          ? { ...task, text: payload.text, status: payload.status }
          : task,
      );

    default:
      return state;
  }
};

const totalTasksCountReducer = (state = 1, { type, payload }) => {
  switch (type) {
    case types.GET_COUNT_TASKS:
      return payload.count;

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

const finishTokenReducer = (state = null, { type, payload }) => {
  switch (type) {
    case types.FINISH_TOKEN:
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
  items: listReducer,
  totalCountTasks: totalTasksCountReducer,
  fetchingNow: fetchingNowReducer,
  finishToken: finishTokenReducer,
  happenedError: happenedErrorReducer,
});
