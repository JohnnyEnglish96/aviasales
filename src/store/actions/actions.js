/* eslint-disable no-debugger */
import {
  FILTER_ALL,
  FILTER,
  GET_SEARCH_ID,
  GET_TICKETS,
  UPDATE_TICKETS_WITH_FILTER,
  UPDATE_TICKETS_WITH_TABS,
  SHOW_TICKETS,
  TABS,
} from './actionTypes';

const baseUrl = 'https://aviasales-test-api.kata.academy/';

const filterAllToggle = () => ({
  type: FILTER_ALL,
});

const filterToggle = (id) => ({
  type: FILTER,
  id,
});

const tabsToggle = (value) => ({
  type: TABS,
  value,
});

const getSearchId = () => async (dispatch) => {
  const responce = await fetch(`${baseUrl}search`);
  const { searchId } = await responce.json();
  dispatch({
    type: GET_SEARCH_ID,
    searchId,
  });
};

const getTickets = (searchId) => async (dispatch) => {
  const responce = await fetch(`${baseUrl}tickets/?searchId=${searchId}`);
  if (!responce.ok) {
    throw new Error();
  }
  const { tickets, stop } = await responce.json();
  dispatch({
    type: GET_TICKETS,
    tickets,
    stop,
  });
  return stop;
};

const updateTicketsWithFilter = (filterId) => ({
  type: UPDATE_TICKETS_WITH_FILTER,
  filterId,
});

const updateTicketsWithTabs = (tabsValue) => ({
  type: UPDATE_TICKETS_WITH_TABS,
  tabsValue,
});

const showTickets = () => ({
  type: SHOW_TICKETS,
});

export {
  filterAllToggle,
  filterToggle,
  getSearchId,
  getTickets,
  updateTicketsWithFilter,
  updateTicketsWithTabs,
  showTickets,
  tabsToggle,
};
