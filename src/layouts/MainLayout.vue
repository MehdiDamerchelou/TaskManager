<template>
  <q-layout>
    <q-card class="row justify-center no-shadow bg-transparent">
      <q-card-section class="bg-transparent shadow-5 q-pa-sm col-10 col-auto">
        <q-card class="bg-header" style="border-radius: 20px">
          <q-card-section class="q-pa-none">
            <router-link @click="menu = false" :to="{ name: 'dashboard' }">
              <img class="q-ml-md" src="../assets/logo.svg" alt="" />
            </router-link>
            <q-card-section
              @click="showMenu"
              class="q-mr-md float-right cursor-pointer"
              ><img src="../assets/menu-icon.svg" alt=""
            /></q-card-section>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow bg-transparent">
      <q-dialog
        v-model="menu"
        persistent
        transition-show="slide-right"
        transition-hide="slide-left"
      >
        <q-card class="bg-header">
          <q-card-section align="right">
            <img
              src="../assets/close.svg"
              class="cursor-pointer"
              alt=""
              width="25"
              v-close-popup
            />
          </q-card-section>
          <q-card-section class="q-pa-none column justify-center">
            <q-card-section class="row q-pa-none justify-center"
              ><q-card-section class="q-mt-none menu-section-width">
                <q-card class="bg-transparent col-6">
                  <router-link @click="menu = false" :to="{ name: 'newTask' }">
                    <q-card-section>
                      <img src="../assets/form.svg" width="70" alt="" />
                      <q-card-section class="float-right"
                        >ساخت دیوتی جدید</q-card-section
                      >
                    </q-card-section>
                  </router-link>
                </q-card>
              </q-card-section>
              <q-card-section class="q-mt-none menu-section-width">
                <q-card class="bg-transparent col-6">
                  <router-link @click="menu = false" :to="{ name: 'addDuty' }">
                    <q-card-section>
                      <img src="../assets/icon1.svg" width="70" alt="" />
                      <q-card-section class="float-right"
                        >ثبت دیوتی جدید</q-card-section
                      >
                    </q-card-section>
                  </router-link>
                </q-card>
              </q-card-section>
            </q-card-section>

            <q-card-section class="row q-pa-none justify-center"
              ><q-card-section class="q-mt-none menu-section-width">
                <q-card class="bg-transparent col-6">
                  <router-link @click="menu = false" :to="{ name: 'doneTask' }">
                    <q-card-section>
                      <img src="../assets/icon2.svg" width="70" alt="" />
                      <q-card-section class="float-right"
                        >تاریخچه دیوتی ها</q-card-section
                      >
                    </q-card-section>
                  </router-link>
                </q-card>
              </q-card-section>
              <q-card-section class="q-mt-none menu-section-width">
                <q-card class="bg-transparent col-6">
                  <router-link
                    @click="menu = false"
                    :to="{ name: 'activeTask' }"
                  >
                    <q-card-section>
                      <img src="../assets/icon3.svg" width="70" alt="" />
                      <q-card-section class="float-right"
                        >دیوتی های فعال</q-card-section
                      >
                    </q-card-section>
                  </router-link>
                </q-card>
              </q-card-section>
            </q-card-section>
            <q-card-section class="row q-pa-none justify-center">
              <q-card-section class="q-mt-none menu-section-width">
                <q-card class="bg-transparent">
                  <router-link @click="menu = false" :to="{ name: 'export' }">
                    <q-card-section>
                      <img src="../assets/export-icon.svg" width="70" alt="" />
                      <q-card-section class="float-right"
                        >خروجی دیوتی بگیر</q-card-section
                      >
                    </q-card-section>
                  </router-link>
                </q-card>
              </q-card-section>
            </q-card-section>
            <q-card-section class="row q-pa-none justify-center"
              ><q-card-section class="q-pa-none q-mb-lg">
                <q-card class="bg-transparent col-6">
                  <a href="/auth/login">
                    <q-btn
                      class="text-main-color q-ma-none float-right q-px-md text-body1 text-weight-bold"
                      label="خروج از حساب کاربری "
                    />
                  </a>
                </q-card>
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const menu = ref(false);

    function showMenu() {
      menu.value = !menu.value;
    }
    return {
      showMenu,
      menu,
    };
  },
};
</script>
<style lang="sass">
.menu-section-width
  min-width: 270px
</style>
