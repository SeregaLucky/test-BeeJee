/* import - node_modules */
import React, { Component } from "react";
/* import - CSS */
import styles from "./ListTasks.module.css";

/*
 * COMPONENT
 */
class ListTasks extends Component {
  state = {
    // isEdit: false,
    // arrayNowEdit: null,

    idNowEdit: null,

    text: "",
    status: null
  };

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

  render() {
    const { listTasks, loginToken } = this.props;
    const { idNowEdit, text, status } = this.state;

    // console.log(loginToken);
    return (
      <>
        {listTasks.length > 0 && (
          <ul className={styles.list}>
            {listTasks.map(task => (
              <li key={task.id} className={styles.item}>
                {/* <img src={task.image_path} alt="avatar" /> */}

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

                    <button type="submit">Отправить</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default ListTasks;

//
//
//
//

// const ListTasks = ({ listTasks, loginToken }) => {
//   console.log(loginToken);
//   return (
//     <>
//       {listTasks.length > 0 && (
//         <ul>
//           {listTasks.map(task => (
//             <li key={task.id}>
//               {/* <img src={task.image_path} alt="avatar" /> */}

//               <p>Имя: {task.username}</p>
//               <p>e-mail: {task.email}</p>
//               <p>Задача: {task.text}</p>

//               {loginToken && <button>Редактировать</button>}

//               <p>
//                 Статус задачи: {task.status === 10 ? "Выполнен" : "В процессе"}
//               </p>
//               {/* <input type="checkbox" checked={task.text.status === 10} /> */}

//               <hr />
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// };

// export default ListTasks;
