import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Write extends PureComponent{
  render(){
    const { loginStatus } = this.props;
    if(loginStatus){
      return(<div>写文章</div>)
    }else{
      return <Redirect to='/login'/>
    }
  }
}

const mapState = (state) => {
  return{
    loginStatus:state.getIn(['login','loginState'])
  }
}
export default connect(mapState,null)(Write);
















