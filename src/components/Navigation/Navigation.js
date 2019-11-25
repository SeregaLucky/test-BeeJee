/* import - node_modules */
import React from 'react';
import { NavLink } from 'react-router-dom';
/* import - CSS */
import styles from './Navigation.module.css';
/* import - routes */
import routes from '../../routes';

const Navigation = () => (
  <nav className={styles.navigation}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink
          exact
          to={routes.HOME_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Список задач
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={routes.FORM_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Добавить новую задачу
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to={routes.LOGIN_PAGE}
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Войти
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
