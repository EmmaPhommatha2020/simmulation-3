import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../../ducks/reducer' ;

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      profile_pic: ''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleInput(e) {
    console.log("e--->", e.target.name);    
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin() {
    const {username, password} = this.state    
    let user = {
      username,
      password
    }
    axios.post('/api/auth/login', user)
      .then(res => {
        if (res.data[0]) {
          this.props.getUserInfo(res.data[0])
        } 
      });
    this.setState({
      username: '',
      password: ''
    });
  }
 
  handleRegister() {
    const {username, password} = this.state
    let user = {
      username,
      password,
      profile_pic: `https://robohash.org/${username}.png`
    }
    axios.post('/api/auth/register', user)
      .then(res => {
        this.props.getUserInfo(res.data[0]);
      });
    this.setState({
      username: '',
      password: '',
      profile_pic: `https://robohash.org/${username}.png`
    });
  }
 /*•••• HTML - Elements (attributes)••••
        54J:	attributes
 */

 /*•••• HTML - Elements (link) ••••
        54H:	link tag
 */

 /*•••• HTML - Elements (self closing) ••••
       54G:	self closing tag
 */

  render() {
    return (
      <div className="auth_login">
        <img
          className="logo_auth"
          src="https://github.com/DevMountain/simulation-3/blob/master/assets/helo_logo.png?raw=true"
          alt="logo"
        />
        <div className="login_input">
        <h5>Username: </h5>
        <input className="auth_input" type="text" name="username" onChange={this.handleInput.bind(this)} /> 
        <h5>Password: </h5>
        <input className="auth_input" type="text" name="password" onChange={this.handleInput.bind(this)} /> 
        </div>

        <div className="login_button">
        <Link to='/dashboard'><button className="auth_button" onClick={this.handleLogin.bind(this)}>Login</button></Link>
        <Link to='/dashboard'><button className="auth_button" onClick={this.handleRegister.bind(this)}>Register</button></Link>
        </div>

      </div>
    );
  }
}

export default connect(null, {getUserInfo})(Auth);