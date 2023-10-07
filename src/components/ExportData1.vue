<template>
  <div class="row text-center items-center justify-center">
    <q-card
      class="row justify-center bg-transparent sdsadasdasdasd width-100 no-shadow column"
    >
      <q-card-section class="text-h5"> دریافت خروجی از اطلاعات </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-date
          v-model="date"
          title="تاریخ سفارشی"
          subtitle=" "
          class="bg-all q-pa-none"
          calendar="persian"
          color="red-4"
          text-color="black"
          range
        ></q-date>
      </q-card-section>
      <q-card-section class="q-pa-none"> </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-btn
          class="q-mx-xs q-pa-md text-main-color col"
          @click="date = { from: '', to: '' }"
          >پاک کن</q-btn
        >
        <q-btn
          class="text-main-color col q-px-xl q-pa-md text-body1 text-weight-bold"
          label="دریافت اطلاعات"
          @click="sendDate"
        ></q-btn>
      </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-dialog
          v-model="dialog"
          maximized
          full-height
          full-width
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card class="bg-all">
            <q-card-section class="">
              <img
                src="../assets/close.svg"
                class="cursor-pointer"
                alt=""
                width="25"
                v-close-popup
              />
            </q-card-section>
            <div class="row dir-rtl text-center items-center justify-center">
              <q-card
                class="row justify-center bg-transparent width-100 no-shadow column"
              >
                <q-card-section class="text-h5 text-weight-bold">
                  اطلاعات {{ date.from }} تا {{ date.to }} رو میخام
                </q-card-section>
                <q-card-section
                  class="text-weight-bold text-green"
                  v-if="exportres"
                >
                  دریافت اطلاعات موفقیت آمیز بود
                </q-card-section>
                <q-card-section
                  class="text-weight-bold text-red"
                  v-if="exportres == false"
                >
                  اطلاعاتی وجود ندارد
                </q-card-section>
              </q-card>
              <q-card class="bg-all q-ma-sm">
                <q-card-section class="text-h6"
                  >دیوتی های تکمیل شده</q-card-section
                >
                <q-card-section
                  ><img src="../assets/check-document.svg" alt=""
                /></q-card-section>
                <q-card-section class="q-px-md q-py-none">
                  <q-btn
                    @click="getDoneTasks('xls')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی xls بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/excel-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-px-md q-py-sm">
                  <q-btn
                    @click="getDoneTasks('pdf')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی Pdf بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/pdf-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
              </q-card>
              <q-card class="bg-all q-ma-sm">
                <q-card-section class="text-h6">دیوتی های فعال</q-card-section>
                <q-card-section
                  ><img src="../assets/active-document.svg" alt=""
                /></q-card-section>
                <q-card-section class="q-px-md q-py-none">
                  <q-btn
                    @click="getActiveTasks('xls')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی xls بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/excel-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-px-md q-py-sm">
                  <q-btn
                    @click="getActiveTasks('pdf')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی Pdf بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/pdf-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
              </q-card>
              <q-card class="bg-all q-ma-sm">
                <q-card-section class="text-h6">تمام دیوتی ها</q-card-section>
                <q-card-section
                  ><img src="../assets/all-document.svg" alt=""
                /></q-card-section>
                <q-card-section class="q-px-md q-py-none">
                  <q-btn
                    @click="getAllTasks('xls')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی xls بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/excel-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
                <q-card-section class="q-px-md q-py-sm">
                  <q-btn
                    @click="getAllTasks('pdf')"
                    class="text-main-color col q-px-xl q-pa-sm dir-rtl text-body1 text-weight-bold"
                    ><span class="q-mr-sm">خروجی Pdf بگیر !</span
                    ><img
                      width="40"
                      class="q-mr-sm"
                      src="../assets/pdf-icon.svg"
                      alt=""
                  /></q-btn>
                </q-card-section>
              </q-card>
            </div>
          </q-card>
        </q-dialog>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import '../../public/Amiri Regular-normal';
import { exportFile, useQuasar } from 'quasar';
import faIR from 'quasar/lang/fa-IR';
import {
  convertADToSolar,
  convertSolarToAD,
} from 'src/helper/convert-AD-to-solar';
import * as XLSX from 'xlsx';
import { ref } from 'vue';
import {
  getOneStatusTaskWidthDate,
  getAllTaskWidthDate,
} from 'src/api/service/exportService';
import { getUserWithActiveTask } from 'src/api/service/userService';
import { getActiveTaskInfo } from 'src/api/service/taskService';

