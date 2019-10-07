import promiseActionsMaker from './promiseActionMaker';
import {
  GraphQLClient
} from 'graphql-request'
import store from '../reducers/index'
import gql from './gql'

let graphqlTokenThunk = () => promiseActionsMaker(
  'query',
  gql().request(
    `query Token {
            login(login: "Sh", password: "1234")
        }
        `, {}))();

store.dispatch(graphqlTokenThunk());
export default graphqlTokenThunk
