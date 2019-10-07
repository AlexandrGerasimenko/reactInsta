import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'

let graphqlRegThunk = (login, password) => promiseActionsMaker(
  'Reg',
  gql().request(
    `
        mutation createUser($login: String!, $password: String!){
            createUser(login: $login, password: $password){
                _id, login
            }
        }
          `, {
      login,
      password
    }))();

export default graphqlRegThunk
