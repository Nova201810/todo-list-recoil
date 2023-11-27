import { useSetRecoilState } from 'recoil';

import { tasksAtom } from '../atoms/tasks';
import { getTasksApi } from '../../api/tasks';

export const useGetTasks = () => {
  const setTasks = useSetRecoilState(tasksAtom);

  const getTasks = () => {
    setTasks({ error: false, value: null, fetching: true });
    getTasksApi()
      .then(tasks => {
        setTasks({ error: false, value: tasks, fetching: false });
      })
      .catch(() => {
        setTasks({ error: true, value: null, fetching: false });
      });
  };

  return getTasks;
};