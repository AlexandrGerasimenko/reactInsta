import React from 'react';
import 'antd/dist/antd.css';
import graphqlNewComment from '../actions/graphqlNewComment'
import { connect } from 'react-redux';

class NewComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = { comment: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }
 

  handleChange(e) {
    this.setState({ comment: e.target.value })
  }
  
  handleSend() {  
    
     this.props.graphqlNewComment(this.state.comment,this.props.id);
    this.setState({ comment:'' });
    document.getElementById('commentText').value = ''


    
     
  }

  
  render() {
    return (

      <div>
         <input type = 'text' id = 'commentText' placeholder = 'Добавьте комментарий' onChange={this.handleChange}  />
          <button onClick = { this.handleSend} >Опубликовать</button>
      </div>

    )
  }
}




let NewComment1 = connect(null, {graphqlNewComment})(NewComment)

export default NewComment1