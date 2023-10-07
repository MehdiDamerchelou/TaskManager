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
          class="dir-rtl bg-all"
          calendar="persian"
          color="red-4"
          text-color="black"
          range
        />
      </q-card-section>
      <q-card-section class="q-pa-none"> </q-card-section>
      <q-card-section class="q-pa-sm">
        <q-btn
          class="q-mx-xs q-pa-md text-main-color col"
          @click="date = { from: '', to: '' }"
          label="پاک کن"
        />
        <q-btn
          class="text-main-color col q-px-xl q-pa-md text-body1 text-weight-bold"
          label="دریافت اطلاعات"
          @click="sendDate"
        />
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
                <q-card-section class="text-h5 q-pa-none text-weight-bold">
                  اطلاعات {{ date.from }} تا {{ date.to }} رو میخام
                </q-card-section>
                <q-dialog
                  v-model="resDialog"
                  transition-show="scale"
                  transition-hide="scale"
                  ><q-card class="bg-all"
                    ><q-card-section
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
                    </q-card-section></q-card
                  ></q-dialog
                >
              </q-card>
              <q-card class="bg-all q-ma-sm">
                <q-card-section class="text-h6">تمام جزئیات</q-card-section>
                <q-card-section
                  ><img src="../assets/info-with-detail.svg" alt=""
                /></q-card-section>
                <q-card-section class="q-px-md q-py-none">
                  <q-btn
                    @click="XlsWithDetails(date.from, date.to)"
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
                    @click="PDFWithDetails(date.from, date.to)"
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
                <q-card-section class="text-h6"
                  >دیوتی های تکمیل شده</q-card-section
                >
                <q-card-section
                  ><img src="../assets/check-document.svg" alt=""
                /></q-card-section>
                <q-card-section class="q-px-md q-py-none">
                  <q-btn
                    @click="XlsHistory(date.from, date.to)"
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
                    @click="PDFHistory(date.from, date.to)"
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
                    @click="XlsActive(date.from, date.to)"
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
                    @click="PDFActive(date.from, date.to)"
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
                    @click="XlsAll(date.from, date.to)"
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
                    @click="PDFAll(date.from, date.to)"
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
import '/public/Amiri Regular-normal';
import { useQuasar } from 'quasar';
import faIR from 'quasar/lang/fa-IR';
import { ref } from 'vue';
import { useXlsExportStore } from 'src/stores/excelExport';
import { useExport } from 'src/stores/exportData';
import { useXlsOrginize } from 'src/stores/excelOrganizeData';
import { useNewData } from 'src/stores/getExportData';
import { convertSolarToAD } from 'src/helper/convert-AD-to-solar';

export default {
  name: 'ExportData',
  components: {},
  setup() {
    const $q = useQuasar();
    $q.lang = faIR;
    let dialog = ref(false);
    let resDialog = ref(false);
    let date = ref({ from: '1402/02/01', to: '1403/02/01' });
    let exportres = ref();
    const getDataStore = useNewData();
    const exportStore = useExport();
    const xlsOrginizeStore = useXlsOrginize();
    const xlsExportStore = useXlsExportStore();

    function sendDate() {
      if (date.value.from == '' || undefined) {
        return;
      }
      dialog.value = true;
    }
    async function PDFWithDetails(dateFrom, dateTo) {
      const { getAllData } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllData(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };
      const { exportdataWithDetails } = exportStore;
      exportres.value = await exportdataWithDetails(res, date);
      resDialog.value = true;
    }
    async function PDFActive(dateFrom, dateTo) {
      const { getAllActiveTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllActiveTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };
      const { exportdataActive } = exportStore;
      exportres.value = await exportdataActive(res, date);
      resDialog.value = true;
    }
    async function PDFAll(dateFrom, dateTo) {
      const { getAllTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };

      const { exportdataAll } = exportStore;
      exportres.value = await exportdataAll(res, date);
      resDialog.value = true;
    }
    async function PDFHistory(dateFrom, dateTo) {
      const { getAllHistoryTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllHistoryTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };

      const { exportdataHistory } = exportStore;
      exportres.value = await exportdataHistory(res, date);
      resDialog.value = true;
    }

    /***************************************************/
    async function XlsWithDetails(dateFrom, dateTo) {
      const { getAllData } = getDataStore;
      console.log(dateFrom, dateTo);
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllData(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };
      const { xlsOrginizeDetaileTask } = xlsOrginizeStore;
      res = xlsOrginizeDetaileTask(res, date);
      const { xlsExportdata } = xlsExportStore;
      exportres.value = await xlsExportdata(res);
      resDialog.value = true;
    }
    async function XlsActive(dateFrom, dateTo) {
      const { getAllActiveTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllActiveTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };

      const { xlsOrginizeAciveTask } = xlsOrginizeStore;
      res = xlsOrginizeAciveTask(res, date);
      const { xlsExportdata } = xlsExportStore;
      exportres.value = await xlsExportdata(res);
      resDialog.value = true;
    }
    async function XlsAll(dateFrom, dateTo) {
      const { getAllTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };
      const { xlsOrginizeAllTask } = xlsOrginizeStore;
      res = xlsOrginizeAllTask(res, date);
      const { xlsExportdata } = xlsExportStore;
      exportres.value = await xlsExportdata(res);
      resDialog.value = true;
    }
    async function XlsHistory(dateFrom, dateTo) {
      const { getAllHistoryTask } = getDataStore;
      let from = convertSolarToAD(dateFrom);
      let to = convertSolarToAD(dateTo);
      let res = await getAllHistoryTask(from, to);
      if (res == undefined) {
        exportres.value = false;
        resDialog.value = false;
        return;
      }
      let date = { from: dateFrom, to: dateTo };
      const { xlsOrginizeHistoryTask } = xlsOrginizeStore;
      res = xlsOrginizeHistoryTask(res, date);
      const { xlsExportdata } = xlsExportStore;
      exportres.value = await xlsExportdata(res);
      resDialog.value = true;
    }
    return {
      date,
      exportres,
      dialog,
      resDialog,
      sendDate,
      XlsActive,
      XlsAll,
      XlsWithDetails,
      XlsHistory,
      PDFWithDetails,
      PDFActive,
      PDFAll,
      PDFHistory,
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
