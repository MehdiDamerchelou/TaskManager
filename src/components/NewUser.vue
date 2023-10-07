<template>
  <div class="">
    <div class="row dir-rtl text-center items-center justify-center">
      <q-card
        class="no-shadow bg-transparent column justify-center height-70 width-70"
      >
        <q-card-section>
          <span class="text-h4">ثبت کاربر جدید</span>
        </q-card-section>
        <q-card-section class="q-mt-md q-pa-sm">
          <q-input
            class="q-pa-none custom-input"
            outlined
            v-model="username"
            placeholder="نام کاربری"
            type="text"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="row q-pa-sm">
          <q-input
            class="col q-ml-md custom-input"
            outlined
            v-model="fname"
            placeholder="نام"
          ></q-input>

          <q-input
            class="col custom-input"
            outlined
            v-model="lname"
            placeholder="نام خانوادگی"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="row q-pa-sm">
          <q-input
            :rules="[
              (val) =>
                val.length >= 8 || 'حداقل تعداد کاراکتر های گذرواژه 8 تاست',
            ]"
            lazy-rules
            class="col q-ml-md custom-input"
            outlined
            v-model="pwd"
            placeholder="رمز عبور"
            type="password"
          >
          </q-input>
          <q-input
            :rules="[
              (val) => val.length >= 11 || 'لطفا تلفن همراه را کامل وارد کنید',
            ]"
            lazy-rules
            maxlength="13"
            class="col custom-input"
            outlined
            mask="###########"
            v-model="phone"
            type="tel"
            placeholder="تلفن همراه"
          >
          </q-input>
        </q-card-section>
        <q-card-section class="q-pa-sm row items-center justify-center">
          <q-btn
            class="text-main-color q-px-xl q-pa-md dir-rtl text-body1 text-weight-bold"
            label="افزودن کاربر"
            :disable="isDisabled"
            @click="create"
          ></q-btn>
        </q-card-section>
        <q-card class="bg-transparent no-shadow">
          <q-dialog
            v-model="resDialog"
            transition-show="scale"
            transition-hide="scale"
            ><q-card class="bg-all"
              ><q-card-section v-if="res == 204">
                <q-card-section class="text-green"
                  >کاربر با موفقیت ساخته شد</q-card-section
                >
                <router-link class="text-h6 underline" :to="{ name: 'login' }">
                  به حساب خود وارد شوید
                </router-link>
              </q-card-section>
              <q-card-section class="text-red" v-if="res == 401"
                >کاربری با این نام کاربری ساخته شده است</q-card-section
              >
            </q-card></q-dialog
          >
        </q-card>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { createUser } from 'src/api/service/userService';
export default {
  name: 'NewUser',
  setup() {
    let username = ref('');
    let fname = ref('');
    let lname = ref('');
    let pwd = ref('');
    let phone = ref('');
    let fullname = ref();
    let resDialog = ref(false);
    let res = ref();
    async function create() {
      fullname.value = fname.value + ' ' + lname.value;

      res.value = await createUser(
        username.value,
        fullname.value,
        pwd.value,
        phone.value
      );
      resDialog.value = true;
    }

    const isDisabled = computed(() => {
      if (
        username.value === '' ||
        fname.value === '' ||
        lname.value === '' ||
        pwd.value.length < 8 ||
        phone.value.length !== 11 ||
        !/[^آ-ی\s]/g.test(username.value)
      ) {
        return true;
      } else {
        return false;
      }
    });

    return {
      username,
      resDialog,
      fname,
      lname,
      pwd,
      phone,
      res,
      isDisabled,
      create,
    };
  },
};
</script>

<style lang="sass">
.underline
  text-decoration: underline
.custom-input .q-field__inner .q-field__messages
  direction: ltr
  text-align: right

.custom-input input
  color: #8e8d8a

.custom-input .q-field__control:after
  color: #e85a4f


.custom-input .q-field__control:before
  transition: none !important
  border: solid 2px #d8c3a5
  border-color: #d8c3a5
</style>
