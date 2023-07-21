import { FILTER_ALL, FILTER } from '../types';

const defaultStore = {
  filters: [
    {
      id: 1,
      name: 'Все',
      trigger: false,
    },
    {
      id: 2,
      name: 'Без пересадок',
      trigger: false,
    },
    {
      id: 3,
      name: '1 пересадка',
      trigger: false,
    },
    {
      id: 4,
      name: '2 пересадки',
      trigger: false,
    },
    {
      id: 5,
      name: '3 пересадки',
      trigger: false,
    },
  ],
};

const updateTrigger = (arr, id) => {
  return arr.map((item) => (item.id === id ? { ...item, trigger: !item.trigger } : item));
};

function filterReducer(state = defaultStore, action = {}) {
  const oldData = state.filters;
  const newData = updateTrigger(oldData, action.id);
  const isAllChecked = newData.every((element) => element.trigger);
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
