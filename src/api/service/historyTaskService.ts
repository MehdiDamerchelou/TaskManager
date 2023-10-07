import axios from 'axios';
import { historyTasksLinks } from 'src/enum/historyTasksLinks';
export async function getHistoryTasksCount(status: boolean) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(historyTasksLinks.getAllCountLink + `/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (respone) {
      return respone.data;
    })
    .catch(function (error) {
      return error;
    });
  return result;
}
export async function getAllHistoryTasks(min: string, status: boolean) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(historyTasksLinks.getAllHistoryTasks + `/${6}/${min}/${status}`, {
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
