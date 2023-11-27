import { useSetRecoilState } from 'recoil';

import { createTaskAtom } from '../atoms/createTask';
import { tasksAtom } from '../atoms/tasks';
import { createTaskApi } from '../../api/tasks';
import { RequestStatus } from '../../@types/request';
import { Task, TaskStatus } from '../../@types/task';

export const useCreateTask = () => {
  const setRequestStatus = useSetRecoilState(createTaskAtom);
  const setTasks = useSetRecoilState(tasksAtom);

  const createTask = (task: Pick<Task, 'title' | 'content'>, successCb: () => void) => {
    setRequestStatus(RequestStatus.fetching);
    const newTask: Task = {
      id: (new Date()).getTime().toString(),
      status: TaskStatus.active,
      ...task,
    };
    createTaskApi(newTask)
      .then(tasks => {
        setRequestStatus(RequestStatus.success);
        setTasks({ error: false, value: tasks, fetching: false });
        successCb();
      })
      .catch(() => {
        setRequestStatus(RequestStatus.error);
        setTasks({ error: true, value: null, fetching: false });
      });
  };

  return createTask;
};