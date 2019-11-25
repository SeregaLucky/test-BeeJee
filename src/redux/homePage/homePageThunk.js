import { homePageAPI } from "../../api/api";
import * as AC from "./homePageAction";

export const getTasksThunk = (page, sort_field, sort_direction) => dispatch => {
  dispatch(AC.fetchingNowAC(true));

  homePageAPI
    .getTasks(page, sort_field, sort_direction)
    .then(res => {
      if (res.status === "ok") {
        dispatch(AC.getTasksAC(res.message.tasks));
        dispatch(AC.getCountTasksAC(res.message.total_task_count));
      }
    })
    .catch(err => dispatch(AC.happenedErrorAC(err)))
    .finally(() => dispatch(AC.fetchingNowAC(false)));
};

export const changeTaskThunk = (id, text, status, token) => dispatch => {
  dispatch(AC.fetchingNowAC(true));

  status = status ? 10 : 0;

  homePageAPI
    .changeTask(id, text, status, token)
    .then(res => {
      if (res.status === "ok") {
        dispatch(AC.changeTaskAC(id, text, status));
        return;
      }

      if (res.status === "error") {
        dispatch(AC.makedMistakeAC(res.message.token));
        return;
      }
    })
    .catch(err => dispatch(AC.happenedErrorAC(err)))
    .finally(() => dispatch(AC.fetchingNowAC(false)));
};
