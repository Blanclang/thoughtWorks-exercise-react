import React,{ Component,PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './component/Topic';
import List from './component/List';
import Recommend from './component/Recommend';
import Writer from './component/Writer';
import { actionCreators } from './store';

import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style';

class Home extends PureComponent{

  // shouldComponentUpdate(){
  //   //性能优化 只有跟这个组件相关的render函数执行 使用PureComponent底层实现了shouldComponentUpdate，
  //   //PureComponent要与immutable类型数据结合 否则会有坑 所以使用PureComponent就要结合immutable js来管理数据
  // }

  handleScrollTop(){
    window.scrollTo(0,0);
  }
  render(){
    return(
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src="//upload.jianshu.io/admin_banners/web_images/4680/f3832b8ec185f3772a31960a2494964132f29ce0.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
        </HomeRight>
        {
          this.props.showScroll?<BackTop onClick={this.handleScrollTop}>回到顶部</BackTop>:null
        }
      </HomeWrapper>
    )
  }
  componentDidMount(){
    this.props.changeHomeData();
    this.bindEvents();
  }
  componentWillUnmount(){
    //销毁前钩子函数
    window.removeEventListener('scroll',this.props.changeScrollTopShow);
  }
  bindEvents(){
    window.addEventListener('scroll',this.props.changeScrollTopShow);
  }
}

const mapState = (state) => {
  return {
    showScroll:state.getIn(['home','showScroll'])
  }
}

const mapDispatch = (dispatch) => {
  return {
    changeHomeData(){
      const action = actionCreators.getHomeInfo();
      dispatch(action);
    },
    changeScrollTopShow(e){
      // console.log(document.documentElement.scrollTop);
      if(document.documentElement.scrollTop>100){
        dispatch(actionCreators.toggleTopShow(true));
      }else{
        dispatch(actionCreators.toggleTopShow(false));
      }
    }
  }
}

export default connect(mapState,mapDispatch)(Home);























