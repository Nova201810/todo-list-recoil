import { selector } from 'recoil';

import { filtersAtom } from '../atoms/filters';
import { tasksAtom } from '../atoms/tasks';

export const tasksFetchingSelector = selector({
  key: 'TasksFetching',
  get: ({ get }) => {
    const tasks = get(tasksAtom);
    return tasks.fetching;
  },
});

export const tasksErrorSelector = selector({
  key: 'TasksError',
  get: ({ get }) => {
    const tasks = get(tasksAtom);
    return tasks.error;
  },
});

export const tasksValueSelector = selector({
  key: 'TasksValue',
  get: ({ get }) => {
    const tasks = get(tasksAtom);
    return tasks.value;
  },
});

export const filteredTasksSelector = selector({
  key: 'FilteredTasks',
  get: ({ get }) => {
    const filter = get(filtersAtom);
    const tasks = get(tasksValueSelector);

    if (filter === 'full') {
      return tasks ?? [];
    }

    return tasks?.filter(({ status }) => status === filter) ?? [];
  },
});