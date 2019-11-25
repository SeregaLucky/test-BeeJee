import { homePageAPI } from '../../api/api';
import * as AC from './formActions';

// export const addNewTaskThunk = (username, email, text) => dispatch => {
const addNewTaskThunk = (username, email, text) => dispatch => {
  dispatch(AC.fetchingNowAC(true));

  homePageAPI
    .addTask(username, email, text)
    .then(res => {
      if (res.status === 'ok') {
        dispatch(AC.addNewTaskAC(res.message));
      }
    })
    .catch(err => dispatch(AC.happenedErrorAC(err)))
    .finally(() => dispatch(AC.fetchingNowAC(false)));
};

export default { addNewTaskThunk };
