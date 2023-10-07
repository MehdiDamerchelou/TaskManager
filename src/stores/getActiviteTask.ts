import { defineStore } from 'pinia';
import { getActiveTaskInfo } from 'src/api/service/taskService';
import { getUserWithActiveTask } from 'src/api/service/userService';
import { convertADToSolar } from 'src/helper/convert-AD-to-solar';

export const useTaskActivite = defineStore('taskActivite', {
  actions: {
    async organizeActiveTask(data: any) {
      const userida: string[] = [];
      const taskida: string[] = [];
      const temp: any[] = [];

      data.map(async (item: any) => {
        const { userID, taskID } = item;
        userida.push(userID);
        taskida.push(taskID);
      });
      const userData: [] = await getUserWithActiveTask(userida);
      const taskData: [] = await getActiveTaskInfo(taskida);

      if (userData == undefined || taskData == undefined) {
        return undefined;
      }
      const fetchData = async () => {
        data.map((item: any) => {
          const {
            taskActiviteID,
            userID,
            taskID,
            taskActiviteEndDate,
            taskActiviteCreateDate,
          } = item;
          userData.map((userItem: any) => {
            if (userID !== userItem.id) {
              return;
            }
            taskData.map((taskItem: any) => {
              if (taskItem.taskID !== taskID) {
                return;
              }
              temp.push({
                taskActiviteID: taskActiviteID,
                userData: userItem,
                taskData: taskItem,
                date: {
                  taskActiviteCreateDate: convertADToSolar(
                    taskActiviteCreateDate
                  ),
                  taskActiviteEndDate: convertADToSolar(taskActiviteEndDate),
                },
              });
            });
          });
        });
      };
      await fetchData();
      return temp;
    },
    async organizeHistoryTask(data: any) {
      const userida: string[] = [];
      const taskida: string[] = [];
      const temp: any[] = [];

      data.map(async (item: any) => {
        const { userID, taskID } = item;
        userida.push(userID);
        taskida.push(taskID);
      });
      const userData: [] = await getUserWithActiveTask(userida);
      const taskData: [] = await getActiveTaskInfo(taskida);

      if (userData == undefined || taskData == undefined) {
        return undefined;
      }
      const fetchData = async () => {
        data.map((item: any) => {
          const {
            userID,
            taskID,
            taskActiviteEndDate,
            taskActiviteCreateDate,
            taskActualEndDate,
            taskActiviteDescription,
          } = item;
          userData.map((userItem: any) => {
            if (userID !== userItem.id) {
              return;
            }
            taskData.map((taskItem: any) => {
              if (taskItem.taskID !== taskID) {
                return;
              }
              temp.push({
                userData: userItem,
                taskData: taskItem,
                date: {
                  taskActiviteCreateDate: convertADToSolar(
                    taskActiviteCreateDate
                  ),
                  taskActiviteEndDate: convertADToSolar(taskActiviteEndDate),
                  taskActualEndDate: convertADToSolar(taskActualEndDate),
                },
                description: taskActiviteDescription,
              });
            });
          });
        });
      };
      await fetchData();
      return temp;
    },
  },
});
