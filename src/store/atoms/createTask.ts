import { atom } from 'recoil';

import { RequestStatus } from '../../@types/request';

export const createTaskAtom = atom<RequestStatus>({
  key: 'CreateTask',
  default: RequestStatus.initial,
});