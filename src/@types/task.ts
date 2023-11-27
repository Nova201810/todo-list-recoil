export enum TaskStatus {
  active = 'active',
  done = 'done',
  closed = 'closed',
}

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  content: string;
};