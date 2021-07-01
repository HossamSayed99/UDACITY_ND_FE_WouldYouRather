import React, {Component} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUser } from '../actions/users'

class Navbar extends Component {
  handleLogout = () =>{
    this.props.dispatch(removeUser())
  }
  render(){
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new' activeClassName='active'>
              New question
            </NavLink>
          </li>
          <li>
              <NavLink to='/leaderboard' activeClassName='active'>
                  Leader Board
              </NavLink>
          </li>
          <li style={{textAlign: "right" }}>
            {this.props.users.currentUser ? this.props.users.currentUser : (<Link to = '/' > You are not signed in</Link>)}
          </li>
          {
            this.props.users.currentUser && (
              <li>
                <Link to= '/' className='active' onClick = {this.handleLogout}>
                    logout
                </Link>
              </li>
            )
          }
        </ul>
      </nav>
    )
  }
}
function mapStateToProps(state){
  const {users} = state
  return {
    users
  }
}
export default connect(mapStateToProps)(Navbar)
