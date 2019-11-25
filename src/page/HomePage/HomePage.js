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
  getTasksThunk,
  changeTaskThunk
}) => {
  return (
    <>
      <ListTasks
        listTasks={listTasks}
        loginToken={loginToken}
        getTasksThunk={getTasksThunk}
        changeTaskThunk={changeTaskThunk}
      />

      <Paginator
        totalCountTasks={totalCountTasks}
        getTasksThunk={getTasksThunk}
      />
    </>
  );
};

export default HomePage;
