import { ChangeEvent, useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useRecoilState } from 'recoil';

import { useCreateTask } from '../../store/hooks/useCreateTask';
import { createTaskAtom } from '../../store/atoms/createTask';
import { RequestStatus } from '../../@types/request';

export default function AddTask() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createTask = useCreateTask();
  const [createTaskStatus, setCreateTaskStatus] = useRecoilState(createTaskAtom);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };
  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setContent(value);
  };

  const hideAndResetFields = () => {
    setTitle('');
    setContent('');
    setShow(false);
    setCreateTaskStatus(RequestStatus.initial);
  };

  const handleShow = () => setShow(true);
  const handleCreate = () => {
    if (!title || !content) return;
    createTask({ title, content }, hideAndResetFields);
  };

  const isCreating = createTaskStatus === RequestStatus.fetching;

  return (
    <div className="mt-4">
      <Button variant="primary" onClick={handleShow}>
        Создать задание
      </Button>

      <Modal size="lg" show={show} onHide={hideAndResetFields}>
        <Modal.Header closeButton>
          <Modal.Title>Новое задание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                autoComplete="off"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Содержимое</Form.Label>
              <Form.Control
                as="textarea"
                autoComplete="off"
                rows={3}
                value={content}
                onChange={handleContentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideAndResetFields}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            {!isCreating && 'Создать'}
            {isCreating && (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Создание задания</span>
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}