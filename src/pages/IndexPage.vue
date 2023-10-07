<template>
  <div class="row text-center items-center justify-center">
    <div class="">
      <q-card-section
        class="bg-transparent no-shadow row q-mt-xl"
        id="first-page"
      >
        <q-card-section class="col">
          <q-card class="bg-header q-pa-lg q-ma-sm">
            <q-card-section class="q-px-none">
              <q-card-section class="col-3 q-pa-xs"
                ><img src="../assets/form.svg" width="100" alt="" />
              </q-card-section>
              <q-card-section class="q-px-none"
                >یه دیوتی جدید بساز
              </q-card-section>
              <q-card-section>
                <router-link :to="{ name: 'newTask' }">
                  <q-btn
                    class="text-main-color q-px-sm dir-rtl text-body1 text-weight-bold"
                    label=" کلیک کن "
                  />
                </router-link>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="col">
          <q-card class="bg-header q-pa-lg q-ma-sm">
            <q-card-section class="q-px-none">
              <q-card-section class="col-3 q-pa-xs"
                ><img src="../assets/icon1.svg" width="100" alt="" />
              </q-card-section>
              <q-card-section class="q-px-none">دیوتی ثبت کن</q-card-section>
              <q-card-section>
                <router-link :to="{ name: 'addDuty' }">
                  <q-btn
                    class="text-main-color q-px-sm dir-rtl text-body1 text-weight-bold"
                    label=" کلیک کن "
                  />
                </router-link>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="col">
          <q-card class="bg-header q-pa-lg q-ma-sm">
            <q-card-section class="q-px-none">
              <q-card-section class="col-3 q-pa-xs"
                ><img src="../assets/icon2.svg" width="100" alt="" />
              </q-card-section>
              <q-card-section class="q-px-none"
                >تاریخچه رو ببین
              </q-card-section>
              <q-card-section>
                <router-link :to="{ name: 'doneTask' }">
                  <q-btn
                    class="text-main-color q-px-sm dir-rtl text-body1 text-weight-bold"
                    label=" کلیک کن "
                  />
                </router-link>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="col">
          <q-card class="bg-header q-pa-lg q-ma-sm">
            <q-card-section class="q-px-none">
              <q-card-section class="col-3 q-pa-xs"
                ><img src="../assets/icon3.svg" width="100" alt="" />
              </q-card-section>
              <q-card-section class="q-px-none">دیوتی های فعال </q-card-section>
              <q-card-section>
                <router-link :to="{ name: 'activeTask' }"
                  ><q-btn
                    class="text-main-color q-px-sm dir-rtl text-body1 text-weight-bold"
                    label=" کلیک کن "
                /></router-link>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section class="col">
          <q-card class="bg-header q-pa-lg q-ma-sm">
            <q-card-section class="q-px-none">
              <q-card-section class="col-3 q-pa-xs"
                ><img src="../assets/export-icon.svg" width="100" alt="" />
              </q-card-section>
              <q-card-section class="q-px-none"
                >خروجی دیتا بگیر
              </q-card-section>
              <q-card-section>
                <router-link :to="{ name: 'export' }">
                  <q-btn
                    class="text-main-color q-px-sm dir-rtl text-body1 text-weight-bold"
                    label=" کلیک کن "
                  />
                </router-link>
              </q-card-section>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card-section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return {};
  },
});
</script>
<style></style>
