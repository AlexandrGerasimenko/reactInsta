import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlUserPostsThunk from './graphqlUserPostsThunk'

let graphqlLikeDelete = (_id) => promiseActionsMaker(
  'likeDelete',
  gql().request(
    `mutation LikeDelete($like: LikeInput) {
          LikeDelete(like: $like) {
            _id
          }
        }`, {
      like: {
        _id
      }
    }
  ));
const graphqlLikeDeleteUserAndRefresh = (_id, id) => async dispatch => {
  await graphqlLikeDelete(_id)(dispatch)
  await graphqlUserPostsThunk(id)(dispatch)
}

export default graphqlLikeDeleteUserAndRefresh
