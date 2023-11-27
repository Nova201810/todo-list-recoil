import { atom } from 'recoil';

import { RequestStatus } from '../../@types/request';
import { Task } from '../../@types/task';

type UpdateTasksState = {
  status: RequestStatus;
  id: Task['id'];
}[];

export const updateTasksAtom = atom<UpdateTasksState>({
  key: 'UpdateTasks',
  default: [],
});