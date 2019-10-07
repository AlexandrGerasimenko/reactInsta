import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'

let graphqlUserPostsThunk = (id) => promiseActionsMaker(
  'UserPosts',
  gql().request(
    `query UserPosts($query:String!){
        PostFind(query:$query){
          _id, 
          comments{
            _id,
            text,
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
              _id}

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
          ___owner: id
        },
        {
          limit: [20],
          sort: ['_id', 1]
        }
      ])
    }

  ))();

export default graphqlUserPostsThunk
