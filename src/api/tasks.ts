import { Task, TaskStatus } from "../@types/task";

let stringifiedTasks = JSON.stringify([
  {
    id: '1',
    status: TaskStatus.active,
    title: 'Открытая задача',
    content: 'Выполни или закрой меня',
  },
  {
    id: '2',
    status: TaskStatus.done,
    title: 'Выполненная задача',
    content: 'Полюбуйся что ты натворил',
  },
  {
    id: '3',
    status: TaskStatus.closed,
    title: 'Закрытая задача',
    content: 'Как ты мог меня не сделать',
  },
]);

let err = true;

export const getTasksApi = () => new Promise<Task[]>((resolve, reject) => {
  setTimeout(() => {
    if (err) {
      reject(true);
      err = false;
    } else {
      const tasks = JSON.parse(stringifiedTasks) as Task[];
      resolve(tasks);
    }
  }, 1500);
});

export const updateTaskApi = (task: Task) => new Promise<Task[]>((resolve) => {
  setTimeout(() => {
    const tasks = JSON.parse(stringifiedTasks) as Task[];
    const taskIndex = tasks.findIndex(({ id }) => id === task.id);
    tasks[taskIndex].status = task.status;
    stringifiedTasks = JSON.stringify(tasks);
    resolve(tasks);
  }, 1500);
});

export const createTaskApi = (task: Task) => new Promise<Task[]>((resolve) => {
  setTimeout(() => {
    const tasks = JSON.parse(stringifiedTasks) as Task[];
    const updatedTasks = [...tasks, task];
    stringifiedTasks = JSON.stringify(updatedTasks);
    resolve(updatedTasks);
  }, 1500);
});