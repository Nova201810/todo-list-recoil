import { atom } from 'recoil';

import { Task } from '../../@types/task';

type TasksState = {
  fetching: boolean;
  value: Task[] | null;
  error: boolean;
};

const initialTasksValue: TasksState = {
  fetching: false,
  value: null,
  error: false,
};

export const tasksAtom = atom<TasksState>({
  key: 'TasksList',
  default: initialTasksValue,
});