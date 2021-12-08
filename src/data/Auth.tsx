import axios from "axios";

export async function registerUser(email: string, password: string) {
  let newUser = {
    email: email,
    password: password,
  };

  try {
    let res = await axios.post(
      process.env.REACT_APP_API + `/users/register`,
      newUser
    );
    return res.status;
  } catch (e) {
    console.log(e);
  }
}

export async function loginUser(email: string, password: string) {
  let loginInfo = {
    email: email,
    password: password,
  };

  try {
    let res = await axios.post(
      process.env.REACT_APP_API + `/users/login`,
      loginInfo
    );
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
}
