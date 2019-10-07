import promiseActionsMaker from './promiseActionMaker';
import { GraphQLClient } from 'graphql-request'
import store from '../reducers/index'
import gql from './gql'
import graphqlPostThunk from './graphqlPostThunk'

const actionClean = name => ({
    type: 'PROMISE',
    name,
    status: 'RESOLVED',
    payload: null,
    error: null
})
export default actionClean