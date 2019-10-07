import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlFollowPosts from './graphqlFollowPosts'
import graphqlUserPostsThunk from './graphqlUserPostsThunk'

let graphqlNewComment = (text, _id) => async dispatch => {
  await promiseActionsMaker(
    'newComment',
    gql().request(
      `mutation CommentUpsert($comment: CommentInput){
      CommentUpsert(comment:$comment){
        post{
          _id, text
        },
        text
      }
    }`

      , {
        comment: {
          text,
          post: {
            _id
          }
        }
      }
    ))()(dispatch)

}
const graphqlNewCommentAndRefresh = (text, _id) => async dispatch => {
  await graphqlNewComment(text, _id)(dispatch)
  await graphqlFollowPosts()(dispatch)
  await graphqlUserPostsThunk(window.location.pathname.split("/").slice(-1)[0])(dispatch)
}

export default graphqlNewCommentAndRefresh
