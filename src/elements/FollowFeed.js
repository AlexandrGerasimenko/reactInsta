import React from 'react';
import store from '../reducers/index'
import {
  Link,
} from 'react-router-dom'
import graphqlFollowAndRefresh from '../actions/graphqlFollow'
import jwtDecode from 'jwt-decode'

let FollowFeed = (props) =>

  <div className='posts'>
    {props && props.props && props.props[0].allUsers && props.props[0].allUsers
    .filter(user => user._id !== (jwtDecode(localStorage.authToken)).sub.id).filter(user => props.filter ? user.login && user.login.includes(props.filter) : user ).sort(function(a, b){
      if (a.login && b.login) {var nameA=a.login.toLowerCase(), nameB=b.login.toLowerCase()
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0} 
      })
    .map(user =>
    
    <div>
    
        <div className='user-card' >
        <Link to={`/userPage/`+ user._id} > {user.avatar ?
            <img src={"/" + user.avatar.url} alt="avatar" /> :
            <img alt="avatar" src={process.env.PUBLIC_URL + '/anon.jpg'} alt="avatar" />}
          <h3 onClick={() => { store.dispatch(props.graphqlUserPostsThunk(user._id)); 
            }}>
            {user.login}
          </h3>   </Link>
          {props.props[1] &&  props.props[1].curentUser  && props.props[1].curentUser.following ? (((props.props[1] &&  props.props[1].curentUser  && props.props[1].curentUser.following && props.props[1].curentUser.following.find(item => item._id === user._id) ) === undefined) ?
          <button
            onClick={() => {
              store.dispatch(graphqlFollowAndRefresh((props.props[1].curentUser.following ?
                props.props[1].curentUser.following.map(i => i._id) :
                [])
                .concat([user._id]))); 
                console.log( props.props[1].curentUser.following.map(i => i._id) .concat([user._id]))
            }}>Подписаться
    </button>
    :
    <button
            onClick={() => {
              store.dispatch(graphqlFollowAndRefresh((
                props.props[1].curentUser.following && props.props[1].curentUser.following.map(i => i._id).filter(item => item !== user._id)
              )));console.log( props.props[1].curentUser.following.map(i => i._id).filter(item => item !== user._id));
            }}>Отписаться
    </button>
    
    ) :    <button
    onClick={() => {
      store.dispatch(graphqlFollowAndRefresh((props.props[1].curentUser.following ?
        props.props[1].curentUser.following.map(i => i._id) :
        [])
        .concat([user._id]))); 
        
    }}>Подписаться
</button>
  }
        </div>
     
      </div>)
    }

  </div>

export default FollowFeed