import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5055/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};



const getCategories = () => {
  return axios.get(API_URL + "categories", { headers: authHeader() });
};

const getBrands = () => {
  return axios.get(API_URL + "brands", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getCategories,
  getBrands,
};