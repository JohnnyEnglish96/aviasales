import { FILTER_ALL, FILTER } from './types';

const filterAllToggle = () => {
  return {
    type: FILTER_ALL,
  };
};

const filterToggle = (id) => {
  return {
    type: FILTER,
    id,
  };
};

export { filterAllToggle, filterToggle };
