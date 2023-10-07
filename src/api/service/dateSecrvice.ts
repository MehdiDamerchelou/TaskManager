import axios from 'axios';
import { dateLinks } from 'src/enum/dateLinks';
export async function getDateNow() {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }
  const token = JSON.parse(tt).accessToken;
  const result = await axios
    .get(dateLinks.getDateNow, {
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
