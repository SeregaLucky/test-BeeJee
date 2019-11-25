const getListTasks = state => state.homePage.items;
const getTotalCountTasks = state => state.homePage.totalCountTasks;
const getIsfetching = state => state.homePage.fetchingNow;
const getFinishToken = state => state.homePage.finishToken;
const getError = state => state.homePage.happenedError;
const getLoginToken = state => state.loginPage.loginToken;

export default {
  getListTasks,
  getTotalCountTasks,
  getIsfetching,
  getFinishToken,
  getError,
  getLoginToken,
};
