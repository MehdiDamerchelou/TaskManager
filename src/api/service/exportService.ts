import axios from 'axios';
import { exportLinks } from 'src/enum/exportLinks';

export async function getAllDataWidthDate(startDate: number, endDate: number) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const resualt = await axios
    .get(exportLinks.getAlldataLink + `/${startDate}/${endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (respone) {
      return respone.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return resualt;
}
export async function getAllTaskWidthDate(startDate: number, endDate: number) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const resualt = await axios
    .get(exportLinks.getAllTaskLink + `/${startDate}/${endDate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (respone) {
      return respone.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return resualt;
}
export async function getOneStatusTaskWidthDate(
  startDate: number,
  endDate: number,
  status: boolean
) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const resualt = await axios
    .get(exportLinks.getOneStatuseLink + `/${startDate}/${endDate}/${status}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (respone) {
      return respone.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return resualt;
}
export async function getTasksByUserId(userId: string) {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const resualt = await axios
    .get(exportLinks.getTasksByUserId + `/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(function (respone) {
      return respone.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return resualt;
}
