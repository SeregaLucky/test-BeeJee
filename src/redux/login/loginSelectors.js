const getLoginToken = state => state.loginPage.loginToken;

const getIsFetching = state => state.loginPage.fetchingNow;

const getMakedMistake = state => state.loginPage.makedMistake;

const getError = state => state.loginPage.happenedError;

export default { getLoginToken, getIsFetching, getMakedMistake, getError };
