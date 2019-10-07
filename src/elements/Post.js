import React from 'react'
import {  Icon } from 'antd';
import { Carousel } from 'antd'
import NewComment from '../components/newComment'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'

let Post = ({ post: { _id, text, images, comments, likes, owner }, graphqlLikeAndRefresh,graphqlLikeDeleteAndRefresh,graphqlNewComment,graphqlPostDeleteUserAndRefresh,graphqlLikeCommentAndRefresh,deleted }) =>

  <div className='post'>
    
<Link to={`/userPage/`+ owner._id} >
    <div className='user-card'>{owner && owner.avatar ? <img src={'/' + owner.avatar.url} alt="avatar" /> : <img src={process.env.PUBLIC_URL + '/anon.jpg'} alt="avatar" />}<h2>{owner && owner.login}</h2></div>
   </Link>
    <Carousel autoplay  >


      {images && images.map((image) => <div className='immage'>
        <img src={'/' + image.url} alt="avatar" />

      </div>)}

    </Carousel>


    <div className='post-icons'>
      <div className='post-icons-left'>
        <button 
        onClick={
          
    
        deleted ? (null) :(likes && likes.map(like => like.owner._id).includes(jwtDecode(localStorage.authToken).sub.id) ? () =>
        (graphqlLikeDeleteAndRefresh(likes.map(like => { if(like.owner._id === jwtDecode(localStorage.authToken).sub.id) return like}).filter(like => like !== undefined)[0]._id 
        ,window.location.pathname.split("/").slice(-1)[0]))  :
        () => (graphqlLikeAndRefresh(_id,window.location.pathname.split("/").slice(-1)[0]))  )    
          }
          > {likes.length > 0 && likes.length}{likes.length ? <Icon type="heart" className="red" /> : <Icon type="heart" />}</button>
        <Icon onClick={() =>
          console.log(_id)} type="message" />
        <Icon type="upload" />
      </div>
      <div className='post-icons-right'>
        <Icon type="save" />
      </div>
    </div>
    <h2> {text}</h2>
    <div className = 'comments'>
    {
      comments && comments.map((comment) =>
        comment ?
        <Link to={`/userPage/`+ comment.owner._id} >
          <div className="comment-wrapper" style={{ color: "red" }}>
            <div className='comment-user'>
              <img className='comment-img' alt="avatar" src={comment.owner && comment.owner.avatar ? '/' + comment.owner.avatar.url : process.env.PUBLIC_URL + '/anon.jpg'} />
              <div className='comment-login'>{comment.owner && comment.owner.login}</div>
            </div>
            <div>{comment.text}</div>
            {/* <button onClick = {() => graphqlLikeCommentAndRefresh(comment._id)}>Like</button> */}
          </div>
          </Link>
          : null)
         
          }
    </div>
    <div className='newComment'>

      <NewComment id={_id} graphqlNewComment = {graphqlNewComment} />

    </div>
    {deleted ? <div className = 'deleted'><button onClick = {() => (graphqlPostDeleteUserAndRefresh(_id))}>Удалить</button></div> : null}
  </div>
export default Post