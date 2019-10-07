import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'

let graphqlAllImagesThunk = () => promiseActionsMaker(
  'allImages',
  gql().request(
    `query imgAll {
          ImageFind(query: "[{}]") {
            _id
            url
          }
        }
        `, {}))();

export default graphqlAllImagesThunk
