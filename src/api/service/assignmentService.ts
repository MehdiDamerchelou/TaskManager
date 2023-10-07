import axios from 'axios';
import { activeLinks } from 'src/enum/assignmentLinks';
export async function createAssignment(userID: string, taskID: string) {
  const data = {
    userID: userID,
    taskID: taskID,
  };

  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .post(activeLinks.createAssignment, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.status;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return result;
}
export async function getActiveTask(min: number, status: boolean) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(activeLinks.getActiveTask + `/${6}/${min}/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return result;
}
export async function getActiveTaskCount(status: boolean) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(activeLinks.getActiveTaskCount + `/${status}`, {
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
export async function actualEndTask(taskActiveID: string, description: string) {
  const data = { taskActiviteDescription: description };
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .patch(activeLinks.actualEndTask + `/${taskActiveID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function () {
      return 200;
      // return response.status;
    })
    .catch(function (error) {
      return error.response.status;
    });
  return result;
}
