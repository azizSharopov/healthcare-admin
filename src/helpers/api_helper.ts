import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";

const { api } = config;

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const authUser: any = sessionStorage.getItem("authUser")
// const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3NlcSI6MSwidXNlcl9pZCI6Im1yaGVhbHRoIiwidXNlcl9uYW1lIjoi66-4656YIiwidXNlcl9lbWFpbCI6ImFkbWluQG1yLmNvbSIsInVzZXJfYmlydGgiOiIxOTcwLTAxLTAxIiwidXNlcl9tb2JpbGUiOiIwMTAtNTUyMy01NDM3IiwidXNlcl9nZW5kZXIiOiJNIiwidXNlcl96aXAiOm51bGwsInVzZXJfYWRkcjEiOm51bGwsInVzZXJfYWRkcjIiOm51bGwsImF1dGhfc2VxIjo0LCJhdXRoX2NvZGUiOiJTVVBFUl9BRE1JTiIsImF1dGhfbmFtZSI6Iuy0neq0hOq0gOumrOyekCIsInNuc19zZXEiOm51bGwsInNuc19uYW1lIjoiTk9NQUwiLCJob3Nfc2VxIjpudWxsLCJob3NfbmFtZSI6bnVsbCwiZW50ZXJfc2VxIjpudWxsLCJlbnRlcl9uYW1lIjpudWxsLCJzdGF0ZV9zZXEiOjEsInN0YXRlX25hbWUiOiLsoJXsg4EiLCJzdGF0ZV9jb250ZW50Ijoi7KCV7IOB7KCB7Jy866GcIOyEnOu5hOyKpCDsnbTsmqkg6rCA64ql7ZWcIO2ajOybkCIsImxvZ2luX2FibGVfeW4iOiJZIiwiaWF0IjoxNzE0NDU4NDkxLCJleHAiOjE3MjMwOTg0OTF9.HGnoj7_faDHvflFoE6jj9ppAMr4YeX-DbkKNVNIxByM"
if (token) axios.defaults.headers.token = token
// axios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string) => {
  axios.defaults.headers.token = token
  // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    let response: Promise<AxiosResponse>;

    let paramKeys: string[] = [];

    if (params) {
      Object.keys(params).map(key => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url: string, data: any) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  put = (url: string, data: any) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}
const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };