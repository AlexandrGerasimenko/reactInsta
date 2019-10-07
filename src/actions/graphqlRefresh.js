import graphqlPostThunk from './graphqlPostThunk'
import graphqlCurrentUserThunk from './graphqlCurrentuserThunk'
import graphqlFollowPosts from './graphqlFollowPosts'
import graphqlUsersThunk from './graphqlUsersThunk'
import graphqlCurrentUserPosts from './graphqlCurrentUserPosts'

const refresh = async dispatch => {
  await graphqlUsersThunk()(dispatch)
  await graphqlPostThunk()(dispatch)
  await graphqlCurrentUserThunk()(dispatch)
  await graphqlFollowPosts()(dispatch)
  await graphqlCurrentUserPosts()(dispatch)
}

export default refresh
