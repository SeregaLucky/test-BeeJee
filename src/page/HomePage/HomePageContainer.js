/* import - node_modules */
import React, { Component } from "react";
import { connect } from "react-redux";
/* import - CSS */
import styles from "./HomePageContainer.module.css";
/* import - THUNK */
import {
  getTasksThunk,
  changeTaskThunk
} from "../../redux/homePage/homePageReducer";
/* import - COMPONENT */
import HomePage from "./HomePage";
import Filter from "../../components/Filter/Filter";

// https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=3
// https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=1&sort_direction=desc
// https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Name&page=1&sort_field=username&sort_direction=desc

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
          getTasksThunk={getTasksThunk}
        />

        <HomePage
          listTasks={listTasks}
          totalCountTasks={totalCountTasks}
          loginToken={loginToken}
          getTasksThunk={getTasksThunk}
          changeTaskThunk={changeTaskThunk}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  listTasks: state.homePage.items,
  totalCountTasks: state.homePage.totalCountTasks,
  loginToken: state.loginPage.loginToken
});

export default connect(mapStateToProps, { getTasksThunk, changeTaskThunk })(
  HomePageContainer
);

//
//
//
//

// class HomePageContainer extends Component {
//   state = {
//     fieldSort: ""
//   };

//   componentDidMount() {
//     const { location, getTasksThunk } = this.props;

//     /* Находим параметры запроса */
//     const page = new URLSearchParams(location.search).get("page");
//     const sortField = new URLSearchParams(location.search).get("sort_field");
//     const sortDirection = new URLSearchParams(location.search).get(
//       "sort_direction"
//     );

//     if (sortField && sortDirection) {
//       const fieldSort = `&sort_field=${sortField}&sort_direction=${sortDirection}`;

//       this.setState({ fieldSort });
//     }

//     // console.log("URL page", page);
//     // console.log("URL sort_field", sortField);
//     // console.log("URL sort_direction", sortDirection);

//     /* Если номер страницы, поле поиска и как фильтровать */
//     if (page && sortField && sortDirection) {
//       getTasksThunk(page, sortField, sortDirection);
//       return;
//     }

//     /* Если БЕЗ номер страницы, но есть поле поиска и как фильтровать */
//     if (sortField && sortDirection) {
//       getTasksThunk(null, sortField, sortDirection);
//       return;
//     }

//     // /* Если есть только фильтровать */
//     // if (sortDirection) {
//     //   getTasksThunk(null, null, sortDirection);
//     //   return;
//     // }

//     /* Если есть только номер страницы */
//     if (page) {
//       getTasksThunk(page);
//       return;
//     }

//     /* Если не чего нету или не подошло по условиям - грузим первую страницы */
//     getTasksThunk();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { history, location, getTasksThunk } = this.props;

//     const { fieldSort } = this.state;
//     const sortFieldPrev = new URLSearchParams(prevState.fieldSort).get(
//       "sort_field"
//     );
//     const sortDirectionPrev = new URLSearchParams(prevState.fieldSort).get(
//       "sort_direction"
//     );

//     // console.log("URL page", pagePrev);
//     // console.log("URL sort_field", sortFieldPrev);
//     // console.log("URL sort_direction", sortDirectionPrev);

//     const page = new URLSearchParams(location.search).get("page");
//     const sortField = new URLSearchParams(fieldSort).get("sort_field");
//     const sortDirection = new URLSearchParams(fieldSort).get("sort_direction");

//     // console.log("URL page", page);
//     // console.log("URL sort_field", sortField);
//     // console.log("URL sort_direction", sortDirection);

//     if (sortFieldPrev === sortField && sortDirectionPrev === sortDirection)
//       return;
//     // console.log(777);

//     if (!page) {
//       // console.log(77777777777);

//       getTasksThunk(null, sortField, sortDirection);

//       history.push({
//         ...location,
//         search: `sort_field=${sortField}&sort_direction=${sortDirection}`
//       });

//       return;
//     }

//     if (page) {
//       history.push({
//         ...location,
//         search: `page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
//       });

//       getTasksThunk(page, sortField, sortDirection);
//       return;
//     }
//   }

//   handleChangeSelect = ({ target }) => {
//     const { value } = target;

//     this.setState({ fieldSort: value });
//   };

//   render() {
//     // console.log(this.props);
//     const {
//       listTasks,
//       totalCountTasks,
//       loginToken,
//       getTasksThunk,
//       changeTaskThunk
//     } = this.props;

//     const { fieldSort } = this.state;

//     return (
//       <section className={styles.section}>
//         <form className={styles.form}>
//           <select
//             neme="fieldSort"
//             value={fieldSort}
//             onChange={this.handleChangeSelect}
//           >
//             {/* ID */}
//             <option value="&sort_field=id&sort_direction=asc">
//               ID по убыванию
//             </option>
//             <option value="&sort_field=id&sort_direction=desc">
//               ID по воздростанию
//             </option>

//             {/* NAME */}
//             <option value="&sort_field=name&sort_direction=asc">
//               Имена по убыванию
//             </option>
//             <option value="&sort_field=name&sort_direction=desc">
//               Имена по воздростанию
//             </option>

//             {/* E-MAIL */}
//             <option value="&sort_field=email&sort_direction=asc">
//               E-mail по убыванию
//             </option>
//             <option value="&sort_field=email&sort_direction=desc">
//               E-mail по воздростанию
//             </option>

//             {/* STATUS */}
//             <option value="&sort_field=status&sort_direction=asc">
//               Статусы в процессе
//             </option>
//             <option value="&sort_field=status&sort_direction=desc">
//               Статусы выполненые
//             </option>
//           </select>
//         </form>

//         <HomePage
//           listTasks={listTasks}
//           totalCountTasks={totalCountTasks}
//           loginToken={loginToken}
//           getTasksThunk={getTasksThunk}
//           changeTaskThunk={changeTaskThunk}
//         />
//       </section>
//     );
//   }
// }
