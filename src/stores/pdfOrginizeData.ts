import { defineStore } from 'pinia';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';
import {
  DetailsDataType,
  eachDutyType,
  activeTaskType,
  eachActiveTaskType,
} from 'src/type/task-activite-type';
export const usePdfOrginize = defineStore('orginize', {
  actions: {
    pdfOrginizeHistoryTask(res: activeTaskType) {
      const temp: string[][] = [];
      // res.map((el: eachActiveTaskType) => {
      //   if (!el.taskActivite) {
      //     return;
      //   }
      //   el.taskActivite[0]
      //   if (el.taskActivite.taskActiviteDescription.length == 0) {
      //     el.taskActivite.taskActiviteDescription = 'به پایان نرسیده';
      //   }
      //   temp.push([el.taskActivite.])
      //   temp.push([
      //     `${el.taskActiviteDescription}`,
      //     `${convertADToSolar(el.taskActualEndDate)}`,
      //     `${convertADToSolar(el.taskActiviteEndDate)}`,
      //     `${convertADToSolar(el.taskActiviteCreateDate)}`,
      //     `${el.task.label}`,
      //     `${el.user.label}`,
      //   ]);
      // });

      return temp;
    },
    pdfOrginizeActiveTask(res: DetailsDataType) {
      const temp: string[][] = [];
      res.map((el: eachDutyType) => {
        temp.push([
          `${el.task.taskDescription}`,
          `${convertADToSolar(el.taskActiviteEndDate)}`,
          `${convertADToSolar(el.taskActiviteCreateDate)}`,
          `${el.task.label}`,
          `${el.user.label}`,
        ]);
      });
      return temp;
    },
    pdfOrginizeAllTask(res: DetailsDataType) {
      const temp: string[][] = [];
      res.map((el: eachDutyType) => {
        if (el.taskActiviteDescription.length == 0) {
          el.taskActiviteDescription = 'به پایان نرسیده';
        }

        temp.push([
          `${el.taskActiviteDescription}`,
          `${convertADToSolar(el.taskActualEndDate)}`,
          `${convertADToSolar(el.taskActiviteEndDate)}`,
          `${convertADToSolar(el.taskActiviteCreateDate)}`,
          `${el.task.label}`,
          `${el.user.label}`,
        ]);
      });
      return temp;
    },
  },
});
