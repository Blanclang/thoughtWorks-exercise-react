import React,{ Component,PureComponent } from 'react';
import {connect} from 'react-redux';
import { TopicWrapper,TopicItem } from './../style';

class Topic extends PureComponent{

  render(){
    const { list } = this.props;

    return(
      <TopicWrapper>
        {
          list.map((item) =>(
            <TopicItem key={item.get('id')}>
              <img className="topic-pic" src={item.get('url')}></img>
              {item.get('name')}
            </TopicItem>
          ))
        }
      </TopicWrapper>
    )
  }
}
const mapState = (state)=>{
  return{
    list:state.getIn(['home','topiclist'])
  };
}
export default connect(mapState)(Topic);

// export default Topic;























