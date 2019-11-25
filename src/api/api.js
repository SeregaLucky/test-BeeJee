/* import - node_modules */
import axios from "axios";

const instance = axios.create({
  baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2"
});

// https://cors-anywhere.herokuapp.com/
// x-www-form-urlencoded

export const homePageAPI = {
  // getTasks(page = 1) {
  //   // console.log(page);

  //   return instance
  //     .get(`/?developer=Name&page=${page}`)
  //     .then(res => res.data)
  //     .catch(err => {
  //       throw err;
  //     });
  // },

  getTasks(page = 1, sort_field = "id", sort_direction = "asc") {
    return instance
      .get(
        `/?developer=Name&page=${page}&sort_field=${sort_field}&sort_direction=${sort_direction}`
      )
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },

  getAllTasksSort(sortField, sortDirection = "asc") {
    return instance
      .get(
        `/?developer=Name&sort_field=${sortField}$sort_direction=${sortDirection}`
      )
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },

  addTask(username, email, text) {
    console.log(username, email, text);

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("email", email);
    params.append("text", text);

    return instance
      .post(`/create?developer=${username}`, params)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  },

  changeTask(id, text, status, token) {
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("text", text);
    params.append("status", status);

    return instance
      .post(`/edit/${id}/?developer=Name`, params)
      .then(res => res.data)
      .catch(err => {
        throw err;
      });
  }
};

export const loginPageAPI = {
  postLigin(username, password) {
    console.log(username, password);

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    return instance
      .post("/login/?developer=Name", params)
      .then(res => {
        const token = res.data.message.token;
        console.log(token);

        return res.data;
      })
      .catch(err => {
        throw err;
      });
  }
};
// Ввести данные “admin” в поле для имени и “123” в поле для пароля
