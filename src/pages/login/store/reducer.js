
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  loginState:false
});

export default (state = defaultState,action)=>{
  switch (action.type) {
    case constants.CHANGE_LOGIN:
      return state.merge({
        loginState:action.login
      });
    case constants.LOGIN_OUT:
      return state.merge({
        loginState:action.login
      });  
    default:
      return state;
  }
}