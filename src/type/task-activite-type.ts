export type taskActiviteType = {
  taskActiviteID: string;
  userID: string;
  taskID: string;
  taskActiviteStatus: boolean;
  taskActiviteCreateDate: number;
  taskActiviteEndDate: number;
  taskActualEndDate: number;
  taskActiviteDescription: string;
};
export type user = { id: string; label: string };
export type task = { taskID: string; label: string };

export type activeTaskType = [
  {
    userId: string;
    label: string;
    taskActivite: [
      {
        taskID: string;
        userID: string;
        taskActiviteStatus: boolean;
        taskActiviteCreateDate: number;
        taskActiviteEndDate: number;
        taskActualEndDate: number | string;
        taskActiviteDescription: string;
        task: {
          label: string;
          taskDescription: string;
        };
      }
    ];
  }
];
export type DetailsDataType = [
  {
    userId: string;
    username: string;
    label: string;
    phoneNumber: string;
    taskActivite: [
      {
        taskID: string;
        userID: string;
        taskActiviteStatus: boolean;
        taskActiviteCreateDate: number;
        taskActiviteEndDate: number;
        taskActualEndDate: number | string;
        taskActiviteDescription: string;
        task: {
          taskID: string;
          label: string;
          taskDescription: string;
          taskCreatedDate: number;
          taskEndDay: number;
        };
      }
    ];
  }
];
export type eachDutyType = {
  userId: string;
  username: string;
  label: string;
  phoneNumber: string;
  taskActivite: [
    {
      taskID: string;
      userID: string;
      taskActiviteStatus: boolean;
      taskActiviteCreateDate: number;
      taskActiviteEndDate: number;
      taskActualEndDate: number | string;
      taskActiviteDescription: string;
      task: {
        taskID: string;
        label: string;
        taskDescription: string;
        taskCreatedDate: number;
        taskEndDay: number;
      };
    }
  ];
};
export type eachActiveTaskType = {
  userId: string;
  label: string;
  taskActivite: [
    {
      taskID: string;
      userID: string;
      taskActiviteStatus: boolean;
      taskActiviteCreateDate: number;
      taskActiviteEndDate: number;
      taskActualEndDate: number | string;
      taskActiviteDescription: string;
      task: {
        label: string;
        taskDescription: string;
      };
    }
  ];
};

export type dateType = { from: string; to: string };
