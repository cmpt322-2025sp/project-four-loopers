// src/reducers/index.js
const initialState = {
    user: null, // Example state property
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload, // Example: Store user info on successful login
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  