import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import  ReservationsList from './ReservationsList'
import  CreateReservation  from './CreateReservation'
import  MeetingRoomsList from './MeetingRoomsList'
import  CreateMeetingRoom from './CreateMeetingRoom'
import  EmployeeList from './EmployeeList'
import Login from './containers/Login';
import Signup from './containers/Signup';
import './App.css';

class BaseLayout extends React.Component {
  render() {
    return(
          <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Meeting Room Panel</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">


            {
              this.props.isAuthenticated ?

                <div className="navbar-nav">
                <Link  className="nav-item nav-link" onClick={this.props.logout} to="/logout">Logout</Link>
                <Link className="nav-item nav-link" to="/">Reservations</Link>
                <Link className="nav-item nav-link" to="/customer">Make a Reservation</Link>
                <Link className="nav-item nav-link" to="/meeting_rooms">Meeting Rooms</Link>
                <Link className="nav-item nav-link" to="/create_meeting_rooms">Create a Meeting Room</Link>
                <Link className="nav-item nav-link" to="/employees">Employees</Link>
                </div>
                  :

                  <Link  className="nav-item nav-link"  to="/login">Login</Link>
                  }

              </div>
            </nav>  

            <div className="content">
              <Route path="/" exact component={ReservationsList} />
              <Route path="/customer/:pk"  component={CreateReservation} />
              <Route path="/customer/" exact component={CreateReservation} />
              <Route path="/meeting_rooms/" exact component={MeetingRoomsList} />
              <Route path="/create_meeting_rooms/" exact component={CreateMeetingRoom} />
              <Route path="/employees/" exact component={EmployeeList} />
              <Route  path="/login"  exact  component={Login}  />
              <Route  path="/signup"  exact  component={Signup}  />

            </div>

          </div>
    )}
  
  }

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <BrowserRouter>
        <BaseLayout {...this.props}/>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
