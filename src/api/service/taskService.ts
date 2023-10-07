import axios from 'axios';
import { taskLinks } from 'src/enum/taskLinks';

export async function createTask(
  taskTitle: string,
  taskDescription: string,
  deadline: string
) {
  const data = {
    label: taskTitle,
    taskDescription: taskDescription,
    taskEndDay: parseInt(deadline),
  };
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .post(taskLinks.createTask, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      return response.status;
    })
    .catch(function (error) {
      console.log(error);
      return error.response.status;
    });
  return result;
}
export async function getAllTask() {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(taskLinks.getTask, {
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
export async function getActiveTaskInfo(taskID: string[]) {
  const data = taskID;
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .post(taskLinks.getActiveTaskInfo, data, {
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
