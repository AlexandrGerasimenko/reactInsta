import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlRefresh from './graphqlRefresh'

let graphqlNewPost = (text, _id) => async dispatch => {
  await promiseActionsMaker(
    'newPost',
    gql().request(
      ` mutation PostUpsert($post:PostInput){
          PostUpsert(post:$post){
             images{
              _id
            }
          }
        }`, {
        post: {
          text,
          images:

            _id.map((i) => {
              return {
                _id: i._id
              }
            })
        }
      }
    ))()(dispatch)
}

const graphqlNewPostAndRefresh = (text, _id) => async dispatch => {
  await graphqlNewPost(text, _id)(dispatch)
  await graphqlRefresh(dispatch)
}

export default graphqlNewPostAndRefresh
