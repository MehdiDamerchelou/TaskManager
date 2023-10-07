import { defineStore } from 'pinia';
import {
  activeTaskType,
  eachActiveTaskType,
  DetailsDataType,
  eachDutyType,
  dateType,
} from 'src/type/task-activite-type';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';
export const useXlsOrginize = defineStore('xlsOrginize', {
  actions: {
    xlsOrginizeDetaileTask(newData: DetailsDataType, date: dateType) {
      const data: string[][] = [
        ['', 'از', date.from, 'تا', date.from, '', ''],
        [
          'نام کاربر',
          'تلفن کاربر',
          'نام دیوتی',
          'تاریخ شروع',
          'تاریخ مهلت',
          'تاریخ پایان',
          ' توضیحات پایانی',
        ],
      ];

      newData.map((el: eachDutyType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const item = el.taskActivite[i];
          if (item.taskActiviteDescription.length == 0) {
            item.taskActiviteDescription = 'به پایان نرسیده';
          }
          data.push([
            el.label,
            el.phoneNumber,
            item.task.label,
            convertADToSolar(item.taskActiviteCreateDate),
            convertADToSolar(item.taskActiviteEndDate),
            convertADToSolar(item.taskActualEndDate),
            item.taskActiviteDescription,
          ]);
        }
      });
      return data;
    },
    xlsOrginizeAllTask(newData: activeTaskType, date: dateType) {
      const data: string[][] = [
        ['', 'از', date.from, 'تا', date.from, '', ''],
        [
          'نام کاربر',
          'نام دیوتی',
          'تاریخ شروع',
          'تاریخ مهلت',
          'تاریخ پایان',
          'توضیحات پایانی',
        ],
      ];

      newData.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const item = el.taskActivite[i];
          if (item.taskActiviteDescription.length == 0) {
            item.taskActiviteDescription = 'به پایان نرسیده';
          }
          data.push([
            el.label,
            item.task.label,
            convertADToSolar(item.taskActiviteCreateDate),
            convertADToSolar(item.taskActiviteEndDate),
            convertADToSolar(item.taskActualEndDate),
            item.taskActiviteDescription,
          ]);
        }
      });
      return data;
    },
    xlsOrginizeAciveTask(newData: activeTaskType, date: dateType) {
      const data: string[][] = [
        ['', 'از', date.from, 'تا', date.from, '', ''],
        ['نام کاربر', 'نام دیوتی', 'تاریخ شروع', 'تاریخ مهلت', 'توضیحات دیوتی'],
      ];

      newData.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const item = el.taskActivite[i];
          if (item.taskActiviteDescription.length == 0) {
            item.taskActiviteDescription = 'به پایان نرسیده';
          }
          data.push([
            el.label,
            item.task.label,
            convertADToSolar(item.taskActiviteCreateDate),
            convertADToSolar(item.taskActiviteEndDate),
            item.task.taskDescription,
          ]);
        }
      });
      return data;
    },
    xlsOrginizeHistoryTask(newData: activeTaskType, date: dateType) {
      const data: string[][] = [
        ['', 'از', date.from, 'تا', date.from, '', ''],
        [
          'نام کاربر',
          'نام دیوتی',
          'تاریخ شروع',
          'تاریخ مهلت',
          'تاریخ پایان',
          'توضیحات پایانی',
        ],
      ];

      newData.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const item = el.taskActivite[i];
          if (item.taskActiviteDescription.length == 0) {
            item.taskActiviteDescription = 'به پایان نرسیده';
          }
          data.push([
            el.label,
            item.task.label,
            convertADToSolar(item.taskActiviteCreateDate),
            convertADToSolar(item.taskActiviteEndDate),
            convertADToSolar(item.taskActualEndDate),
            item.taskActiviteDescription,
          ]);
        }
      });
      return data;
    },
  },
});
