import { defineStore } from 'pinia';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';
import {
  eachDutyType,
  DetailsDataType,
  activeTaskType,
  eachActiveTaskType,
  dateType,
} from 'src/type/task-activite-type';

export const useExport = defineStore('export', {
  actions: {
    async exportdataWithDetails(data: DetailsDataType, date: dateType) {
      const doc = new jsPDF('p', 'pt', 'letter');
      doc.setFont('Amiri Regular');
      doc.textWithLink(
        `تمام دیوتی ها با جزئیات از ${date.from} تا ${date.to}`,
        400,
        20,
        'center'
      );
      const temp: string[][] = [];
      data.map((el: eachDutyType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const activiteItem = el.taskActivite[i];
          if (activiteItem.taskActiviteDescription.length == 0) {
            activiteItem.taskActiviteDescription = 'به پایان نرسیده';
          }
          temp.push(
            [
              `توضیحات تسک : ${activiteItem.task.taskDescription}`,
              `تاریخ شروع : ${convertADToSolar(
                activiteItem.taskActiviteCreateDate
              )}`,
              `نام تسک : ${activiteItem.task.label}`,
            ],
            [
              `توضیحات پایانی : ${activiteItem.taskActiviteDescription}`,
              `تاریخ پایان : ${convertADToSolar(
                activiteItem.taskActualEndDate
              )}`,
              `تاریخ مهلت : ${convertADToSolar(
                activiteItem.taskActiviteEndDate
              )}`,
            ]
          );
        }
        autoTable(doc, {
          styles: {
            cellWidth: 'auto',
            font: 'Amiri Regular',
            halign: 'right',
          },
          head: [
            [
              `شماره تلفن : ${el.phoneNumber}`,
              '',
              `نام و نام خانوادگی : ${el.label}`,
            ],
          ],
          body: temp,
        });
      });

      doc.save('table.pdf', {
        returnPromise: true,
      });
      return true;
    },
    async exportdataActive(res: activeTaskType, date: dateType) {
      const doc = new jsPDF();
      doc.setFont('Amiri Regular');
      doc.textWithLink(
        `دیوتی های فعال از ${date.from} تا ${date.to}`,
        150,
        10,
        'center'
      );
      const temp: string[][] = [];
      res.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const activeItem = el.taskActivite[i];
          if (activeItem.taskActiviteDescription.length == 0) {
            activeItem.taskActiviteDescription = 'به پایان نرسیده';
          }
          temp.push([
            activeItem.task.taskDescription,
            convertADToSolar(activeItem.taskActiviteEndDate),
            convertADToSolar(activeItem.taskActiviteCreateDate),
            activeItem.task.label,
          ]);
        }

        autoTable(doc, {
          styles: {
            cellWidth: 'auto',
            font: 'Amiri Regular',
            halign: 'right',
          },
          head: [
            ['', `${el.label}`, 'نام کاربر', ''],
            ['توضیحات دیوتی', 'تاریخ مهلت', 'تاریخ شروع', 'نام دیوتی'],
          ],
          body: temp,
        });
      });

      doc.save('table.pdf', {
        returnPromise: true,
      });
      return true;
    },
    async exportdataHistory(res: activeTaskType, date: dateType) {
      const doc = new jsPDF();
      doc.setFont('Amiri Regular');
      doc.textWithLink(
        `دیوتی های تمام شده از ${date.from} تا ${date.to}`,
        150,
        10,
        'center'
      );
      autoTable(doc, {
        styles: {
          cellWidth: 'auto',
          font: 'Amiri Regular',
          halign: 'right',
        },
        head: [],
        body: [],
      });
      const temp: string[][] = [];
      res.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const historyItem = el.taskActivite[i];
          if (historyItem.taskActiviteDescription.length == 0) {
            historyItem.taskActiviteDescription = 'به پایان نرسیده';
          }
          temp.push([
            historyItem.taskActiviteDescription,
            convertADToSolar(historyItem.taskActualEndDate),
            convertADToSolar(historyItem.taskActiviteEndDate),
            convertADToSolar(historyItem.taskActiviteCreateDate),
            historyItem.task.label,
          ]);
        }

        autoTable(doc, {
          styles: {
            cellWidth: 'auto',
            font: 'Amiri Regular',
            halign: 'right',
          },
          head: [
            ['', `${el.label}`, 'نام کاربر', '', ''],
            ['توضیحات', 'تاریخ پایان', 'تاریخ مهلت', 'تاریخ شروع', 'نام دیوتی'],
          ],
          body: temp,
        });
      });
      doc.save('table.pdf', {
        returnPromise: true,
      });
      return true;
    },
    async exportdataAll(data: activeTaskType, date: dateType) {
      const doc = new jsPDF();
      doc.setFont('Amiri Regular');
      doc.textWithLink(
        `تمام دیوتی ها از ${date.from} تا ${date.to}`,
        150,
        10,
        'center'
      );

      const temp: string[][] = [];
      data.map((el: eachActiveTaskType) => {
        if (!el.taskActivite) {
          return;
        }
        for (let i = 0; i < el.taskActivite.length; i++) {
          const historyItem = el.taskActivite[i];
          if (historyItem.taskActiviteDescription.length == 0) {
            historyItem.taskActiviteDescription = 'به پایان نرسیده';
          }
          temp.push([
            historyItem.taskActiviteDescription,
            convertADToSolar(historyItem.taskActualEndDate),
            convertADToSolar(historyItem.taskActiviteEndDate),
            convertADToSolar(historyItem.taskActiviteCreateDate),
            historyItem.task.label,
          ]);
        }

        autoTable(doc, {
          styles: {
            cellWidth: 'auto',
            font: 'Amiri Regular',
            halign: 'right',
          },
          head: [
            ['', `${el.label}`, 'نام کاربر', '', ''],
            ['توضیحات', 'تاریخ پایان', 'تاریخ مهلت', 'تاریخ شروع', 'نام دیوتی'],
          ],
          body: temp,
        });
      });
      doc.save('table.pdf', {
        returnPromise: true,
      });
      return true;
    },
  },
});
