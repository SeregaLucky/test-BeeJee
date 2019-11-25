import { combineReducers } from "redux";

import { homePageAPI } from "../../api/api";

const GET_TASKS = "ADD_NEW_TASK";
const CHANGE_TACK = "CHANGE_TACK";
const GET_COUNT_TASKS = "GET_COUNT_TASKS";

/*
 * REDUCER
 */
const listReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      console.log(payload.tasks);
      return [...payload.tasks];

    case CHANGE_TACK:
      // console.log(state);
      return state.map(task =>
        task.id === payload.id
          ? { ...task, text: payload.text, status: payload.status }
          : task
      );

    default:
      return state;
  }
};

const totalTasksCountReducer = (state = 1, { type, payload }) => {
  switch (type) {
    case GET_COUNT_TASKS:
      // console.log(payload.count);
      return payload.count;

    default:
      return state;
  }
};

/*
 * ACTIONS
 */
export const getTasksAC = tasks => ({
  type: GET_TASKS,

  payload: {
    tasks
  }
});

export const changeTaskAC = (id, text, status) => ({
  type: CHANGE_TACK,

  payload: {
    id,
    text,
    status
  }
});

export const getCountTasksAC = count => ({
  type: GET_COUNT_TASKS,

  payload: {
    count
  }
});

/*
 * THUNK
 */
export const getTasksThunk = (page, sort_field, sort_direction) => dispatch => {
  // console.log(page);
  // console.log(sort_field);
  // console.log(sort_direction);

  homePageAPI
    .getTasks(page, sort_field, sort_direction)
    .then(res => {
      // console.log(res);
      // console.log(res.message);

      dispatch(getTasksAC(res.message.tasks));
      dispatch(getCountTasksAC(res.message.total_task_count));
    })
    .catch(err => console.log(err));
  // .finally();
};

export const changeTaskThunk = (id, text, status, token) => dispatch => {
  status = status ? 10 : 0;

  homePageAPI
    .changeTask(id, text, status, token)
    .then(res => {
      // console.log(res);

      // console.log(id);
      // console.log(text);
      // console.log(status);

      dispatch(changeTaskAC(id, text, status));
    })
    .catch(err => console.log(err));
  // .finally();
};

export default combineReducers({
  items: listReducer,
  totalCountTasks: totalTasksCountReducer
});
