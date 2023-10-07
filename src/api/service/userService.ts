import axios from 'axios';
import { userLinks } from 'src/enum/userLinks';

export async function createUser(
  username: string,
  userUserName: string,
  password: string,
  phone: string
) {
  const data = {
    label: userUserName,
    username: username,
    password: password,
    phoneNumber: phone,
  };
  const result = await axios
    .post(userLinks.createUser, data)
    .then(function (response) {
      return response.status;
    })
    .catch(function (error) {
      console.log(error);

      return error.response.status;
    });
  return result;
}

export async function getAllUser() {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(userLinks.getUser, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return result;
}

export async function getUserWithActiveTask(userID: string[]) {
  const data = userID;
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .post(userLinks.getUserWithActiveTask, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return result;
}
