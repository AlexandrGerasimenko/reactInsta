import image from '../images/1.png'
import image2 from '../images/2.png'
import image3 from '../images/3.png'
import image4 from '../images/4.png'
import React from 'react';
import 'antd/dist/antd.css';
import { Carousel } from 'antd'
import graphqlTokenThunk from '../actions/graphqlTokenThunk'
import store from '../reducers/index'
import { connect } from 'react-redux';
import graphqlPostThunk from '../actions/graphqlPostThunk'
import graphqlRegLog from '../actions/graphqlRegLog'
import jwtDecode from 'jwt-decode'
import { Redirect } from 'react-router-dom'

class Enter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', password: '', valid: false, redirectToReferrer: false }
    this.handleReg = this.handleReg.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.validate = this.validate.bind(this);
    this.p = props
  }
  validate(state) {
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
    store.dispatch(graphqlTokenThunk(this.state.name, this.state.password))
      .then(console.log(this.props))
      .then(() => !this.props.log[0][0] ?
        document.getElementById('wrong').style.display = 'flex':
        (localStorage.authToken = this.props.log[0][0],
          this.setState(() => ({
            redirectToReferrer: true
          }
          )
          )
        )
      )
  }

  handleReg(props) {
    store.dispatch(graphqlRegLog
      (this.state.name, this.state.password))
      .then(
store.dispatch(graphqlTokenThunk(this.state.name, this.state.password))
          .then(console.log(this.props))
          .then(() => !this.props.log[0][0] ?
            alert("Wrong pass") :
            (localStorage.authToken = this.props.log[0][0],
              this.setState(() => ({
                redirectToReferrer: true
              }
              )
              )
            )
          )
      )
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return (

      <div className='entry'>
        <div className = 'entry-carousel'>
          <Carousel autoplay effect="fade" dots="false">
            <div><img src={image} alt="avatar" /></div>
            <div><img src={image2} alt="avatar"/></div>
            <div><img src={image3} alt="avatar"/></div>
            <div><img src={image4} alt="avatar"/></div>
          </Carousel>
        </div>

        <div className = 'log-wrapper'>
        <div id = 'wrong'>
          <h1>Неверное имя или пароль!</h1>
          <button onClick = {() => {document.getElementById('wrong').style.display = 'none';this.setState({ name:'' });this.setState({ password: '' })} }>Ok</button>
          </div>
          <h2>{localStorage.authToken ? ("Wellcome, " + (jwtDecode(localStorage.authToken)).sub.login) :
            "You must log in"}</h2>

          <div>Зарегистрируйтесь,что-бы просматривать фото и видео друзей</div>
          <div>
            <input value={this.state.name}
              // type = 'password'
              onChange={this.handleChange}
              style={{ backgroundColor: this.state.valid ? '' : '#f99', type: 'password' }}
            />
            <input value={this.state.password}
              onChange={this.handleChange2}
              style={{ backgroundColor: this.state.valid ? '' : '#f99' }}
            />
            <button id = 'log'
              disabled={!this.state.valid}
              onClick={this.handleSend}
            >Log in</button>

            <button
              onClick={this.handleReg}
            >Reg</button>
            <br />
            <div>
              Регистрируясь, вы принимаете наши Условия, Политику использования данных и Политику в отношении файлов cookie.
       </div>
          </div>
        </div>
      </div>
    )
  }
}
let mapStateToProps = st => ({
  log:

    [[st.promiseReducer &&
      st.promiseReducer.Token &&
      st.promiseReducer.Token.payload &&
      st.promiseReducer.Token.payload
    ]]
})

let Entry = connect(mapStateToProps, { graphqlRegLog, graphqlPostThunk, graphqlTokenThunk })(Enter)
export default Entry