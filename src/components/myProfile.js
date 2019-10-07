import React from 'react';
import 'antd/dist/antd.css';
import graphqlTokenThunk from '../actions/graphqlTokenThunk'
import graphqlRegThunk from '../actions/graphqlRegThunk'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode'
import graphqlCurrentUserThunk from '../actions/graphqlCurrentuserThunk'
import FollowUsers from '../elements/followUsers'
import graphqlFollowAndRefresh from '../actions/graphqlFollow'
import graphqlPostDeleteUserAndRefresh from '../actions/graphqlPostDelete'
import gqlAvatarChange from '../actions/gqlAvatarChange'
import Post from '../elements/Post'

class MyProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: '',
      img: {
        url: [],
        _id: []
      }
    }
    this.handleReg = this.handleReg.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.validate = this.validate.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.following = this.props && this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.following
    this.followers = this.props && this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.followers

    this.p = props
  }
  validate(state) {
    console.log(state)
    return {
      valid: state.name.length > 0 && state.password.length

    }
  }
  handleChange(e) {
    this.setState({ name: e.target.value })
    this.setState(this.validate)
  }

  handleChange2(e) {
    this.setState({ password: e.target.value })
    this.setState(this.validate)
  }



  handleSend(props) {

  }

  handleReg(props) {

    this.props.graphqlRegThunk(this.state.name, this.state.password)

  }
  handleFollowers(props) {

  }
  handleOpen(event) {
    event.target.className = "following-users"
  }
  handleClose(event) {
    console.log(event.target);
  }
  unsubscribe(_id) {
    this.props.graphqlFollowAndRefresh((
      this.props.props[1].currentUser.payload.UserFindOne.following.map(i => i._id).filter(item => item !== _id)
    ))
  }
  subscribe(_id) {
    this.props.graphqlFollowAndRefresh((this.props.props[1].curentUser && this.props.props[1].curentUser.following ?
      this.props.props[1].curentUser.following.map(i => i._id) :
      [])
      .concat([_id]))
  }
  render(props) {


    return (

      <div className='u1'>
        {localStorage.authToken ? <div className='user'>
          <div className = 'user-info'>
          <h2> {(jwtDecode(localStorage.authToken)).sub.login}</h2>
    <img src = {this.props&& this.props.props && this.props.props[1] &&
      this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.avatar && this.props.props[1].currentUser.payload.UserFindOne.avatar.url ? this.props.props[1].currentUser.payload.UserFindOne.avatar.url :process.env.PUBLIC_URL + '/anon.jpg' }/>
     
        <div className = 'avatar'>
          <div>Для смены автара</div>
        <form action="/upload" method="post" encType="multipart/form-data" id='form2'>
  <input type="file" name="photo" id='photo' onChange = {async () => {
                fetch('/upload', {
                    method: "POST",
                    headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                    body: new FormData(document.getElementById('form2'))
                }).then(res => res.json())
                .then(response => 
                  this.props.gqlAvatarChange(response._id))
                  
            }}
  />
</form>
        </div>
       
          </div>
          <div className = 'dop-user-info'>
          <button onClick={() => {
          localStorage.removeItem("authToken");
          window.location.reload()
        }}>Log Out</button>
          <div className = "following-users-none" onClick = {this.handleOpen}>Подписки : {this.props&& this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.following ? this.props.props[1].currentUser.payload.UserFindOne.following.length : 0}
          <FollowUsers p = {this.props&& this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.following} buttonText = "Отписаться" unsubscribe   = {this.unsubscribe}/>
        </div>
          <div className="following-users-none"
            onClick={this.handleOpen}>Подписчиков : {this.props && this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.followers ?this.props.props[1].currentUser.payload.UserFindOne.followers.length : 0}
            <FollowUsers p={this.props && this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.followers} subscribe={this.subscribe} unsubscribe={this.unsubscribe} following={this.props && this.props.props && this.props.props[1] && this.props.props[1].currentUser && this.props.props[1].currentUser.payload && this.props.props[1].currentUser.payload.UserFindOne && this.props.props[1].currentUser.payload.UserFindOne.following}
            />
          </div>
          </div>
        </div> : <div><h2>"You must log in"</h2>
            <div>
              <input value={this.state.name}
                onChange={this.handleChange}
                style={{ backgroundColor: this.state.valid ? '' : '#f99', type: 'password' }}
              />
              <input value={this.state.password}
                onChange={this.handleChange2}
                style={{ backgroundColor: this.state.valid ? '' : '#f99' }}
              />
              <button
                disabled={!this.state.valid}
                onClick={this.handleSend}
              >Log inn</button>
              <br />



              <button
                onClick={this.handleReg}
              >Reg</button>
              <br />

            </div>
          </div>}
        {this.props.props[2].currentUserPosts && this.props.props[2].currentUserPosts.payload && this.props.props[2].currentUserPosts.payload.PostFind ? this.props.props[2].currentUserPosts && this.props.props[2].currentUserPosts.payload && this.props.props[2].currentUserPosts.payload.PostFind.map((post) =>
          <Post post={post} graphqlNewComment={this.props.graphqlNewCommentUser}
            graphqlPostDeleteUserAndRefresh={this.props.graphqlPostDeleteUserAndRefresh}
            deleted={true} />
        ) : <h1>Вы еще не добавили ни одного поста</h1>}
      </div>


    )
  }
}
let mapStateToProps = st => ({
  props: [
    {
      log:


        [[st.promiseReducer &&
          st.promiseReducer.Token &&
          st.promiseReducer.Token.payload &&
          st.promiseReducer.Token.payload.login
          // && st.promiseReducer.Login.payload.login[0]
        ]]
    },
    {
      currentUser:
        st &&
        st.promiseReducer &&
        st.promiseReducer.CurentUser
        &&
        st.promiseReducer.CurentUser
    },
    {
      currentUserPosts:
        st &&
        st.promiseReducer &&
        st.promiseReducer.CurrentUserPosts
        &&
        st.promiseReducer.CurrentUserPosts
    }
  ]
})

let MyProfile1 = connect(mapStateToProps, { graphqlTokenThunk, graphqlRegThunk, graphqlCurrentUserThunk, graphqlFollowAndRefresh, graphqlPostDeleteUserAndRefresh, gqlAvatarChange })(MyProfile)
export default MyProfile1