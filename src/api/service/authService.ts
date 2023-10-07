import axios from 'axios';
import { authLinks } from 'src/enum/authLinks';
import { useRouter } from 'vue-router';
export async function getToken(userUserName: string, password: string) {
  const data = {
    username: userUserName,
    password: password,
  };
  const result = await axios
    .post(authLinks.getToken, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.code == 'ERR_NETWORK') {
        return undefined;
      }
      return error.response.status;
    });

  if (result.accessToken) {
    const st = JSON.stringify(result);
    localStorage.setItem('authentication', st);
  }
  return result;
}
export async function refreshToken() {
  const tt: string | null = localStorage.getItem('authentication');
  if (tt === null) {
    return 401;
  }

  const lastToken = JSON.parse(tt).refreshToken;
  const userId = JSON.parse(tt).userId;

  const data = {
    userId: userId,
    refreshToken: lastToken,
  };
  const $router = useRouter();

  const result = await axios
    .post(authLinks.refreshToken, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.status;
    });
  if (result == 401) {
    $router.push({ path: '/auth/login' });
    return;
  }
  if (result.accessToken) {
    const sst = JSON.stringify(result);
    localStorage.setItem('authentication', sst);
    return result;
  }
}
