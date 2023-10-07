import { defineStore } from 'pinia';
import { refreshToken as refresh, getToken } from 'src/api/service/authService';
export const useToken = defineStore('Token', {
  state: () => ({
    isLoggined: false,
    expire: 300 * 1000 - 60000,
  }),
  actions: {
    async refreshToken() {
      const res = await refresh();
      this.expire = parseInt(res.expiresAccsessToken) * 1000 - 60000;
    },
    async userlogin(userUserName: string, password: string) {
      const res = await getToken(userUserName, password);
      if (res.refreshToken) {
        this.isLoggined == true;
        setInterval(() => {
          this.refreshToken();
        }, res.expiresAccsessToken * 1000);
      }
      return res;
    },
  },
});
