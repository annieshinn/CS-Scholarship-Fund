import React, { Component } from 'react';
import Login from './components/Login';
import Donation from './components/Donation';
import Signup from './components/Signup';

import DemoMap from "./map/components/DemoMap";
import 'leaflet/dist/leaflet.css';
import './styles.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';


class App extends Component{
    constructor(props) {
      super(props);
      this.state = {
        credit_card : '', 
         phone_num: '',
        amount: '',
        user_id: null,
        user_name: '',
        user_donations: [],
        username: '',
        password: '',
        totalRaised: 0
      
      };
    this.editState = this.editState.bind(this);
    this.postToDB = this.postToDB.bind(this);
    this.logInToDB = this.logInToDB.bind(this);
    this.openMap = this.openMap.bind(this);
    this.editUserSignup = this.editUserSignup.bind(this);
    }

  // Changing the value of state to the value of input of donation form
  editState(event){
    // console.log(event.target);
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
    // this.setState({...this.state, [event.target.id]: event.target.value})
  };
  // post request to update user info

  postToDB(){
    const donationObj = 
    {
      user_id: this.state.user_id,
      username: this.state.user_name,
      amount: parseInt(this.state.amount),
      credit_card: this.state.credit_card,
    };
    
    fetch('/donation', {
      method: 'POST', // or 'PUT'
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(donationObj),
    })
      .then(response => response.json())
      .then(res => {    
        if (res.status === 'Success inserting donation row') {
          console.log('Success:', res);
          this.setState({
            ...this.state,
            user_donations: res.userHistory,
            credit_card : '', 
            amount: '',
          })
        } 
     })
      .catch((error) => {
       console.error('Error posting a donation request:', error);
      });

    // clear the donation amount & creditcard input field
    document.getElementById('amount').value = '';
    document.getElementById('credit_card').value = '';

  };


  // post request to verify user login
  logInToDB(){
    const userObj = 
    {
      username: this.state.username,
      password: this.state.password
    };
 
    fetch('/user/login', {
        method: 'POST', // or 'PUT'
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userObj),
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'Success logging in!'){
          console.log('Logged in user: ', data.userInfo );
          const user = data.userInfo;
          this.setState({
            ...this.state,
            user_name: user.username,
            user_id:   user._id,
            user_donations: data.userHistory,
            username : '', 
            password: ''
          })        
        }
      })
      .catch((error) => {
      console.error('Error fetching login:', error);
      });
  };

  openMap() {
    // if not showing, show
    if (document.querySelector('#mapContainer').style.display!=='flex') {
      document.querySelector('#mapContainer').style.display='flex';
    } else {
      document.querySelector('#mapContainer').style.display='none';
    }

  }

  editUserSignup (user) {
    this.setState({
      ...this.state,
      user_name: user.username,
      user_id: user._id,
      });    
  };

  componentDidMount() {
    fetch('/donation/total', {
      method: 'GET', 
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'Success getting total donations'){
        console.log('Collected: ', data.donation );
        const user = data;
        this.setState({
          ...this.state,
          totalRaised: data.donations
        })        
      }
    })
  }
 
  // componentDidMount for Total Raised $ fetch request


      render() {
        return (
          <Router>

            <div>
              <div className="main">
                  <h1>Computer Science Scholarship Fund</h1>
                  <div id="header">
                    <button id="mapButton" onClick={this.openMap} type="submit">See donors on the map!</button>
                    <p id="about">The CS Scholarship Fund wants to make one of the strongest Computer Science programs in the US fully accessible to all. CS scholarships are solely need-based and prioritize underrepresented people in the tech industry such as women, LGBTQ, and minorities. Internal scholarship applications must be submitted 14 days prior to your desired start date.  Please consider donating today!  We thank you for your generous contribution and hope you consider becoming a regular donor.</p>   
                    
                    <h3 id="totalHomePage">Total Raised ${this.state.totalRaised}</h3>
                  </div>
              </div>
              
              <DemoMap/>

              <Switch>
                <Route
                  exact path= "/"
                  render = {props => <Login {...props}  state = {this.state} editLogin = {this.editState} logInToDB = {this.logInToDB}/>}
                />
                <Route
                  exact path= "/donation"
                  render = {props => <Donation {...props}  onDonate = {this.editState} postToDB = {this.postToDB}  state = {this.state} />  }
                /> 
                <Route
                  exact path= "/signup"
                  render = {props => <Signup {...props}  editUserSignup = {this.editUserSignup}  state = {this.state} />}
                /> 
              </Switch>
            </div>
          </Router>
          
        )
      };
    };


    
  
export default App;


