import { loginPageAPI } from "../../api/api";
import * as AC from "./loginActions";

export const loginingThunk = (username, password) => dispatch => {
  dispatch(AC.fetchingNowAC(true));
  console.log(555);

  loginPageAPI
    .postLigin(username, password)
    .then(res => {
      if (res.status !== "ok") {
        dispatch(AC.makedMistakeAC(res.message.password));
        return;
      }

      dispatch(AC.getTokenAC(res.message.token));
    })
    .catch(err => dispatch(AC.happenedErrorAC(err)))
    .finally(() => dispatch(AC.fetchingNowAC(false)));
};