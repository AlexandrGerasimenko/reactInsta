import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import createHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import Header from './components/header'
import Footer from './components/footer'
import Tape from './components/tape'
import NotFound from './components/notFound'
import MyProfile from './components/myProfile'
import NewPost from './components/newPost'
import Users from './components/users'
import store from './reducers';
import Entry from './components/entry'
import UserDetails from './components/userDetails'
import UserPage from './components/userPage'
import  refresh  from './actions/graphqlRefresh'

const history = createHistory()


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.authToken 
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/entry',
          state: { from: props.location }
        }} />
  )} />
)


// store.subscribe(() => console.log('STORE',  store.getState().promiseReducer.CurentUser && store.getState().promiseReducer.CurentUser.payload && store.getState().promiseReducer.CurentUser.payload.UserFindOne.following.map(user => user._id)))
store.dispatch(refresh)
// refresh(store.dispatch)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <div className='main-wrapper'>
            <Header />
            <div className='content-wraper'>
              {/* <Sider /> */}
              <Switch>
                <PrivateRoute path="/tape" component={Tape} />
                <Route path="/entry" component={Entry} />
                <PrivateRoute path="/myProfile" component={MyProfile} />
                <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/userPage" exact component={UserPage} />
                <PrivateRoute path="/userPage/:id" component={UserDetails} />/>
                <PrivateRoute path="/newpost" component={NewPost} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
      <Footer />
    </div>
  );
}


export default App;
