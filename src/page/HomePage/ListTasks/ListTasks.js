/* import - node_modules */
import React, { Component } from "react";
import { toast } from "react-toastify";
/* import - CSS */
import "react-toastify/dist/ReactToastify.css";
import styles from "./ListTasks.module.css";

toast.configure();

/*
 * COMPONENT
 */
class ListTasks extends Component {
  state = {
    idNowEdit: null,
    text: "",
    status: null
  };

  componentDidUpdate(prevProps) {
    const { happenedError, finishToken } = this.props;

    /* Предупреждение об ошибке */
    if (happenedError && prevProps.happenedError !== happenedError)
      this.errorShow();

    /* Предупреждение об что закончился токен */
    if (finishToken && prevProps.finishToken !== finishToken)
      this.finishToken();
  }

  handleClick = (id, text, status) => {
    const { idNowEdit } = this.state;

    if (!idNowEdit) {
      this.setState({
        idNowEdit: id,

        text: text,
        status: status === 10
      });

      return;
    }

    this.setState({ idNowEdit: null });
  };

  handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    this.setState({ [name]: type === "checkbox" ? checked : value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { loginToken, changeTaskThunk } = this.props;
    const { idNowEdit, text, status } = this.state;

    changeTaskThunk(idNowEdit, text, status, loginToken);
  };

  finishToken = () => {
    toast.warn("Токен истёк", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };
  errorShow = () => {
    toast.error("Произошла ошибка... Попробуйте позде", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  render() {
    const { listTasks, loginToken, fetchingNow } = this.props;
    const { idNowEdit, text, status } = this.state;
    return (
      <>
        {listTasks.length > 0 && (
          <ul className={styles.list}>
            {listTasks.map(task => (
              <li key={task.id} className={styles.item}>
                <div className={styles.photo}>
                  <img src={task.image_path} alt="avatar" />
                </div>

                <div className={styles.rigthContent}>
                  <p>
                    <b>Имя:</b> {task.username}
                  </p>
                  <p>
                    <b>E-mail:</b> {task.email}
                  </p>
                  <p>
                    <b>Задача:</b> {task.text}
                  </p>

                  <p>
                    <b>Статус задачи:</b>{" "}
                    {task.status === 10 ? "Выполнен" : "В процессе"}
                  </p>

                  {loginToken && (
                    <button
                      type="button"
                      onClick={() =>
                        this.handleClick(task.id, task.text, task.status)
                      }
                    >
                      {idNowEdit ? "Отмена" : "Редактировать"}
                    </button>
                  )}

                  {/* FORM CHANGE */}
                  {idNowEdit === task.id && (
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="text"
                        name="text"
                        value={text}
                        onChange={this.handleChange}
                      />

                      <input
                        type="checkbox"
                        name="status"
                        checked={status}
                        onChange={this.handleChange}
                      />

                      <button type="submit" disabled={fetchingNow}>
                        Отправить
                      </button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ListTasks;
