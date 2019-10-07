import React from 'react'

let FollowUser = (p) =>
  <div className = 'user-wrapper'>
    <button onClick = { (event) => event.target.parentNode.parentNode.className = "following-users-none" }>Close</button>
<div className='user'>


    <div className='follow-user-info'>
    {
      p.p && p.p.map(user =>
        <div className="user-card">
          <div>
           {user.login}
         </div>
            <img src={user.avatar ? user.avatar.url : process.env.PUBLIC_URL + '/anon.jpg' } alt="avatar"/>
            
          <button onClick ={
          p.buttonText ? () =>  p.unsubscribe(user._id)  : p.following && p.following.map(followUser => followUser._id).includes(user._id) ? () => p.unsubscribe(user._id) : () =>  p.subscribe(user._id)  
             }>{p.buttonText ? p.buttonText : p.following && p.following.map(followUser => followUser._id).includes(user._id) ? "Отписаться" : "Подписаться" }</button>
        </div>
      )
    }
    </div>
  </div>
  </div>

export default FollowUser