import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import ticketsReducer from './ticketsReducer';

const rootReducer = combineReducers({
  filterReducer,
  ticketsReducer,
});

export default rootReducer;
