import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlCurrentUserPosts from './graphqlCurrentUserPosts'
import refresh from './graphqlRefresh'



let graphqlPostDelete = (_id) => promiseActionsMaker(
  'PostDelete',
  gql().request(
    `mutation postDelete($post: PostInput) {
          PostDelete(post: $post) {
            _id
          }
        }`, {
      post: {
        _id
      }
    }
  ));

const graphqlPostDeleteUserAndRefresh = (_id) =>
  async dispatch => {
    await graphqlPostDelete(_id)(dispatch)
    await refresh(dispatch)
  }

export default graphqlPostDeleteUserAndRefresh
