const getNewTask = state => state.formPage.newTask;

const getIsFetching = state => state.formPage.fetchingNow;

const getError = state => state.formPage.happenedError;

export default { getNewTask, getIsFetching, getError };
