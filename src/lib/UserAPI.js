import axios from "axios";

const baseURL = "http://127.0.0.1:5000";

export async function register(newUser) {
  try {
    let response = await axios.post(`${baseURL}/users/register`, {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export async function login(user) {
  try {
    let response = await axios.post(`${baseURL}/users/login`, {
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("usertoken", response.data.token);
    return response;
  } catch (error) {
    return error.response;
  }
}
