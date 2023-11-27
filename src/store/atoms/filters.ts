import { atom } from 'recoil';

import { Filters } from '../../@types/filters';

const initialFiltersState: Filters = 'full';

export const filtersAtom = atom<Filters>({
  key: 'Filters',
  default: initialFiltersState,
});