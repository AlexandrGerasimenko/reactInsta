import React from 'react';
import 'antd/dist/antd.css';
import graphqlUserPostsThunk from '../actions/graphqlUserPostsThunk'
import { connect } from 'react-redux';
import FollowFeed from '../elements/FollowFeed'

class Follower extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filter: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    return (
      <div>
        <div className='user-find'>
          <input value={this.state.filter}
            onChange={this.handleChange} />
          <FollowFeed props={this.props.users}
            filter={this.state.filter}
            graphqlUserPostsThunk={graphqlUserPostsThunk} />
        </div>
        <FollowFeed props={this.props.users}
          graphqlUserPostsThunk={graphqlUserPostsThunk} />
      </div>
    )
  }
}
let mapStateToProps = st => ({
  users: [{
    allUsers:
      st.promiseReducer &&
      st.promiseReducer.users &&
      st.promiseReducer.users.payload &&
      st.promiseReducer.users.payload.UserFind
  },
  {
    curentUser:
      st.promiseReducer &&
      st.promiseReducer.CurentUser &&
      st.promiseReducer.CurentUser.payload &&
      st.promiseReducer.CurentUser.payload.UserFindOne
  }
  ]
}
)

let Users = connect(mapStateToProps, { graphqlUserPostsThunk })(Follower)
export default Users