/* import - node_modules */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
/* import - CSS */
import styles from "./Paginator.module.css";

// https://www.npmjs.com/package/react-paginate
// https://github.com/AdeleD/react-paginate/blob/master/demo/js/demo.js

/*
 * COMPONENT
 */
class Paginator extends Component {
  componentDidMount() {}

  handlePageClick = data => {
    const page = data.selected + 1;

    const { history, location, getTasksThunk } = this.props;

    const sortField = new URLSearchParams(location.search).get("sort_field");
    const sortDirection = new URLSearchParams(location.search).get(
      "sort_direction"
    );

    /* Если номер страницы, поле поиска и как фильтровать */
    if (sortField && sortDirection) {
      getTasksThunk(page, sortField, sortDirection);

      history.push({
        ...location,
        search: `page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
      });

      return;
    }

    /* Если не чего не подошло делаем это */
    history.push({
      ...location,
      search: `page=${page}&sort_field=id&sort_direction=asc`
    });
    getTasksThunk(page);
  };

  render() {
    // console.log("props Paginator", this.props);

    const { totalCountTasks } = this.props;

    const pageCount = Math.ceil(Number(totalCountTasks) / 3);

    return (
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        // pageCount={this.state.pageCount} // Общее количество страниц.
        pageCount={pageCount} // Общее количество страниц.
        marginPagesDisplayed={2} // Количество страниц для отображения полей.
        pageRangeDisplayed={5} // диапазон отображаймых страниц
        onPageChange={this.handlePageClick}
        // containerClassName={"pagination"}
        containerClassName={styles.pagination}
        subContainerClassName={"pages pagination"}
        activeClassName={styles.linkActive}
      />
    );
  }
}

export default withRouter(Paginator);
