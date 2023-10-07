<template>
  <div>
    <div class="row text-center items-center justify-center">
      <div class="column dir-rtl justify-center height-70 width-70">
        <br />
        <q-card class="bg-transparent no-shadow column">
          <q-card class="bg-transparent no-shadow">
            <span class="text-h4">ثبت دیوتی جدید</span>
          </q-card>
          <q-card class="bg-transparent no-shadow row">
            <q-card-section class="col">
              <q-input
                class="custom-input"
                outlined
                v-model="dutyname"
                placeholder="نام دیوتی"
            /></q-card-section>
            <q-card-section class="col-5">
              <q-input
                class="custom-input"
                outlined
                v-model="deadline"
                :rules="[(val) => val > 0 || 'حداقل یک روز فرصت نیاز است']"
                type="number"
                placeholder="مهلت"
            /></q-card-section>
          </q-card>

          <q-card-section>
            <q-input
              class="custom-input"
              outlined
              v-model="description"
              type="textarea"
              placeholder="توضیحات"
          /></q-card-section>
        </q-card>
        <q-card
          class="bg-transparent no-shadow row items-center justify-center"
        >
          <q-btn
            class="text-main-color q-px-xl q-pa-md dir-rtl text-body1 text-weight-bold"
            label="ساخت"
            :disable="isDisabled"
            @click="create"
          />
        </q-card>
        <q-dialog
          v-model="resDialog"
          transition-show="scale"
          transition-hide="scale"
          ><q-card class="bg-all"
            ><q-card-section class="text-weight-bold text-green">
              موفقیت آمیز بود
            </q-card-section>
          </q-card></q-dialog
        >
      </div>
    </div>
  </div>
</template>

<script>
import { createTask } from 'src/api/service/taskService';
import { ref, computed, nextTick } from 'vue';

export default {
  name: 'RegisterNewTask',
  setup() {
    let dutyname = ref('');
    let deadline = ref('');
    let description = ref('');
    let rendered = ref(true);
    let resDialog = ref(false);

    let res = ref('');
    async function create() {
      if (deadline.value <= 0) {
        return;
      }
      res.value = await createTask(
        dutyname.value,
        description.value,
        deadline.value
      );
      if (res.value == 204) {
        dutyname.value = description.value = '';
        deadline.value = 1;
        resDialog.value = true;
      }
    }

    const isDisabled = computed(() => {
      if (
        dutyname.value === '' ||
        deadline.value === '' ||
        deadline.value <= 0 ||
        description.value === ''
      ) {
        return true;
      } else {
        return false;
      }
    });
    return {
      isDisabled,
      description,
      deadline,
      dutyname,
      res,
      resDialog,
      create,
      rendered,
    };
  },
};
</script>

<style lang="sass">
.custom-input .q-field__inner .q-field__messages
  direction: ltr
  text-align: right
.custom-input input
  color: #8e8d8a

.custom-input textarea
  max-height: 150px
  color: #8e8d8a

.custom-input .q-field__control:after
  color: #e85a4f

.custom-input .q-field__control:before
  color: #8e8d8a
  transition: none !important
  border: solid 2px #d8c3a5
  border-color: #d8c3a5
</style>
