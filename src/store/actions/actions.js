import { FILTER_ALL, FILTER, GET_SEARCH_ID, GET_TICKETS } from './actionTypes';

const baseUrl = 'https://aviasales-test-api.kata.academy/';

const filterAllToggle = () => ({
  type: FILTER_ALL,
});

const filterToggle = (id) => ({
  type: FILTER,
  id,
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
  const { tickets } = await responce.json();
  dispatch({
    type: GET_TICKETS,
    tickets,
  });
};

export { filterAllToggle, filterToggle, getSearchId, getTickets };
