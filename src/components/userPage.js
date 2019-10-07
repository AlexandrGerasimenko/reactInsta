// import React from 'react'
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// import { Comment, Avatar } from 'antd';
// import { Card } from 'antd';
// import { Provider, connect } from 'react-redux';
// import { Carousel } from 'antd'
// import NewComment from './newComment'
// import graphqlLike from '../actions/graphqlLike'
// import Post from '../elements/Post'


// let UserFeed = (p) =>

//   <div className='posts'>
//       <h1 className = 'red'></h1>
//     {p.posts && p.posts.map(post => <Post post={post} />)}
  
//   </div>

// let mapStateToProps = st => ({
//   posts:


//     st.promiseReducer &&
//     st.promiseReducer.UserPosts &&
//     st.promiseReducer.UserPosts.payload &&
//     st.promiseReducer.UserPosts.payload.PostFind

// })

// let UserPage = connect(mapStateToProps)(UserFeed)

// export default UserPage