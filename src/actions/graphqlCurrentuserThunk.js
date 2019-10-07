import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import jwtDecode from 'jwt-decode'

let graphqlCurrentUserThunk = () => promiseActionsMaker(
  'CurentUser',
  gql().request(
    `query UserFindOne($query:String!){
            UserFindOne(query:$query){
                _id,
              login,avatar {
                  _id,
                  url,
                  userAvatar{_id
                    }
              },
                followers  {
                _id,
              login,
              avatar {
                _id
                url
            },
                }   ,
               following  {
                _id,
              login,
              avatar {
                _id
                url
            }
                }   
              }
            }
          `, {
      "query": (JSON.stringify([{
        _id: (localStorage.authToken && (jwtDecode(localStorage.authToken)).sub.id)
      }]))
    }
  ))();
export default graphqlCurrentUserThunk
