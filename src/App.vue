<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useToken } from './stores/token';
import { getAllUser } from './api/service/userService';
import { createTask, getAllTask } from './api/service/taskService';
import { createAssignment } from './api/service/assignmentService';
export default defineComponent({
  name: 'App',
  setup() {
    async function ss() {
      // const name = 'چجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظپ';
      // for (let i = 0; i < 2000; i++) {
      //   const n =
      //     name[Math.floor(Math.random() * name.length - 1)] +
      //     name[Math.floor(Math.random() * name.length - 1)] +
      //     name[Math.floor(Math.random() * name.length - 1)];
      //   const d = '1';
      //   const t =
      //     name[Math.floor(Math.random() * name.length - 1)] +
      //     name[Math.floor(Math.random() * name.length - 1)];
      //   await createTask(n, t, d);
      // }
      // const user = await getAllUser();
      // const task = await getAllTask();
      // for (let i = 0; i < 1800; i++) {
      //   await createAssignment(
      //     user[Math.floor(Math.random() * 3)].userId,
      //     task[i].taskID
      //   );
      // }
    }
    ss();

    onBeforeMount(async () => {
      const myStore = useToken();
      const tt: string | null = localStorage.getItem('authentication');
      if (tt === null) {
        return 401;
      }
      if (tt == undefined) {
        return;
      }

      const { refreshToken } = myStore;
      let { expire } = myStore;

      await refreshToken().then(() => {
        setInterval(async () => {
          await refreshToken();
        }, expire);
      });
    });
    return {};
  },
});
</script>
