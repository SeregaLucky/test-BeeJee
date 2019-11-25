/* import - node_modules */
import React, { Component } from "react";
import { connect } from "react-redux";
/* import - CSS */
import styles from "./HomePageContainer.module.css";
/* import - selectors */
import homePageSelectors from "../../redux/homePage/homePageSelectors";
/* import - THUNK */
import {
  getTasksThunk,
  changeTaskThunk
} from "../../redux/homePage/homePageThunk";
/* import - COMPONENT */
import HomePage from "./HomePage";
import Filter from "../../components/Filter/Filter";
import Spinner from "../../components/Spinner/Spinner";

/*
 * COMPONENT
 */
class HomePageContainer extends Component {
  render() {
    const {
      history,
      location,

      listTasks,
      totalCountTasks,
      fetchingNow,
      finishToken,
      happenedError,
      loginToken,

      getTasksThunk,
      changeTaskThunk
    } = this.props;

    return (
      <section className={styles.section}>
        <Filter
          history={history}
          location={location}
          getTasksThunk={getTasksThunk}
        />

        <HomePage
          listTasks={listTasks}
          totalCountTasks={totalCountTasks}
          loginToken={loginToken}
          getTasksThunk={getTasksThunk}
          changeTaskThunk={changeTaskThunk}
          fetchingNow={fetchingNow}
          finishToken={finishToken}
          happenedError={happenedError}
        />

        {fetchingNow && <Spinner />}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  listTasks: homePageSelectors.getListTasks(state),
  totalCountTasks: homePageSelectors.getTotalCountTasks(state),
  fetchingNow: homePageSelectors.getIsfetching(state),
  finishToken: homePageSelectors.getFinishToken(state),
  happenedError: homePageSelectors.getError(state),
  loginToken: homePageSelectors.getLoginToken(state)
});

export default connect(mapStateToProps, { getTasksThunk, changeTaskThunk })(
  HomePageContainer
);
