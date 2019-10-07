import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlUserPostsThunk from './graphqlUserPostsThunk'

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

const graphqlLikeUserAndRefresh = (_id, id) => async dispatch => {
  await graphqlLike(_id)(dispatch)
  await graphqlUserPostsThunk(id)(dispatch)
}

export default graphqlLikeUserAndRefresh
