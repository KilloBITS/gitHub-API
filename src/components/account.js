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
      repos: null
    }
  }
  componentDidMount(){
    axios.get(
      this.props.data._json.repos_url
    ).then(result => {
      console.log(result.data);
      this.setState({repos: result.data})
    });
  }
  render(){
    return <div claaName="blockPage">
      <div className="header">
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
