import {combineReducers} from 'redux';

//Import All Reducers
// import {authReducer} from './auth';
// import { dimensionReducer } from './dimensions';
import {language} from './language';
import {darkReducer} from './dark'

export default combineReducers({
  language: language,
  dark: darkReducer
});
