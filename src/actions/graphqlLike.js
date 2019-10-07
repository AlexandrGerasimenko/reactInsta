import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlFollowPosts from './graphqlFollowPosts'

let graphqlLike = (_id) => promiseActionsMaker(
  'newLike',
  gql().request(
    `mutation LikeUpsert($like: LikeInput) {
        LikeUpsert(like: $like) {
          _id
        }
      }`, {
      like: {
        post: {
          _id
        }
      }
    }
  ));

const graphqlLikeAndRefresh = (_id) => async dispatch => {
  await graphqlLike(_id)(dispatch)
  await graphqlFollowPosts()(dispatch)
}

export default graphqlLikeAndRefresh
