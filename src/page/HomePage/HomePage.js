/* import - node_modules */
import React from "react";
/* import - COMPONENT */
import Paginator from "../../components/Paginator/Paginator";
import ListTasks from "./ListTasks/ListTasks";

/*
 * COMPONENT
 */
const HomePage = ({
  listTasks,
  totalCountTasks,
  loginToken,
  fetchingNow,
  finishToken,
  happenedError,
  getTasksThunk,
  changeTaskThunk
}) => (
  <>
    <ListTasks
      listTasks={listTasks}
      loginToken={loginToken}
      fetchingNow={fetchingNow}
      finishToken={finishToken}
      happenedError={happenedError}
      getTasksThunk={getTasksThunk}
      changeTaskThunk={changeTaskThunk}
    />

    <Paginator
      totalCountTasks={totalCountTasks}
      getTasksThunk={getTasksThunk}
    />
  </>
);

export default HomePage;
