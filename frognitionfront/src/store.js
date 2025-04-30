// src/store.js
import { createStore } from 'redux';
import rootReducer from './reducers';  // Assuming you will create a rootReducer or combine reducers

const store = createStore(
  rootReducer, // You will need to combine reducers if you have multiple
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Optional: Redux DevTools extension
);

export default store;
