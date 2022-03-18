import axios from 'axios';

const API_URL = 'https://teste-mypharma.herokuapp.com/';

const register = async (name, email, password) => {
  const payload = {
    name: name,
    email: email,
    password: password
  }

  return axios.post(`${API_URL}users`, payload );
};

const login = (email, password) => {
  return axios
    .post(`${API_URL}login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.accessToken));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};
export default {
  register,
  login,
  logout,
};