/* import - node_modules */
import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';
/* import - CSS */
import styles from './HomePageContainer.module.css';
/* import - selectors */
import homePageSelectors from '../../redux/homePage/homePageSelectors';
/* import - THUNK */
// import {
//   getTasksThunk,
//   changeTaskThunk,
// } from '../../redux/homePage/homePageThunk';
import thunk from '../../redux/homePage/homePageThunk';
/* import - COMPONENT */
import HomePage from './HomePage';
import Filter from '../../components/Filter/Filter';
import Spinner from '../../components/Spinner/Spinner';

/*
 * COMPONENT
 */
const HomePageContainer = ({
  history,
  location,

  listTasks,
  totalCountTasks,
  fetchingNow,
  finishToken,
  happenedError,
  loginToken,

  getTasksThunk,
  changeTaskThunk,
}) => (
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

HomePageContainer.defaultProps = {
  finishToken: null,
  happenedError: null,
  loginToken: null,
};

HomePageContainer.propTypes = {
  history: T.shape().isRequired,
  location: T.shape().isRequired,

  listTasks: T.arrayOf(T.shape).isRequired,
  totalCountTasks: T.number.isRequired,
  fetchingNow: T.bool.isRequired,
  finishToken: T.shape(),
  happenedError: T.shape(),
  loginToken: T.string,

  getTasksThunk: T.func.isRequired,
  changeTaskThunk: T.func.isRequired,
};

const mapStateToProps = state => ({
  listTasks: homePageSelectors.getListTasks(state),
  totalCountTasks: homePageSelectors.getTotalCountTasks(state),
  fetchingNow: homePageSelectors.getIsfetching(state),
  finishToken: homePageSelectors.getFinishToken(state),
  happenedError: homePageSelectors.getError(state),
  loginToken: homePageSelectors.getLoginToken(state),
});

// export default connect(mapStateToProps, { getTasksThunk, changeTaskThunk })(
//   HomePageContainer,
// );

const { getTasksThunk, changeTaskThunk } = thunk;

export default connect(mapStateToProps, { getTasksThunk, changeTaskThunk })(
  HomePageContainer,
);

//
//
//
//

/*
 * COMPONENT
 */
// class HomePageContainer extends Component {
//   render() {
//     const {
//       history,
//       location,

//       listTasks,
//       totalCountTasks,
//       fetchingNow,
//       finishToken,
//       happenedError,
//       loginToken,

//       getTasksThunk,
//       changeTaskThunk,
//     } = this.props;

//     return (
//       <section className={styles.section}>
//         <Filter
//           history={history}
//           location={location}
//           getTasksThunk={getTasksThunk}
//         />

//         <HomePage
//           listTasks={listTasks}
//           totalCountTasks={totalCountTasks}
//           loginToken={loginToken}
//           getTasksThunk={getTasksThunk}
//           changeTaskThunk={changeTaskThunk}
//           fetchingNow={fetchingNow}
//           finishToken={finishToken}
//           happenedError={happenedError}
//         />

//         {fetchingNow && <Spinner />}
//       </section>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   listTasks: homePageSelectors.getListTasks(state),
//   totalCountTasks: homePageSelectors.getTotalCountTasks(state),
//   fetchingNow: homePageSelectors.getIsfetching(state),
//   finishToken: homePageSelectors.getFinishToken(state),
//   happenedError: homePageSelectors.getError(state),
//   loginToken: homePageSelectors.getLoginToken(state),
// });

// export default connect(mapStateToProps, { getTasksThunk, changeTaskThunk })(
//   HomePageContainer,
// );
