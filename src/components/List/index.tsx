import { Alert, Button, Container, Col, Row, Spinner, Stack } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';

import Task from './Task';
import { useGetTasks } from '../../store/hooks/useGetTasks';
import { filteredTasksSelector, tasksErrorSelector, tasksFetchingSelector } from '../../store/selectors/tasks';

export default function List() {
  const tasksError = useRecoilValue(tasksErrorSelector);
  const tasksFetching = useRecoilValue(tasksFetchingSelector);
  const filteredTasks = useRecoilValue(filteredTasksSelector);
  const getTasks = useGetTasks();

  if (tasksFetching) {
    return (
      <div className="mt-4 d-flex justify-content-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (tasksError) {
    return (
      <Container className="p-0">
        <Alert variant="danger">
          <Alert.Heading>Произошла техническая ошибка</Alert.Heading>
          <Stack gap={2}>
            <p>Не удалось получить список задач</p>
            <Button variant="light" onClick={getTasks}>Повторить</Button>
          </Stack>
        </Alert>
      </Container>
    );
  }

  const isTasksEmpty = filteredTasks.length === 0;
  if (isTasksEmpty) {
    return (
      <Alert variant="primary">
        <Alert.Heading className="m-0">Список задач пуст</Alert.Heading>
      </Alert>
    );
  }

  return (
    <Container className="p-0">
      <Row>
        {filteredTasks.map(task => (
          <Col key={task.id}>
            <Task {...task} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}