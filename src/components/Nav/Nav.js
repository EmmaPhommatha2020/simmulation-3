import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
    return (
      <div>
      <nav className="dashboard_view">
        <Link to='/dashboard'><button className="dashboard_link">Home</button></Link>
        <Link to='/new'><button className="ldashboar_link">New Post</button></Link>
        <Link to='/'><button className="dashboard_link">Logout</button></Link>
      </nav>
      </div>
    )
}

const mapStateToProps = (state) => {
  const {username,password,profile_pic} = state;
  return {
    username,
    password,
    profile_pic
  }
}

export default connect(mapStateToProps)(Nav);