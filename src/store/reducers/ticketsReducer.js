/* eslint-disable no-debugger */
import {
  GET_SEARCH_ID,
  GET_TICKETS,
  UPDATE_TICKETS_WITH_FILTER,
  UPDATE_TICKETS_WITH_TABS,
  SHOW_TICKETS,
} from '../actions/actionTypes';

const defaultStore = {
  tickets: [],
  updatedTickets: [],
  stop: false,
  searchId: '',
  amount: 5,
};

const ADD_TICKETS = 5;

const updateTicketsWithFilter = (arr, filterId) => {
  if (!filterId.length) {
    return [];
  }
  if (filterId.includes(4)) {
    return arr;
  }
  // eslint-disable-next-line max-len
  const newData = arr.filter((item) => item.segments.every((elem) => filterId.includes(elem.stops.length)));
  return newData;
};

const updateTicketsWithTabs = (arr, tabsValue) => {
  let sortedData = [];
  if (tabsValue === 2) {
    sortedData = arr.sort((a, b) => {
      const aMinDuration = Math.abs(a.segments[0].duration + a.segments[1].duration);
      const bMinDuration = Math.abs(b.segments[0].duration + b.segments[1].duration);
      return aMinDuration - bMinDuration;
    });
  } else {
    sortedData = arr.sort((a, b) => a.price - b.price);
  }
  return sortedData;
};

function ticketsReducer(state = defaultStore, action = {}) {
  switch (action.type) {
    case GET_SEARCH_ID:
      return {
        ...state,
        searchId: action.searchId,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
        stop: action.stop,
      };

    case UPDATE_TICKETS_WITH_FILTER:
      return {
        ...state,
        updatedTickets: updateTicketsWithFilter(state.tickets, action.filterId),
      };

    case UPDATE_TICKETS_WITH_TABS:
      return {
        ...state,
        updatedTickets: updateTicketsWithTabs(state.updatedTickets, action.tabsValue),
      };

    case SHOW_TICKETS:
      return {
        ...state,
        amount: state.amount + ADD_TICKETS,
      };

    default:
      return state;
  }
}

export default ticketsReducer;
