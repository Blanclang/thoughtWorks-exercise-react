
import axios from 'axios';
import * as constants from './constants';

const changeLoginss = () => {
  return {
    type:constants.CHANGE_LOGIN,
    login:true
  }
}
export const logout = () => {
  return {
    type:constants.LOGIN_OUT,
    login:false
  }
}

export const changeLogin= (current,password) => {
  return (dispatch)=>{
    axios.get('/api/login.json?current='+current+'&password='+password).then((res)=>{
      const result = res.data.data;
      if(result){
        dispatch(changeLoginss());
      }else{
        alert('登陆失败');
      }
    })
  };
}


