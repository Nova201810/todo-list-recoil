import { selectorFamily } from 'recoil';

import { updateTasksAtom } from '../atoms/updateTasks';
import { Task } from '../../@types/task';

export const taskStatusSelector = selectorFamily({
  key: 'TasksFetching',
  get: (taskId: Task['id']) => ({ get }) => {
    const tasks = get(updateTasksAtom);
    const targetTask = tasks.find(({ id }) => id === taskId);
    return targetTask?.status ?? null;
  },
});
