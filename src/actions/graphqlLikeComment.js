import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlFollowPosts from './graphqlFollowPosts'

let graphqlLikeComment = (_id) => promiseActionsMaker(
  'newLikeComment',
  gql().request(
    `mutation newLikeComment($like: LikeInput) {
        LikeUpsert(like: $like) {
          _id
        }
      }`, {
      like: {
        comment: {
          _id
        }
      }
    }
  ));

const graphqlLikeCommentAndRefresh = (_id) => async dispatch => {
  await graphqlLikeComment(_id)(dispatch)
  await graphqlFollowPosts()(dispatch)
}

export default graphqlLikeCommentAndRefresh
