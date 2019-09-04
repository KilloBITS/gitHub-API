import React from 'react';
import axios from 'axios';

let parseRepos = (rep) => {
  const dataBlock = rep.map((repository, key) => <div key={key} className="rep">
    <div className="repTitle">{repository.name}</div>
    <a href={repository.html_url}><div className="repLink">Link to...</div></a>
  </div>);
  return dataBlock
}

class AccountComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      repos: null,
      token: null
    }
    this.getData = this.getData.bind(this);
    //1ace585ac4eb0b4c541999d86514b62d63a94f40
  }
  componentDidMount(){
    this.getData()
  }

  getData(){
    axios.get(
      (this.state.token !== null)
        ?"https://api.github.com/user/repos?access_token="+this.state.token
        :this.props.data._json.repos_url
    ).then(result => {
      console.log(result.data);
      this.setState({repos: result.data});
    });
  }
  setToken(){
    this.setState({token: this.instancetoken.value});
    setTimeout(() => {
      this.getData()
    },1000);
  }
  render(){
    return <div claaName="blockPage">
      <div className="header">
        <div className="newTokenBlock">
          <input type="text" ref={(el) => this.instancetoken = el}/>
          <button onClick={this.setToken.bind(this)}>Save</button>
          <span> ◄ enter your token to display hidden repositories</span>
        </div>
        <a href={"/logout"}><div className="logOut">Log out</div></a>
      </div>
      <div className="body">
        <div className="bodyContent">
            {(this.state.repos !== null)?parseRepos(this.state.repos):<div className="dataNotFound">Data not found!</div>}
        </div>
      </div>
    </div>
  }
}

export default AccountComponent;


// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.github.com/user/repos?access_token=1ace585ac4eb0b4c541999d86514b62d63a94f40');
// xhr.send();
// xhr.onload = function() {
// 	console.log(xhr.response)
// };
