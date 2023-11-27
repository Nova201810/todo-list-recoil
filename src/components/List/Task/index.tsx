import { Badge, Button, Card, Container, Spinner } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';

import { TaskStatus } from '../../../@types/task';
import { taskStatusSelector } from '../../../store/selectors/updateTask';
import { useUpdateTask } from '../../../store/hooks/useUpdateTask';
import { RequestStatus } from '../../../@types/request';

type Props = {
  id: string;
  status: TaskStatus;
  title: string;
  content: string;
};

const TASK_VARIANT = {
  [TaskStatus.active]: {
    kind: 'primary',
    text: 'Активна',
  },
  [TaskStatus.closed]: {
    kind: 'secondary',
    text: 'Закрыта',
  },
  [TaskStatus.done]: {
    kind: 'success',
    text: 'Выполнена',
  },
};

export default function Task(task: Props) {
  const { status, id, title, content } = task;
  const updateTask = useUpdateTask();
  const taskStatus = useRecoilValue(taskStatusSelector(id));
  const [activeAction, setActiveAction] = useState<TaskStatus>(TaskStatus.active);

  const { kind, text } = TASK_VARIANT[status];
  const isActive = status === TaskStatus.active;
  const isTaskUpdating = taskStatus === RequestStatus.fetching;

  const onDone = () => {
    setActiveAction(TaskStatus.done);
    updateTask({ ...task, status: TaskStatus.done });
  };
  const onClose = () => {
    setActiveAction(TaskStatus.closed);
    updateTask({ ...task, status: TaskStatus.closed });
  };

  const isDoneUpdating = activeAction === TaskStatus.done && isTaskUpdating;
  const isCloseUpdating = activeAction === TaskStatus.closed && isTaskUpdating;

  return (
    <Card
      bg="light"
      className="mb-4"
      style={{ width: '18rem' }}
    >
      <Card.Header>
        <Badge bg={kind}>{text}</Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        {isActive && (
          <Container className="row p-0 m-0">
            <Button
              className="col me-3"
              variant="success"
              onClick={onDone}
            >
              {!isDoneUpdating && 'Выполнить'}
              {isDoneUpdating && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Обновление задания</span>
                </>
              )}
            </Button>
            <Button className="col" variant="secondary" onClick={onClose}>
              {!isCloseUpdating && 'Закрыть'}
              {isCloseUpdating && (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Закрытие задания</span>
                </>
              )}
            </Button>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
}