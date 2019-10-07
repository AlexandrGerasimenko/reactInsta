import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'

let graphqlRegLog = (login, password) => async dispatch => {
  await promiseActionsMaker(
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
      }))()(dispatch)
}


export default graphqlRegLog
