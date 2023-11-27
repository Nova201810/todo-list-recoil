import { Tabs, Tab } from 'react-bootstrap';
import { useRecoilState } from 'recoil';

import { TaskStatus } from '../../@types/task';
import { Filters as FiltersVariants } from '../../@types/filters';
import { filtersAtom } from '../../store/atoms/filters';
import List from '../List';

export default function Filters() {
  const FULL = 'full';
  const [filter, setFilter] = useRecoilState(filtersAtom);

  const tabs: { filter: FiltersVariants, title: string }[] = [
    { filter: FULL, title: 'Все' },
    { filter: TaskStatus.active, title: 'Активные' },
    { filter: TaskStatus.done, title: 'Выполненные' },
    { filter: TaskStatus.closed, title: 'Закрытые' },
  ];

  const onChange = (newFilter: string | null) => {
    if (newFilter === null) {
      setFilter(FULL);
    } else {
      setFilter(newFilter as typeof filter);
    }
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={filter}
      onSelect={onChange}
      className="mb-3"
    >
      {tabs.map(({ filter, title }) => (
        <Tab key={filter} eventKey={filter} title={title}>
          <List />
        </Tab>
      ))}
    </Tabs>
  );
}