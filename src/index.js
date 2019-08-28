import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

import AccountComponent from './components/account';

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      session: null
    }
  }
  componentDidMount(){
    axios.get(
      '/account'
    ).then(result => {
      console.log(result)
        this.setState({session: result.data.user})
    });
  }
  render(){
    return (this.state.session === null)
      ?<div className="authBlock">
        <a href={'/auth/github'}>
          <div className="authButton gitHub">Sign In gitHub</div>
        </a>
      </div>
      :<AccountComponent data={this.state.session}/>
  }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));
