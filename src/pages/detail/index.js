import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper,Header,Content } from './style';
import { actionCreators } from './store'

class Detail extends Component{

  render(){
    console.log(this.props.match.params.id);
    return(
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <Content dangerouslySetInnerHTML={{__html:this.props.content}} />
          {/* {this.props.content} */}
        {/* </Content> */}
      </DetailWrapper>
    )
  }
  componentDidMount(){
    this.props.getDetail(this.props.match.params.id);
  }

}

const mapState = (state) => {
  return{
    title:state.getIn(['detail','title']),
    content:state.getIn(['detail','content'])
  }
};
const mapDispatch = (dispatch) => {
  return {
    getDetail(id){
      dispatch(actionCreators.getDetail(id));
    }
  }
};
export default connect(mapState,mapDispatch)(withRouter(Detail));























