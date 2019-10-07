import React from 'react';
import 'antd/dist/antd.css';
import graphqlNewPost from '../actions/graphqlNewPostThunk'
import { connect } from 'react-redux';

class NewPost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           post:'',
           img: {
            url:[],
            _id: []
          }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePost = this.handleChangePost.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        
      }
      handleChange(e) {
        this.props.graphqlNewPost(this.state.post,this.state.img._id)
        this.setState(
          { post: '',
          img: {
            url:[],
            _id: []
          }
       })
      }
      handleChangePost(e) {
        this.setState({ post: e.target.value })
      }
      handleChangeState(e) {
        this.setState( (state) => {state.img.url.push(1);
          state.img._id.push(2)
          return state
        } )
      }
      
    render() {
        return (
            <div>
               <div> {(this.state.img.url).map((url) => <img src ={url} alt="avatar"/>)}</div> 
               <form action="/upload" method="post" encType="multipart/form-data" id='form'>
  <input type="file" name="photo" id='photo' onChange = {async () => {
                fetch('/upload', {
                    method: "POST",
                    headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
                    body: new FormData(document.getElementById('form'))
                }).then(res => res.json())
                .then(response => 
                  this.setState( (state) => {state.img.url.push(response.url);
                    state.img._id.push({ _id: response._id});
                    return state
                  }
                  )
                  )
            }}
  />
</form>
            <input  value={this.state.post} type="text" onChange={this.handleChangePost} />
            <button onClick = {this.handleChange} >Send</button>
            <button onClick = {this.handleChangeState} >State</button>
            </div>
        )
    }
}
let NewPost1 = connect(null, {graphqlNewPost})(NewPost)

export default NewPost1