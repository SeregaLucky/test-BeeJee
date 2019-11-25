/* import - node_modules */
import React from 'react';
import T from 'prop-types';
/* import - COMPONENT */
import Paginator from '../../components/Paginator/Paginator';
import ListTasks from './ListTasks/ListTasks';

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
  changeTaskThunk,
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

    {listTasks.length > 0 && (
      <Paginator
        totalCountTasks={totalCountTasks}
        getTasksThunk={getTasksThunk}
      />
    )}
  </>
);

HomePage.defaultProps = {
  finishToken: null,
  happenedError: null,
  loginToken: null,
};

HomePage.propTypes = {
  listTasks: T.arrayOf(T.shape).isRequired,
  totalCountTasks: T.number.isRequired,
  loginToken: T.string,
  fetchingNow: T.bool.isRequired,
  finishToken: T.shape(),
  happenedError: T.shape(),

  getTasksThunk: T.func.isRequired,
  changeTaskThunk: T.func.isRequired,
};

export default HomePage;
