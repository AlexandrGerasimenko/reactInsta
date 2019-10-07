import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlUsersThunk from './graphqlUsersThunk'
import graphqlCurrentUserThunk from './graphqlCurrentuserThunk'
import graphqlFollowPosts from './graphqlFollowPosts'
import jwtDecode from 'jwt-decode'

let graphqFollow = (otherId) => promiseActionsMaker(
  'follow',
  gql().request(
    `mutation follow($myId:String,$following:[UserInput]){
UserUpsert(user:{_id: $myId,following:
$following
}){
_id
}
}`, {
      "myId": (jwtDecode(localStorage.authToken)).sub.id,
      "following": otherId.map((i) => {
        return {
          _id: i
        }
      })
    }
  ));

const graphqlFollowAndRefresh = (otherId) => async dispatch => {
  await graphqFollow(otherId)(dispatch)
  await graphqlUsersThunk()(dispatch)
  await graphqlCurrentUserThunk()(dispatch)
  await graphqlFollowPosts()(dispatch)

}

export default graphqlFollowAndRefresh
