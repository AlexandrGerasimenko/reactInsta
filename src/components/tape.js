import React from 'react'
import { connect } from 'react-redux';
import graphqlLikeAndRefresh from '../actions/graphqlLike'
import graphqlLikeDeleteAndRefresh from '../actions/graphqlLikeDelete'
import graphqlNewComment from '../actions/graphqlNewComment'
import graphqlLikeCommentAndRefresh from '../actions/graphqlLikeComment'
import checkFunc from '../helpers/checkFunc'
import Post from '../elements/Post'

let PostFeed = (p) =>
  <div className='posts'>
    {p.props[0].posts && p.props[0].posts.length ?
      p.props[0].posts.map((post) =>
        <Post post={post} graphqlLikeAndRefresh={p.graphqlLikeAndRefresh} graphqlNewComment={p.graphqlNewComment} graphqlLikeDeleteAndRefresh={p.graphqlLikeDeleteAndRefresh} graphqlLikeCommentAndRefresh={p.graphqlLikeCommentAndRefresh} />
      ) : <h1>Подпишитесь,что-бы просматривать посты</h1>}
  </div>

let mapStateToProps = st => ({
  props:
    [{
      posts:
        checkFunc(st, "promiseReducer.FollowPosts.payload.PostFind")
    },
    {
      currentUser:
        checkFunc(st, "promiseReducer.CurentUser.payload.UserFindOne")
    }
    ]
})

let NewTape = connect(mapStateToProps, { graphqlLikeAndRefresh, graphqlLikeDeleteAndRefresh, graphqlNewComment,graphqlLikeCommentAndRefresh })(PostFeed)

export default NewTape