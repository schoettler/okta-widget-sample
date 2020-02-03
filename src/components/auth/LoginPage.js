import React from 'react'
import { widget } from '../../okta-widget'

export default class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = { user: null }

    this.handleLogout = this.handleLogout.bind(this)
    this.showLogin = this.showLogin.bind(this)
  }

  componentDidMount () {
    if (!widget.session || this.state.user === null) {
      this.showLogin()
    } else {
      widget.session.get(response => {
        if (response.status !== 'INACTIVE') {
          this.setState({ user: response.login })
        }
      })
    }
  }

  showLogin () {
    widget.renderEl(
      { el: this.loginContainer },
      response => {
        console.log(response)
        this.setState({ user: response.user.profile.login })
        widget.remove()
      },
      err => {
        console.log(err)
      }
    )
  }

  handleLogout () {
    this.setState({ user: null })
    console.log('sign out defined?', widget.signOut)
  }

  render () {
    return (
      <div>
        {this.state.user ? (
          <div className='container'>
            <div>Welcome, {this.state.user}!</div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        ) : null}
        {this.state.user ? null : (
          <div
            ref={div => {
              this.loginContainer = div
            }}
          />
        )}
      </div>
    )
  }
}
