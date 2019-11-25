/* import - node_modules */
import React, { Component } from "react";
/* import - CSS */
import styles from "./Filter.module.css";

class Filter extends Component {
  state = {
    fieldSort: ""
  };

  componentDidMount() {
    const { location, getTasksThunk } = this.props;

    /* Находим параметры запроса */
    // const page = new URLSearchParams(location.search).get("page");
    // const sortField = new URLSearchParams(location.search).get("sort_field");
    // const sortDirection = new URLSearchParams(location.search).get(
    //   "sort_direction"
    // );

    const page = this.findParams(location.search).page;
    const sortField = this.findParams(location.search).sortField;
    const sortDirection = this.findParams(location.search).sortDirection;

    if (sortField && sortDirection) {
      const fieldSort = `&sort_field=${sortField}&sort_direction=${sortDirection}`;

      this.setState({ fieldSort });
    }

    /* Если номер страницы, поле поиска и как фильтровать */
    if (page && sortField && sortDirection) {
      getTasksThunk(page, sortField, sortDirection);
      return;
    }

    /* Если БЕЗ номер страницы, но есть поле поиска и как фильтровать */
    if (sortField && sortDirection) {
      getTasksThunk(null, sortField, sortDirection);
      return;
    }

    /* Если есть только номер страницы */
    if (page) {
      getTasksThunk(page);
      return;
    }

    /* Если не чего нету или не подошло по условиям - грузим первую страницы */
    getTasksThunk();
  }

  componentDidUpdate(prevProps, prevState) {
    const { history, location, getTasksThunk } = this.props;
    const { fieldSort } = this.state;

    // const sortFieldPrev = new URLSearchParams(prevState.fieldSort).get(
    //   "sort_field"
    // );
    // const sortDirectionPrev = new URLSearchParams(prevState.fieldSort).get(
    //   "sort_direction"
    // );

    const sortFieldPrev = this.findParams(prevState.fieldSort).sortField;
    const sortDirectionPrev = this.findParams(prevState.fieldSort)
      .sortDirection;

    // const page = new URLSearchParams(location.search).get("page");
    // const sortField = new URLSearchParams(fieldSort).get("sort_field");
    // const sortDirection = new URLSearchParams(fieldSort).get("sort_direction");

    const page = this.findParams(location.search).page;
    const sortField = this.findParams(fieldSort).sortField;
    const sortDirection = this.findParams(fieldSort).sortDirection;

    if (sortFieldPrev === sortField && sortDirectionPrev === sortDirection)
      return;

    if (!page) {
      getTasksThunk(null, sortField, sortDirection);

      history.push({
        ...location,
        search: `sort_field=${sortField}&sort_direction=${sortDirection}`
      });

      return;
    }

    if (page) {
      history.push({
        ...location,
        search: `page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
      });

      getTasksThunk(page, sortField, sortDirection);
      return;
    }
  }

  findParams = params => {
    // const { location } = this.props;
    // const { fieldSort } = this.state;

    const page = new URLSearchParams(params).get("page");
    const sortField = new URLSearchParams(params).get("sort_field");
    const sortDirection = new URLSearchParams(params).get("sort_direction");

    return { page, sortField, sortDirection };
  };

  // const page = new URLSearchParams(location.search).get("page");
  // const sortField = new URLSearchParams(fieldSort).get("sort_field");
  // const sortDirection = new URLSearchParams(fieldSort).get("sort_direction");

  //   findParams = () => {
  //     const { location } = this.props;
  //     const { fieldSort } = this.state;

  //     const page = new URLSearchParams(location.search).get("page");
  //     const sortField = new URLSearchParams(fieldSort).get("sort_field");
  //     const sortDirection = new URLSearchParams(fieldSort).get("sort_direction");

  //     return { page, sortField, sortDirection };
  //   };

  handleChangeSelect = ({ target }) => {
    const { value } = target;

    this.setState({ fieldSort: value });
  };

  render() {
    const { fieldSort } = this.state;

    return (
      <form className={styles.form}>
        <select
          neme="fieldSort"
          value={fieldSort}
          onChange={this.handleChangeSelect}
        >
          {/* ID */}
          <option value="&sort_field=id&sort_direction=asc">
            ID по убыванию
          </option>
          <option value="&sort_field=id&sort_direction=desc">
            ID по воздростанию
          </option>

          {/* NAME */}
          <option value="&sort_field=name&sort_direction=asc">
            Имена по убыванию
          </option>
          <option value="&sort_field=name&sort_direction=desc">
            Имена по воздростанию
          </option>

          {/* E-MAIL */}
          <option value="&sort_field=email&sort_direction=asc">
            E-mail по убыванию
          </option>
          <option value="&sort_field=email&sort_direction=desc">
            E-mail по воздростанию
          </option>

          {/* STATUS */}
          <option value="&sort_field=status&sort_direction=asc">
            Статусы в процессе
          </option>
          <option value="&sort_field=status&sort_direction=desc">
            Статусы выполненые
          </option>
        </select>
      </form>
    );
  }
}

export default Filter;
