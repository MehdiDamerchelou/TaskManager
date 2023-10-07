<template>
  <div class="row text-center items-center justify-center">
    <q-card class="bg-transparent no-shadow text-center width-70 q-mt-lg">
      <q-card class="bg-transparent text-center"
        ><span class="text-h6">دیوتی هایی که تکمیل نشده اند</span>
      </q-card>

      <q-card class="bg-transparent row justify-center q-pa-xl" v-if="temp == 0"
        >اطلاعاتی نداریم فعلا</q-card
      >
      <q-card class="bg-transparent row" v-if="temp !== undefined">
        <q-card-section
          class="q-pa-none dir-rtl col-6"
          v-for="(data, index) in temp"
          :key="index"
        >
          <q-card
            class="bg-all q-ma-xs text-right q-pa-xs"
            :class="{
              'bg-content-box': index == 1 || index == 2 || index == 5,
            }"
          >
            <q-card-section
              class="float-left q-pa-xs cursor-pointer submit-button"
              @click="submitTask(data.taskActiviteID, data.taskActiviteEndDate)"
            >
              بزن
              <img src="../assets/tick.svg" class="" alt="" />
            </q-card-section>
            <q-card-section class="row q-pa-sm">
              <q-card-section class="q-pa-none col">
                نام : {{ data.user.label }}
              </q-card-section>
              <q-card-section class="q-pa-none col">
                دیوتی : {{ data.task.label }}
              </q-card-section>
            </q-card-section>
            <q-card-section class="row q-py-none q-px-sm">
              <q-card-section class="q-pa-none col"
                >تاریخ شروع :
                {{
                  convertADToSolar(data.taskActiviteCreateDate)
                }}</q-card-section
              >
              <q-card-section class="q-pa-none col"
                >تاریخ مهلت :
                {{ convertADToSolar(data.taskActiviteEndDate) }}</q-card-section
              >
            </q-card-section>
            <q-card-section class="q-pa-sm"
              >توضیحات دیوتی :
              <div class="show-description">
                {{ data.task.taskDescription }}
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <q-dialog
        v-model="dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="bg-all" style="width: 300px">
          <q-card-section align="right">
            <img
              src="../assets/close.svg"
              class="cursor-pointer"
              alt=""
              width="25"
              v-close-popup
            />
          </q-card-section>
          <q-card-section
            ><div class="row dir-rtl text-center items-center justify-center">
              <q-card
                class="bg-transparent no-shadow column justify-center height-70 width-70"
              >
                <q-card-section v-if="timeDelivery == false">
                  <q-card-section>
                    <span class="text-h4">شما دیرکرد داشتید</span>
                    <span class="text-h5">علت دیرکرد چیه؟</span>
                  </q-card-section>
                  <q-card-section class="q-mt-lg">
                    <q-input
                      class="custom-input"
                      outlined
                      v-model="description"
                      placeholder="توضیحات"
                      type="textarea"
                    >
                    </q-input>
                  </q-card-section>
                  <q-card-section
                    class="q-mt-lg row items-center justify-center"
                  >
                    <q-btn
                      class="text-main-color q-px-xl q-pa-md dir-rtl text-body1 text-weight-bold"
                      label="تحویل دیوتی"
                      @click="endDuty"
                      :disable="isDisabled"
                    ></q-btn>
                  </q-card-section>
                  <q-card-section class="text-green" v-if="IsEnd == 200">
                    دیوتی شما پایان یافت ، تبریک
                  </q-card-section>
                </q-card-section>
                <q-card-section v-if="timeDelivery" class="text-green">
                  شما دیوتی خود را با موفقیت ثبت کردید
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-card-section v-if="temp == undefined" class="q-mt-xl q-pt-xl">
        <q-card-section>
          <img src="../assets/loading.svg" class="q-mt-xl q-pt-xl" alt="" />
        </q-card-section>
        <span>صبر کن </span>
      </q-card-section>
      <q-card
        class="q-mt-md row justify-center bg-transparent no-shadow"
        v-if="temp !== undefined && temp !== 0"
      >
        <q-card class="row justify-center bg-content-box"
          ><q-pagination
            v-model="current"
            :max="maxPage ? maxPage : 1"
            input
            class="custom-paginate"
            input-class="text-bllack text-weight-bold"
          />
        </q-card>
      </q-card>
    </q-card>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, watch, ref } from 'vue';
import {
  actualEndTask,
  getActiveTask,
} from 'src/api/service/assignmentService';
import { getActiveTaskCount } from 'src/api/service/assignmentService';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';
import { getDateNow } from 'src/api/service/dateSecrvice';
import { dateDiff } from 'src/helper/date-different-helper';

const fixedDescription = 'به موقع انجام شده';
export default {
  name: 'ActiveTask',
  setup() {
    let perPage = 6;
    let dialog = ref(false);
    let current = ref(1);
    let maxPage = ref();
    let min = ref(0);
    let description = ref();
    let timeDelivery = ref();
    let temp = ref();
    let logintaskActiviteID = ref();
    let res = ref(true);
    let IsEnd = ref();

    async function submitTask(taskActiviteID: string, taskDeadLine: number) {
      dialog.value = true;
      let tt = await getDateNow();

      logintaskActiviteID.value = taskActiviteID;

      timeDelivery.value = dateDiff(taskDeadLine, tt);
      if (timeDelivery.value) {
        description.value = fixedDescription;
        IsEnd.value = await actualEndTask(taskActiviteID, description.value);
        await getNewData();
      }
    }
    async function getNewData() {
      let res = await getActiveTask(min.value, false);
      console.log(res);

      if (res == undefined) {
        temp.value == undefined;
        return;
      }
      temp.value = res;
      let count = await getActiveTaskCount(false);
      maxPage.value = Math.ceil(count.count / perPage);
    }
    onMounted(async () => {
      await getNewData();
    });
    watch(current, async () => {
      temp.value = [];
      if (current.value == 1) {
        min.value = 0;
      } else {
        min.value = (current.value - 1) * perPage;
      }
      await getNewData();
    });
    async function endDuty() {
      IsEnd.value = await actualEndTask(
        logintaskActiviteID.value,
        description.value
      );
      await getNewData();
    }
    const isDisabled = computed(() => {
      if (description.value === '') {
        return true;
      } else {
        return false;
      }
    });
    return {
      IsEnd,
      dialog,
      current,
      maxPage,
      temp,
      convertADToSolar,
      submitTask,
      description,
      timeDelivery,
      res,
      endDuty,
      isDisabled,
    };
  },
};
</script>
<style lang="sass">


.custom-dilog .q-dialog__inner
  padding: 0
.custom-paginate button
  color: #e98074 !important
.submit-button:hover
  box-shadow: 0px 0px 5px 0px green !important
</style>
