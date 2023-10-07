<template>
  <q-layout>
    <q-card class="row justify-center no-shadow bg-transparent">
      <q-card-section class="bg-transparent shadow-5 q-pa-sm col-10 col-auto">
        <q-card class="bg-header" style="border-radius: 20px">
          <q-card-section class="q-pa-none">
            <img class="q-ml-md" src="../assets/logo.svg" alt="" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'HeaderSite',
};
</script>

<style>
.boder {
  border-radius: 30px;
  width: 70%;
}
</style>
