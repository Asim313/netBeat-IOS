import {
    DARK,
  } from '../types';
  
  const initialState = {
    DARK : false
  };
  
  export const darkReducer = (state = initialState, action) => {
    switch (action.type) {
      case DARK:
        return {
           ...state,
            DARK : action.payload
        };
      default:
        return state;
    }
  };
  