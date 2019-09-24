import React from 'react';
import Loadable  from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./index'),//异步加载当前目录下的index.js组件
  loading(){
    return <div>正在加载</div>
  }
});

// class App extends Component{
//   render(){
//     return <LoadableComponent/>;
//   }
// }


export default () => <LoadableComponent/> //无状态组件























