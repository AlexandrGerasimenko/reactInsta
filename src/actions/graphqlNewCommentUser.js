import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
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
    }`, {
        comment: {
          text,
          post: {
            _id
          }
        }
      }
    ))()(dispatch)
}

const graphqlNewCommentUserAndRefresh = (text, _id, id) => async dispatch => {
  await graphqlNewComment(text, _id)(dispatch)
  await graphqlUserPostsThunk(id)(dispatch)
}

export default graphqlNewCommentUserAndRefresh
