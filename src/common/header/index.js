import React,{Component} from 'react';
import {connect} from 'react-redux';
import { CSSTransition } from  'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { Link } from 'react-router-dom';

import {
  HeaderWrapper,Logo,Nav,NavItem,NavSearch,Addition, Button,SearchWrapper,SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem
} from './style'


class Header extends Component{
  getListArea(){
    const { focused, list,page,totalPage,handleMouseEnter,handleMouseLeave,mouseIn,handleChangePage} = this.props;
    const newList = list.toJS();
    const pageList = [];
    if(newList.length){
      for(let i = (page-1)*10; i < page*10;i++ ){
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        );
      }
    }
    if(focused || mouseIn){
      return(
        <SearchInfo>
          <SearchInfoTitle onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
            热门搜索
            <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
              <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe623;</i>换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
            {/* {
              list.map((item)=>{
                return <SearchInfoItem key={item}>{item}</SearchInfoItem>
              })
            } */}
          </SearchInfoList>
        </SearchInfo>
      );
    }else{
      return null;
    }
  }
  render(){ //只有render函数 无状态组件
    const { focused,list, handleInputFocus,handleInputBlur,loginState,logout} = this.props;
    return (
      <HeaderWrapper> 
      <Link to="/">
        <Logo/>
      </Link>
      <Nav>
        <NavItem className="left active">首页</NavItem>
        <NavItem className="left">下载App</NavItem>
        <NavItem className="right">
          <i className="iconfont">&#xe636;</i>
        </NavItem>
        {
          loginState ? <NavItem onClick={logout} className="right">退出</NavItem> :
                       <Link to="/login"><NavItem className="right">登录</NavItem></Link>
        }
        <SearchWrapper>
          <CSSTransition in={focused} timeout={200} classNames="slide">
            <NavSearch className={focused ? 'focused' : ''} onFocus={()=>handleInputFocus(list)} onBlur={handleInputBlur}></NavSearch>
          </CSSTransition>
          <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe623;</i>
          {this.getListArea()}
        </SearchWrapper>
      </Nav>
      <Addition>
        <Link to='/write'>
          <Button className="writting"><i className="iconfont">&#xe641;</i>写文章</Button>
        </Link>
        <Button className="reg">注册</Button>
      </Addition>
    </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    // focused:state.header.focused  //combineReducers
    // focused:state.get('header').get('focused') //immutable
    focused:state.getIn(['header','focused']), //redux-immutable
    list:state.getIn(['header','list']),
    page:state.getIn(['header','page']),
    totalPage:state.getIn(['header','totalPage']),
    mouseIn:state.getIn(['header','mouseIn']),
    loginState:state.getIn(['login','loginState'])
  }
}

const mapDispathToProps = (dispatch) =>{
  return {
    handleInputFocus(list){
      console.log(list);
      if(list.size===0){
        dispatch(actionCreators.getList());
      }
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur(){
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page,totalPage,spin){
      let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
      if(originAngle){
        originAngle = parseInt(originAngle,10);//转换十进制
      }else{
        originAngle = 0;
      }
      spin.style.transform ='rotate(' + (originAngle+360) +'deg)';
      //做页码逻辑判断
      if(page<totalPage){
        dispatch(actionCreators.changePage(page+1));
      }else{
        dispatch(actionCreators.changePage(1));
      }
    },
    logout(){
      dispatch(loginActionCreators.logout());
    }
  }
}

export default connect(mapStateToProps,mapDispathToProps)(Header);

