
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  topiclist:[],
  articlist:[],
  recommendList:[],
  articlePage:1,
  showScroll:false
});

const changeHomeData = (state,action)=>{
  return state.merge({
    'topiclist':fromJS(action.topiclist),
    'articlist':fromJS(action.articlist),
    'recommendList':fromJS(action.recommendList)
  })
}
const addArticleList = (state,action)=>{
  return state.merge({
    'articlist':state.get('articlist').concat(action.articlist),
    'articlePage':action.nextPage
  })
}

export default (state = defaultState,action)=>{
  switch (action.type) {
    case constants.CHANGE_HOME_DATA:
      // return state.set('topiclist',fromJS(action.topiclist));
      return changeHomeData(state,action);
    case constants.ADD_HOME_LIST:
      return addArticleList(state,action);
    case constants.TOGGLE_SCROLL_TOP:
      return state.set('showScroll',fromJS(action.show)); 
    default:
      return state;
  }
  

}