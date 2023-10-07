import { defineStore } from 'pinia';
import {
  getAllDataWidthDate,
  getOneStatusTaskWidthDate,
  getAllTaskWidthDate,
} from 'src/api/service/exportService';

export const useNewData = defineStore('counter', {
  actions: {
    async getAllData(from: number, to: number) {
      const res = await getAllDataWidthDate(from, to);
      if (res == undefined) {
        return undefined;
      }
      return res;
    },
    async getAllActiveTask(from: number, to: number) {
      const data = await getOneStatusTaskWidthDate(from, to, false);
      if (data == undefined) {
        return undefined;
      }
      return data;
    },
    async getAllHistoryTask(from: number, to: number) {
      const data = await getOneStatusTaskWidthDate(from, to, true);
      if (data == undefined) {
        return undefined;
      }

      return data;
    },
    async getAllTask(from: number, to: number) {
      const data = await getAllTaskWidthDate(from, to);
      if (data == undefined) {
        return undefined;
      }
      return data;
    },
  },
});
