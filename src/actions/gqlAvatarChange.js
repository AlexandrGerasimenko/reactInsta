import promiseActionsMaker from './promiseActionMaker';
import gql from './gql'
import graphqlUsersThunk from './graphqlUsersThunk'
import graphqlCurrentUserThunk from './graphqlCurrentuserThunk'
import graphqlFollowPosts from './graphqlFollowPosts'
import jwtDecode from 'jwt-decode'

let gqlAvatarChange = (otherId) => promiseActionsMaker(
  'avatarChange',
  gql().request(
    `mutation avatarChange($myId:String,$otherId:ID){
  UserUpsert(user:{_id: $myId,avatar:
    {
        _id: $otherId
      }
  })
  {
    _id
  }
}`, {
      "myId": (jwtDecode(localStorage.authToken)).sub.id,
      "otherId": otherId
    }
  ))();

const gqlAvatarChangeAndRefresh = (otherId) => async dispatch => {
  await gqlAvatarChange(otherId)(dispatch)
  await graphqlUsersThunk()(dispatch)
  await graphqlCurrentUserThunk()(dispatch)
  await graphqlFollowPosts()(dispatch)

}

export default gqlAvatarChangeAndRefresh
