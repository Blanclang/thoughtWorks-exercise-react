import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LoginWrapper,LoginBox,Input,Button} from './style';
import { actionCreators } from './store'

class Login extends PureComponent{

  render(){
    const { loginStatus } = this.props;
    console.log(loginStatus);
    if(!loginStatus){
      return(
        <LoginWrapper>
          <LoginBox>
            {/* <Input placeholder="账号" ref={(input) => {this.current = input}}></Input> styled-component提供innerRef */}
            <Input placeholder="账号" innerRef={(input) => {this.current = input}}></Input>
            <Input placeholder="密码" type="password" innerRef={(input) => {this.password = input}} ></Input>
            <Button onClick={()=>this.props.login(this.current,this.password)} >登陆</Button>
          </LoginBox>
        </LoginWrapper>
      )
    }else{
      return <Redirect to="/"/>
    }

  }
}

const mapState = (state) => {
  return{
    loginStatus:state.getIn(['login','loginState'])
  }
}
const mapDispatch = (dispatch) => {
  return {
    login(accountElem,passwElem){
      console.log(accountElem.value,passwElem.value);
      dispatch(actionCreators.changeLogin(accountElem.value,passwElem.value));
    }
  }
}
export default connect(mapState,mapDispatch)(Login);























