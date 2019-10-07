import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlFollowPosts from './graphqlFollowPosts'

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
const graphqlLikeDeleteAndRefresh = (_id) => async dispatch => {
  await graphqlLikeDelete(_id)(dispatch)
  await graphqlFollowPosts()(dispatch)
}

export default graphqlLikeDeleteAndRefresh
