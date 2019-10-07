import React from 'react'
import { connect } from 'react-redux';
import graphqlLikeUser from '../actions/graphqlLikeUser'
import graphqlUserPostsThunk from '../actions/graphqlUserPostsThunk'
import checkFunc from '../helpers/checkFunc'
import graphqlLikeDeleteAndRefresh from '../actions/graphqlLikeUserDelete'
import Post from '../elements/Post'
import graphqlNewCommentUser from '../actions/graphqlNewCommentUser'

class UserDetails1 extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount(props) {
    this.props.graphqlUserPostsThunk(
      checkFunc(this, "props.match.params.id")
    );
  }

  render() {
    return (
      <div >
        <div className='user-logo'>
          <img alt = 'logo' src={this.props.posts &&
            this.props.posts[0] &&
            this.props.posts[0].owner.avatar ?
            '/' +
            this.props.posts[0].owner.avatar.url :
            process.env.PUBLIC_URL + '/anon.jpg'} />
        </div>
        <h1>{this.props.posts &&
          this.props.posts[0] &&
          this.props.posts[0].owner.login}
        </h1>
        {this.props.posts &&
          this.props.posts.length ?
          this.props.posts.map((post) =>
            <Post post={post} graphqlLikeAndRefresh={this.props.graphqlLikeUser}
              graphqlNewComment={this.props.graphqlNewCommentUser}
              graphqlLikeDeleteAndRefresh={this.props.graphqlLikeDeleteAndRefresh}
            />
          ) :
          <h1>Пользыватель еще не добавил ни одного поста</h1>}
      </div>
    )
  }
}

let mapStateToProps = st => ({
  posts:
    checkFunc(st, "promiseReducer.UserPosts.payload.PostFind")
})

let UserDetails = connect(mapStateToProps, { graphqlUserPostsThunk, graphqlLikeDeleteAndRefresh, graphqlLikeUser, graphqlNewCommentUser })(UserDetails1)

export default UserDetails