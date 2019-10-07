import promiseActionsMaker from './promiseActionMaker';
import refresh from './graphqlRefresh'
import gql from './gql'

let graphqlTokenThunk = (login, password) => promiseActionsMaker(
  'Token',
  gql().request(
    ` query login($login:String!, $password:String!){
        login(login:$login, password:$password)
      }`, {
      login,
      password
    })
  .then(result => {
    if (result.login)
      localStorage.authToken = result.login
    return result.login
  }));

const graphqlTokenThunkAndRefresh = (login, password) => async dispatch => {
  await graphqlTokenThunk(login, password)()(dispatch)
  await refresh(dispatch)
}

export default graphqlTokenThunkAndRefresh
