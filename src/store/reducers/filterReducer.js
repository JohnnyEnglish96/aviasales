/* eslint-disable arrow-body-style */
import { FILTER_ALL, FILTER } from '../actions/actionTypes';

const defaultStore = {
  filters: [
    {
      id: 4,
      name: 'Все',
      trigger: true,
    },
    {
      id: 0,
      name: 'Без пересадок',
      trigger: true,
    },
    {
      id: 1,
      name: '1 пересадка',
      trigger: true,
    },
    {
      id: 2,
      name: '2 пересадки',
      trigger: true,
    },
    {
      id: 3,
      name: '3 пересадки',
      trigger: true,
    },
  ],
};

const updateTrigger = (arr, id) => {
  return arr.map((item) => (item.id === id ? { ...item, trigger: !item.trigger } : item));
};

function filterReducer(state = defaultStore, action = {}) {
  const oldData = state.filters;
  const newData = updateTrigger(oldData, action.id);
  const isAllChecked = newData.slice(1).every((element) => element.trigger);
  const changedData = [{ ...state.filters[0], trigger: isAllChecked }, ...newData.slice(1)];

  switch (action.type) {
    case FILTER_ALL:
      return {
        ...state,
        filters: state.filters.map((item) => ({
          ...item,
          trigger: !state.filters[0].trigger,
        })),
      };

    case FILTER:
      return {
        ...state,
        filters: changedData,
      };

    default:
      return state;
  }
}

export default filterReducer;
