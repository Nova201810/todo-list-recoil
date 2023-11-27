import { useSetRecoilState } from 'recoil';

import { updateTasksAtom } from '../atoms/updateTasks';
import { tasksAtom } from '../atoms/tasks';
import { updateTaskApi } from '../../api/tasks';
import { Task } from '../../@types/task';
import { RequestStatus } from '../../@types/request';

export function useUpdateTask() {
  const setUpdateTasks = useSetRecoilState(updateTasksAtom);
  const setTasks = useSetRecoilState(tasksAtom);

  const updateTask = (task: Task) => {
    setUpdateTasks(updateTasks => [
      ...updateTasks,
      { status: RequestStatus.fetching, id: task.id },
    ]);
    updateTaskApi(task)
      .then((tasks) => {
        setUpdateTasks(updateTasks => {
          const newTasks = [...updateTasks];
          const taskIndex = newTasks.findIndex(({ id }) => id === task.id);
          newTasks.splice(taskIndex, 1);
          return newTasks;
        });
        setTasks({ error: false, value: tasks, fetching: false });
      })
      .catch(() => {
        setUpdateTasks(updateTasks => {
          const newTasks = [...updateTasks];
          const taskIndex = newTasks.findIndex(({ id }) => id === task.id);
          newTasks[taskIndex].status = RequestStatus.error;
          return newTasks;
        });
      });
  };

  return updateTask;
}