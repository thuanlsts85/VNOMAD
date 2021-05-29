import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import AuthService from "./services/auth.service";

import Login from "../../front/src/components/auth/login.component";
import Register from "../../front/src/components/auth/register.component";
import Home from "./components/welcome-guest page/home.component";
import Profile from "./components/user profile/profile.component";
import Guest from './components/role/guest/board-guest.component';
import Member from './components/role/member (not use)/board-member.component';
import Admin from './components/role/admin/board-admin.component';
import Plan from "./components/discover/plan.component";
import Loading from "./components/others/loading.component";
import DetailPlace from "./components/place detail/detailPlace.component";
import { GoogleMap } from "./components/others/google-map.component";
import Trip from "./components/plan trip/trip.component";
import TripDetail from "./components/trip-detail/trip-detail.component";
import Category from "./components/category/category.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      navbarChange: false,
      language: false,
      loggedIn: false,
      loading: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    //navbar scroll change
    window.addEventListener('scroll', this.changeNavbarColor)

    //open hamburger
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".left-nav");

    hamburger.addEventListener("click", mobileMenu);

    function mobileMenu() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    }

    //Close hamburger
    const navLink = document.querySelectorAll(".nav-link");
    navLink.forEach(n => n.addEventListener("click", closeMenu));
    function closeMenu() {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }

    //Color back
    navLink.forEach(n => n.addEventListener("click", colorback));
    function colorback() {
      navLink.forEach(n => n.classList.remove("colorchange"));
    }


  }

  logOut() {
    AuthService.logout();
  }

  colorChange() {
    const link = document.querySelectorAll(".nav-link");
    link.forEach(n => n.classList.add("colorchange"));
  }

  changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      this.setState({ navbarChange: true })
    } else {
      this.setState({ navbarChange: false })
    }
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, navbarChange, loggedIn } = this.state;

    return (
      <div >

        {/* <div className='notification'>
          <span className='first'>
            Get the latest on our COVID-19 response
          </span>
        </div> */}


        <nav className={navbarChange ? "navbar navbar-expand sticky-top active" : "navbar navbar-expand sticky-top"} >
          <div className="navbar-brand">
            VNomad <i style={{ color: 'red' }} className='fa fa-map-marker' />
          </div>

          <div className="navbar-nav left-nav" id='left-nav'>

            {!currentUser && (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  <i class="fas fa-home"></i> Home
                </Link>
              </li>
            )}

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" data-toggle='modal' data-target='#ln' >
                  <i class="fas fa-compass"></i> Discover
                </Link>

              </li>
            )}

            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" data-toggle='modal' data-target='#ln' >
                  <i class="fas fa-clipboard-list"></i> Plan
                </Link>

              </li>
            )}


            <li className={currentUser ? "nav-item" : "hide"}>
              <Link to={"/user"} className='nav-link' onClick={this.colorChange.bind(this)}>
                <i class="fas fa-home"></i> Home
                </Link>
            </li>



            <li className={currentUser ? "nav-item" : "hide"}>
              <Link to={'/discover'} className='nav-link'>
                <i class="fas fa-compass"></i> Discover
                </Link>
            </li>



            <li className={currentUser ? "nav-item" : "hide"}>
              <Link to={'/trip'} className='nav-link' >
                <i class="fas fa-clipboard-list"></i> Plan
                </Link>
            </li>


            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/member"} className="nav-link">
                  Member
                </Link>
              </li>
            )}


            <li className={showAdminBoard ? "nav-item" : "hide"}>
              <Link to={"/admin"} className="nav-link">
                <i class="fas fa-user-tie"></i> Admin-P
              </Link>
            </li>
            <li className={showAdminBoard ? "nav-item" : "hide"}>
              <Link to={"/category"} className="nav-link">
                <i class="fas fa-user-tie"></i> Admin-C
              </Link>
            </li>

          </div>

          <div class="hamburger" id='hamburger'>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>


          {/* the right of the navbar */}
          <div className='loginbutton'>
            {currentUser ? (
              <div className="navbar-nav">

                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    <i class="fas fa-user-circle"></i> {currentUser.username}
                  </Link>
                </li>

                <li className="nav-item">
                  <a href='/login' className="nav-link" onClick={this.logOut}>
                    <i class="fas fa-sign-out-alt"></i>
                  </a>
                </li>

              </div>
            ) : (
              <div className="navbar-nav">

                <li className="nav-item">
                  <Link to={"/login"} target='_blank' className="nav-link">
                    <i class="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} target='_blank' className="nav-link">
                    <i class="fas fa-pen-alt"></i> Register
                  </Link>
                </li>

              </div>
            )}
          </div>


        </nav>



        <div className='modal fade' id='ln'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>

              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>&times;</button>
              </div>

              <div className='modal-body'>
                You need to login to use this function!
              </div>

              <div className='modal-footer'>
                <button className='btn btn-primary' data-dismiss='modal' onClick={() => { this.setState({ loggedIn: true }) }}>
                  OK
                </button>
                {loggedIn && (
                  <Redirect to={'/login'} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="body">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={Guest} />
            <Route path="/member" component={Member} />
            <Route path="/admin" component={Admin} />
            <Route path="/discover" component={Plan} />
            <Route path="/loading" component={Loading} />
            <Route path='/map' component={GoogleMap} />
            <Route path='/trip' component={Trip} />
            <Route path="/category" component={Category} />
            <Route path="/detail/:_id" render={(props) => <DetailPlace {...props} />} />
            <Route path="/trip-detail/:_id" render={(props) => <TripDetail {...props} />} />
          </Switch>
        </div>
      </div >
    );
  }
}

export default App;