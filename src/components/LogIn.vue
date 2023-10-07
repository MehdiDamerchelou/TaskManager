<template>
  <div class="">
    <div class="row dir-rtl text-center items-center justify-center">
      <q-card
        class="bg-transparent no-shadow column justify-center height-70 width-70"
      >
        <q-card-section>
          <q-card-section>
            <span class="text-h4">احراز هویت</span>
          </q-card-section>
          <q-card-section class="q-mt-lg">
            <q-input
              class="custom-input"
              outlined
              v-model="username"
              placeholder="نام کاربری"
              type="email"
            >
            </q-input>
          </q-card-section>
          <q-card-section class="q-mt-md">
            <q-input
              class="custom-input"
              outlined
              v-model="pwd"
              placeholder="رمز عبور"
              type="password"
            >
            </q-input>
          </q-card-section>
          <q-card-section class="q-mt-none row items-center justify-center">
            <q-btn
              class="text-main-color q-px-xl q-pa-md dir-rtl text-body1 text-weight-bold"
              label="ثبت"
              @click="login"
              :disable="isDisabled"
            ></q-btn>
          </q-card-section>
          <q-card-section>
            حسابی ندارید ؟
            <router-link class="text-red" :to="{ name: 'newUser' }">
              حساب جدید بساز
            </router-link>
          </q-card-section>
          <q-card-section
            v-if="res == 401"
            class="q-mt-none row items-center justify-center text-red text-h6"
          >
            همچین کاربری وجود ندارد
          </q-card-section>
          <q-card-section
            v-if="res == undefined"
            class="q-mt-none row items-center justify-center text-red text-h6"
          >
            ارتباط با سرور برقرار نشد
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useToken } from 'stores/token';
import { useRouter } from 'vue-router';

export default {
  name: 'LogIn',
  setup() {
    let username = ref('');
    const $router = useRouter();
    let pwd = ref('');
    let res = ref('');
    const myStore = useToken();
    async function login() {
      const { userlogin } = myStore;
      res.value = await userlogin(username.value, pwd.value);
      if (res.value.accessToken) {
        $router.push({ name: 'dashboard' });
      }
    }
    onMounted(() => {
      localStorage.clear();
    });
    const isDisabled = computed(() => {
      if (username.value === '' || pwd.value === '') {
        return true;
      } else {
        return false;
      }
    });
    return { isDisabled, username, pwd, res, login };
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
.custom-input .q-field__inner .q-field__messages
  direction: ltr
  text-align: right

.custom-input .q-field__control:before
  color: #8e8d8a
  transition: none !important
  border: solid 2px #d8c3a5
  border-color: #d8c3a5
</style>
