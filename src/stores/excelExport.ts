import { defineStore } from 'pinia';
import { exportFile } from 'quasar';
import * as XLSX from 'xlsx';

export const useXlsExportStore = defineStore('xlsExport', {
  actions: {
    async xlsExportdata(newData: []) {
      const workbook = XLSX.utils.book_new();
      workbook.Workbook = { Views: [{ RTL: true }] };
      const worksheet = XLSX.utils.aoa_to_sheet(newData);
      const wscols = [{ wch: 6 }, { wch: 7 }, { wch: 10 }, { wch: 20 }];
      worksheet['!cols'] = wscols;
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const buffer = XLSX.write(workbook, { type: 'buffer' });

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      exportFile('report.xlsx', blob);
      return true;
    },
  },
});
