/* import - node_modules */
import React, { Component } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import T from 'prop-types';
import { toast } from 'react-toastify';
/* import - CSS */
import 'react-toastify/dist/ReactToastify.css';
import styles from './FormPage.module.css';
/* import - selectors */
import formSelectors from '../../redux/form/formSelectors';
/* import - THUNK */
// import { addNewTaskThunk } from '../../redux/form/formThunk';
import thunk from '../../redux/form/formThunk';

toast.configure();

/*
 * COMPONENT
 */
class FormPage extends Component {
  static defaultProps = {
    newTask: null,
    happenedError: null,
  };

  static propTypes = {
    newTask: T.shape(),
    fetchingNow: T.bool.isRequired,
    happenedError: T.shape(),
    addNewTaskThunk: T.func.isRequired,
  };

  state = {
    username: '',
    email: '',
    text: '',
  };

  inputIds = {
    usernameInputId: shortid.generate(),
    emailInputId: shortid.generate(),
    textInputId: shortid.generate(),
  };

  componentDidUpdate(prevProps) {
    const { newTask, happenedError } = this.props;

    if (newTask !== prevProps.newTask) {
      this.addNewTask();
    }

    if (happenedError) this.errorShow();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { addNewTaskThunk } = this.props;
    const { username, email, text } = this.state;

    const isUsername = username.length;
    const isEmail = email.length;
    const isText = text.length;

    if (!isUsername || !isEmail || !isText) {
      this.makedMistake();

      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      this.notValidation();
      return;
    }

    addNewTaskThunk(username, email, text);

    this.setState({
      username: '',
      email: '',
      text: '',
    });
  };

  addNewTask = () => {
    toast.info('Новая задача добавлена!)', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  makedMistake = () => {
    toast.warn('Заполните все поля', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  makedMistake = () => {
    toast.warn('Заполните все поля', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  notValidation = () => {
    toast.warn('Не прошли на вволидацию', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  errorShow = () => {
    toast.error('Произошла ошибка... Попробуйте позде', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  render() {
    const { fetchingNow } = this.props;
    const { username, email, text } = this.state;
    const { usernameInputId, emailInputId, textInputId } = this.inputIds;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={usernameInputId} className={styles.label}>
          <span>Имя:</span>
          <input
            type="text"
            placeholder="Имя..."
            name="username"
            value={username}
            onChange={this.handleChange}
            id={usernameInputId}
          />
        </label>

        <label htmlFor={emailInputId} className={styles.label}>
          <span>E-mail:</span>
          <input
            type="text"
            placeholder="e-mail..."
            name="email"
            value={email}
            onChange={this.handleChange}
            id={emailInputId}
          />
        </label>

        <label htmlFor={textInputId} className={styles.label}>
          <span>Задача:</span>
          <textarea
            type="text"
            placeholder="Задача..."
            name="text"
            value={text}
            onChange={this.handleChange}
            id={textInputId}
            className={styles.textarea}
          />
        </label>

        <button type="submit" className={styles.button} disabled={fetchingNow}>
          Добавить задачу
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  newTask: formSelectors.getNewTask(state),
  fetchingNow: formSelectors.getIsFetching(state),
  happenedError: formSelectors.getError(state),
});

// export default connect(mapStateToProps, { addNewTaskThunk })(FormPage);
const { addNewTaskThunk } = thunk;
export default connect(mapStateToProps, { addNewTaskThunk })(FormPage);
