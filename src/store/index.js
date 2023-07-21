import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './reducers/filterReducer';

const store = configureStore({ reducer: filterReducer });

export default store;
