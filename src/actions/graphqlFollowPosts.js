import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import store from '../reducers';

let graphqlFollowPosts = (id) => promiseActionsMaker(
  'FollowPosts',
  gql().request(
    `query FollowPosts($query:String!){
        PostFind(query:$query){
          _id, 
          comments{
            _id,
            text,likes{
              _id,owner {
                _id,
           login,avatar {
               _id
               url
             }
            }},
            owner {
              _id,
         login,avatar {
             _id
             url
           }
           }
          },
          images{
            _id, url
          },
         
          likes{
            _id,
            owner {
              _id,
         login}
          }
          text
          owner {
            _id,
       login,avatar {
           _id
           url
         }
         }
        }
      }
      `, {
      "query": JSON.stringify([{
          ___owner: {
            $in: store.getState().promiseReducer.CurentUser && store.getState().promiseReducer.CurentUser.payload && store.getState().promiseReducer.CurentUser.payload.UserFindOne.following &&store.getState().promiseReducer.CurentUser.payload.UserFindOne.following.map(user => user._id)
          }
        },
        {
          limit: [20]
        }
      ])
    }
  ))();

export default graphqlFollowPosts
