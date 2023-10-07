import { defineStore } from 'pinia';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../public/Amiri Regular-normal';

import {
  getAllTaskWidthDate,
  getTasksByUserId,
} from 'src/api/service/exportService';
import { getActiveTaskInfo } from 'src/api/service/taskService';
import { getUserWithActiveTask } from 'src/api/service/userService';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';
import { taskActiviteType } from 'src/type/task-activite-type';

export const useExportDetails = defineStore('exportDetails', {
  actions: {
    async exportdata(data: any) {
      console.log(data);

      const doc = new jsPDF();
      doc.setFont('Amiri Regular');
      const temp: any = [];
      for (let i = 0; i < data.length; i++) {
        const el = data.Users[i];

        data.TaskActivate.map((item1: any) => {
          if (item1.userID !== el.id) {
            return;
          }
          data.Tasks.map((item2: any) => {
            if (item1.taskID !== item2.taskID) {
              return;
            }
            temp.push(
              [
                `توضیحات تسک : ${item2.taskDescription}`,
                `تاریخ شروع : ${item1.taskActiviteCreateDate}`,
                `نام تسک : ${item2.label}`,
              ],
              [
                `توضیحات پایانی : ${item1.description}`,
                `تاریخ پایان : ${item1.taskActualEndDate}`,
                `تاریخ مهلت : ${item1.taskActiviteEndDate}`,
              ]
            );
          });
        });

        autoTable(doc, {
          styles: { font: 'Amiri Regular', halign: 'right' },
          head: [
            [
              `شماره تلفن : ${el.phoneNumber}`,
              `نام کاربری : ${el.username}`,
              `نام و نام خانوادگی : ${el.label}`,
            ],
          ],
          body: temp,
        });
      }
      doc.save('table.pdf');
    },
    async exportdata1(data: any[]) {
      const doc = new jsPDF();
      doc.setFont('Amiri Regular');
      for (let d = 0; d < data.length; d++) {
        const el = data[d];
        const temp = [];
        for (let i = 0; i < data[d].tasksdata.length; i++) {
          const el1 = el.tasksdata[i];

          temp.push(
            [
              `توضیحات تسک : ${el1.taskData.taskDescription}`,
              `تاریخ شروع : ${el1.date.taskActiviteCreateDate}`,
              `نام تسک : ${el1.taskData.label}`,
            ],
            [
              `توضیحات پایانی : ${el1.description}`,
              `تاریخ پایان : ${el1.date.taskActualEndDate}`,
              `تاریخ مهلت : ${el1.date.taskActiviteEndDate}`,
            ]
          );
        }
        autoTable(doc, {
          styles: { font: 'Amiri Regular', halign: 'right' },
          head: [
            [
              `شماره تلفن : ${el.userData.phone}`,
              '',
              `نام و نام خانوادگی : ${el.userData.label}`,
            ],
          ],
          body: temp,
        });
      }

      doc.save('table.pdf');
    },
  },
});
