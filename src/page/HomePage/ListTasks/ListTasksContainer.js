/* import - node_modules */
import React, { Component } from "react";
import { connect } from "react-redux";
/* import - CSS */
import styles from "./ListTasks.module.css";
/* import - COMPONENT */
import ListTasks from "./ListTasks";
/* import - THUNK */
import { getTasksThunk } from "../../../redux/listTasks/listTasksReducer";

class ListTasksContainer extends Component {
  componentDidMount() {
    const { getTasksThunk } = this.props;

    getTasksThunk();
  }

  render() {
    const { listTasks } = this.props;

    return (
      <>
        <p>111</p>

        <ListTasks listTasks={listTasks} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  listTasks: state.listTasks.items
});

// export default connect(mapStateToProps, { getTasksThunk })(ListTasksContainer);
