/* eslint-disable no-debugger */
import { GET_SEARCH_ID, GET_TICKETS } from '../actions/actionTypes';

const defaultStore = {
  tickets: [],
  stop: false,
  searchId: '',
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
        tickets: action.tickets,
        stop: !state.stop,
      };

    default:
      return state;
  }
}

export default ticketsReducer;
