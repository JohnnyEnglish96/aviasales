/* eslint-disable arrow-body-style */
import { TABS } from '../actions/actionTypes';

const defaultStore = {
  tabs: [
    { name: 'Самый дешевый', trigger: true, value: 1 },
    { name: 'Самый быстрый', trigger: false, value: 2 },
  ],
};

const updateTrigger = (arr, value) => {
  // eslint-disable-next-line max-len
  return arr.map((item) => (item.value === value ? { ...item, trigger: !item.trigger } : { ...item, trigger: !item.trigger }));
};

function tabsReducer(state = defaultStore, action = {}) {
  const oldData = state.tabs;
  const newData = updateTrigger(oldData, action.value);

  switch (action.type) {
    case TABS:
      return {
        ...state,
        tabs: newData,
      };

    default:
      return state;
  }
}

export default tabsReducer;
