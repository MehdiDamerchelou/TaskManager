<template>
  <div class="row text-center items-center justify-center">
    <q-card class="bg-transparent q-mt-none no-shadow text-center width-70">
      <q-card class="bg-transparent no-shadow text-center"
        ><span class="text-h6">تاریخچه دیوتی های انجام شده</span> </q-card
      ><q-card
        class="bg-transparent row justify-center q-pa-xl"
        v-if="temp == 0"
        >اطلاعاتی نداریم فعلا</q-card
      >
      <q-card class="bg-transparent row" v-if="temp !== undefined">
        <q-card-section
          class="q-pa-none dir-rtl col-6"
          v-for="(data, index) in temp"
          :key="index"
        >
          <q-card
            class="bg-all q-ma-sm text-right q-pa-sm"
            :class="{
              'bg-content-box': index == 1 || index == 2 || index == 5,
            }"
          >
            <q-card-section class="row q-pa-sm">
              <q-card-section class="q-pa-none col">
                نام کاربر : {{ data.user.label }}
              </q-card-section>
              <q-card-section class="q-pa-none col">
                نام دیوتی : {{ data.task.label }}
              </q-card-section>
            </q-card-section>
            <q-card-section class="row q-pa-sm">
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
              <q-card-section class="q-pa-none col"
                >تاریخ تحویل :
                {{ convertADToSolar(data.taskActualEndDate) }}</q-card-section
              >
            </q-card-section>
            <q-card-section class="q-pa-sm"
              >توضیحات پایانی :
              <div class="show-description">
                {{ data.taskActiviteDescription }}
              </div></q-card-section
            >
          </q-card>
        </q-card-section>
      </q-card>
      <q-card-section v-if="temp == undefined" class="q-mt-xl">
        <q-card-section>
          <img src="../assets/loading.svg" class="q-mt-xl q-pt-xl" alt="" />
        </q-card-section>
        <span>صبر کن اخوی</span>
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
            input-class="text-black text-weight-bold"
          />
        </q-card>
      </q-card>
    </q-card>
  </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue';
import {
  getAllHistoryTasks,
  getHistoryTasksCount,
} from 'src/api/service/historyTaskService';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';

export default {
  name: 'HistoryTask',
  setup() {
    let current = ref(1);
    let maxPage = ref();
    let min = ref(0);
    let perPage = 6;
    let temp = ref();

    async function getNewData() {
      let res = await getAllHistoryTasks(min.value, true);
      if (res == undefined) {
        temp.value = undefined;
        return;
      }
      temp.value = res;
      let count = await getHistoryTasksCount(true);
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
    return { current, maxPage, temp, convertADToSolar };
  },
};
</script>
<style lang="sass">
.custom-paginate button
  color: #e98074 !important
</style>
