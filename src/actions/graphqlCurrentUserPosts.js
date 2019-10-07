import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import jwtDecode from 'jwt-decode'

let graphqlCurrentUserPosts = () => promiseActionsMaker(
  'CurrentUserPosts',
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
        ___owner: localStorage.authToken && (jwtDecode(localStorage.authToken)).sub.id
      },
      {
        sort: ['_id', 1]
      }
    ])
  }

))();

export default graphqlCurrentUserPosts
