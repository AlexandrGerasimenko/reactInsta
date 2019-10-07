import promiseActionsMaker from './promiseActionMaker';
import store from '../reducers/index'
import gql from './gql'

let graphqlUsersThunk = () => promiseActionsMaker(
  'users',
  gql().request(
    `query UsersAll {
          UserFind(query: "[{}]") {
              _id,
            login,avatar {
                _id
                url
            },
            
              followers  {
              _id,
            login
              }   ,
             following  {
              _id,
            login
              }   
            }
          }        
        `,
         {}))();

store.dispatch(graphqlUsersThunk());
export default graphqlUsersThunk
