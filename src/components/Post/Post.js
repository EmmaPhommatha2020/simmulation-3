import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: '',
        image: '',
        content: '',
        username: '',
        profile_pic: ''
      }
    }
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.postid}`)
      .then(res => {
        this.setState({post: res.data[0]});
      })
  }
  
  render() {
    const {title,image,content,username,profile_pic} = this.state.post
    return (
      <div>
        <p>Title: {title}</p>
        <img src={image} alt=""/>
        <p>Content: {content}</p>
        <p>Username: {username}</p>
        <img src={profile_pic} alt=""/>
      </div>
    );
  }
}

export default Post;