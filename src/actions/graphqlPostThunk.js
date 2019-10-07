import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'

let graphqlPostThunk = () => {
  return promiseActionsMaker(
    'posts',
    gql().request(
      `query postAll{
          PostFind(query: "[{}]"){
            _id, 
            comments{
              _id,likes{
                _id,owner {
                  _id,
             login,avatar {
                 _id
                 url
               }
              }}
              text,
              owner {
                _id,
           login,avatar {
               _id
               url
             }
             }
              text, owner {
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
              _id
            }
            text,
            owner {
              _id,
         login,avatar {
             _id
             url
           }
           }
          }
        }
        `, {}))()
};

export default graphqlPostThunk