export default {
  name: 'ExportData',
  components: {},
  setup() {
    let dialog = ref(false);
    useQuasar().lang.set(faIR);
    let date = ref({ from: '', to: '' });
    let temp = ref();
    let exportres = ref();

    function sendDate() {
      if (date.value.from == '' || undefined) {
        return;
      }
      dialog.value = true;
    }

    async function getAllTasks(format) {
      let from = convertSolarToAD(date.value.from);
      let to = convertSolarToAD(date.value.to);
      let res = await getAllTaskWidthDate(from, to);
      // if (res == undefined) {
      //   temp.value == undefined;
      //   return;
      // }
      // temp.value = [];
      // const fetchData = async () => {
      //   const promises = res.map(async (item) => {
      //     const {
      //       userID,
      //       taskID,
      //       taskActiviteEndDate,
      //       taskActiviteCreateDate,
      //       taskActualEndDate,
      //       taskActiviteDescription,
      //     } = item;
      //     const userData = await getUserWithActiveTask(userID);
      //     const taskData = await getActiveTaskInfo(taskID);
      //     temp.value.push({
      //       userData: userData,
      //       taskData: taskData,
      //       date: {
      //         taskActiviteCreateDate: convertADToSolar(taskActiviteCreateDate),
      //         taskActiviteEndDate: convertADToSolar(taskActiviteEndDate),
      //         taskActualEndDate: convertADToSolar(taskActualEndDate),
      //       },
      //       description: taskActiviteDescription ? '' : '-',
      //     });
      //   });
      //   await Promise.all(promises);
      //   if (format == 'pdf') {
      //     if (temp.value.length > 0) {
      //       exportToPDF();
      //       exportres.value = true;
      //     } else {
      //       exportres.value = false;
      //     }
      //   }
      //   if (format == 'xls') {
      //     if (temp.value.length > 0) {
      //       exportExcelAllTasks(temp.value);
      //       exportres.value = true;
      //     } else {
      //       exportres.value = false;
      //     }
      //   }
      // };
      // fetchData();
    }
    async function getActiveTasks(format) {
      let from = convertSolarToAD(date.value.from);
      let to = convertSolarToAD(date.value.to);
      let res = await getOneStatusTaskWidthDate(from, to, false);
      if (res == undefined) {
        temp.value == undefined;
        return;
      }
      temp.value = [];
      const fetchData = async () => {
        const promises = res.map(async (item) => {
          const {
            userID,
            taskID,
            taskActiviteEndDate,
            taskActiviteCreateDate,
          } = item;
          const userData = await getUserWithActiveTask(userID);
          const taskData = await getActiveTaskInfo(taskID);
          temp.value.push({
            userData: userData,
            taskData: taskData,
            date: {
              taskActiviteCreateDate: convertADToSolar(taskActiviteCreateDate),
              taskActiviteEndDate: convertADToSolar(taskActiviteEndDate),
            },
          });
        });
        await Promise.all(promises);

        if (format == 'pdf') {
          if (temp.value.length > 0) {
            exporActiveTasktToPDF();
            exportres.value = true;
          } else {
            exportres.value = false;
          }
        }
        if (format == 'xls') {
          if (temp.value.length > 0) {
            exportExcelActiveTasks(temp.value);
            exportres.value = true;
          } else {
            exportres.value = false;
          }
        }
      };
      fetchData();
    }
    async function getDoneTasks(format) {
      let from = convertSolarToAD(date.value.from);
      let to = convertSolarToAD(date.value.to);
      let res = await getOneStatusTaskWidthDate(from, to, true);
      if (res == undefined) {
        temp.value == undefined;
        return;
      }
      temp.value = [];
      const fetchData = async () => {
        const promises = res.map(async (item) => {
          const {
            userID,
            taskID,
            taskActiviteEndDate,
            taskActiviteCreateDate,
            taskActualEndDate,
            taskActiviteDescription,
          } = item;
          const userData = await getUserWithActiveTask(userID);
          const taskData = await getActiveTaskInfo(taskID);
          temp.value.push({
            userData: userData,
            taskData: taskData,
            date: {
              taskActiviteCreateDate: convertADToSolar(taskActiviteCreateDate),
              taskActiviteEndDate: convertADToSolar(taskActiviteEndDate),
              taskActualEndDate: convertADToSolar(taskActualEndDate),
            },
            description: taskActiviteDescription ? '' : '-',
          });
        });
        await Promise.all(promises);
        if (format == 'pdf') {
          if (temp.value.length > 0) {
            exportToPDF();
            exportres.value = true;
          } else {
            exportres.value = false;
          }
        }
        if (format == 'xls') {
          if (temp.value.length > 0) {
            exportExcelAllTasks(temp.value);
            exportres.value = true;
          } else {
            exportres.value = false;
          }
        }
      };
      fetchData();
    }
    function exportExcelAllTasks(newData) {
      const data = [
        [
          'نام کاربر',
          'نام دیوتی',
          'تاریخ شروع',
          'تاریخ مهلت',
          'تاریخ پایان',
          'توضیحات',
        ],
      ];
      for (let i = 0; i < newData.length; i++) {
        const el = newData[i];
        data.push([
          el.userData.label,
          el.taskData.label,
          el.date.taskActiviteCreateDate,
          el.date.taskActiviteEndDate,
          el.date.taskActualEndDate,
          el.description,
        ]);
      }

      const workbook = XLSX.utils.book_new();
      workbook.Workbook = { Views: [{ RTL: true }] };
      let worksheet = XLSX.utils.aoa_to_sheet(data);
      worksheet['!cols'] = { w: '30' };
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const buffer = XLSX.write(workbook, { type: 'buffer' });

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      exportFile('report.xlsx', blob);
    }
    function exportExcelActiveTasks(newData) {
      const data = [['نام کاربر', 'نام دیوتی', 'تاریخ شروع', 'تاریخ مهلت']];
      for (let i = 0; i < newData.length; i++) {
        const el = newData[i];
        data.push([
          el.userData.label,
          el.taskData.label,
          el.date.taskActiviteCreateDate,
          el.date.taskActiviteEndDate,
        ]);
      }

      const workbook = XLSX.utils.book_new();
      workbook.Workbook = { Views: [{ RTL: true }] };
      let worksheet = XLSX.utils.aoa_to_sheet(data);
      worksheet['!cols'] = { w: '30' };
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const buffer = XLSX.write(workbook, { type: 'buffer' });

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      exportFile('report.xlsx', blob);
    }
    return {
      date,
      dialog,
      sendDate,
      getActiveTasks,
      getAllTasks,
      getDoneTasks,
      exportres,
    };
  },
};
</script>

<style lang="sass">

.custom-input input
  color: #8e8d8a

.custom-input textarea
  max-height: 150px
  height: 150px
  color: #8e8d8a

.custom-input .q-field__control:after
  color: #e85a4f

.custom-input .q-field__control:before
  color: #8e8d8a
  transition: none !important
  border: solid 2px #d8c3a5
  border-color: #d8c3a5
</style>
