import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      myPosts: false,
      posts: [],
      // title:'',
      // img:'',
      // content:''
    }
    this.requestPosts = this.requestPosts.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    // this.createNewPost = this.createNewPost.bind(this);
  }

  componentDidMount() {
    this.requestPosts();
  }

  requestPosts() {
    axios.get(`/api/posts/${this.props.id}?myposts=${this.state.myPosts}&search=${this.state.search}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
  }

  resetSearch() {
    axios.get(`/api/posts/${this.props.id}?mypost=${this.state.myPosts}`)
      .then(res => {
        this.setState({
          posts: res.data, 
          search: ''
        });
      })
  }

  // createNewPost(){
  //   axios.post(`/api/post/${this.props.userid}`).then(res => {
  //     console.log("post from dashboad--->", res)
  //      this.setState({
  //       title: res.data,
  //       img: res.data,
  //       content: res.data
  //      })
  //   })  
  // }  

  render() {
    const list = this.state.posts.map((item, i) => {
      return (
        <Link to={`/post/${item.id}`} key={item.id}><div >
          <div className="post_dashboard">
          <p>Post title: {item.title}</p>
          <p>Author name: {item.username}</p>
          <img src={item.profile_pic} alt=""/>
          </div>
        </div>
        </Link>
      )
    })

    return (
      <div>
        <input type="text" onChange={(e) => this.setState({search: e.target.value})}/>
        <button onClick={this.requestPosts()}>Search</button>
        <button onClick={this.resetSearch()}>Reset</button>
        My posts<input type="checkbox" onClick={() => this.setState({myPosts: !this.state.myPosts})}/>
        { list }
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    id: state.id
  }
}

export default connect(mapPropsToState)(Dashboard);