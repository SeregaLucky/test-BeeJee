/* import - node_modules */
import React, { Component } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { toast } from "react-toastify";
/* import - CSS */
import "react-toastify/dist/ReactToastify.css";
import styles from "./LoginPage.module.css";
/* import - selectors */
import loginSelectors from "../../redux/login/loginSelectors";
/* import - THUNK */
// import { loginingThunk } from "../../redux/login/loginReducer2";
// import { loginingThunk } from "../../redux/login/loginReducer";
import { loginingThunk } from "../../redux/login/loginThunk";
/* import - COMPONENT */

toast.configure();

/*
 * COMPONENT
 */
class LoginPage extends Component {
  state = {
    login: "",
    password: ""
  };

  inputIds = {
    loginInputId: shortid.generate(),
    passwordInputId: shortid.generate()
  };

  componentDidUpdate(prevProps) {
    // console.log(111);
    const { isError, makedMistake } = this.props;

    // console.log(prevProps.makedMistake);
    // console.log(makedMistake);

    if (isError && prevProps.isError !== isError) this.errorShow();
    // if (isError) this.errorShow();

    if (makedMistake && prevProps.makedMistake !== makedMistake)
      this.makedMistake(makedMistake.makedMistake);
    // if (makedMistake) this.makedMistake(makedMistake);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { loginingThunk } = this.props;
    const { login, password } = this.state;

    console.log(this.state);

    if (login.length === 0 || password.length === 0) {
      console.log("Все поля обезательные");
      this.missingField();
      return;
    }

    console.log("loginingThunk");
    loginingThunk(login, password);
    // Ввести данные “admin” в поле для имени и “123” в поле для пароля
  };

  missingField = () => {
    toast.warn("Все поля обезательные", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };
  makedMistake = makedMistake => {
    toast.warn(`${makedMistake}`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };
  errorShow = () => {
    toast.error("Произошла ошибка... Попробуйте позде", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  render() {
    const { loginToken, fetchingNow } = this.props;
    const { login, password } = this.state;
    const { loginInputId, passwordInputId } = this.inputIds;
    // console.log(fetchingNow);

    return (
      <section className={styles.section}>
        <h2 className={loginToken && styles.titleInside}>
          {loginToken ? "Вошли=)" : "Войти:"}
        </h2>

        {!loginToken && (
          <form onSubmit={this.handleSubmit} className={styles.form}>
            <label htmlFor={loginInputId}>
              <span>Login:</span>
              <input
                type="text"
                placeholder="Login..."
                name="login"
                value={login}
                onChange={this.handleChange}
                id={loginInputId}
              />
            </label>

            <label htmlFor={passwordInputId}>
              <span>Password</span>
              <input
                type="password"
                placeholder="Password..."
                name="password"
                value={password}
                onChange={this.handleChange}
                id={passwordInputId}
              />
            </label>

            <button
              type="submit"
              className={styles.button}
              disabled={fetchingNow}
            >
              Log in
            </button>
          </form>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  loginToken: loginSelectors.getLoginToken(state),
  fetchingNow: loginSelectors.getIsFetching(state),
  makedMistake: loginSelectors.getMakedMistake(state),
  happenedError: loginSelectors.getError(state)
});

export default connect(mapStateToProps, { loginingThunk })(LoginPage);
