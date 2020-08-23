import React, { useState, useEffect } from "react";
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar";
import StudentsPage from "./components/Students/StudentsPage";
import AddStudentPage from "./components/AddStudent/AddStudentPage";
import StudentPage from "./components/StudentPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/ProfilePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./css/App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.usertoken;
    if (token === undefined) {
      setLoggedIn(false);
    }
  }, []);

  useEffect(() => {}, [loggedIn]);

  return (
    <div className="App">
    
        <Router>
          <div className="page-content">
            <Switch>
              <Route exact path="/login">
                <h1>Hogwarts Admin Console</h1>
                <Login
                  login={() => {
                    setLoggedIn(true);
                  }}
                />
              </Route>
              <Route exact path="/register">
                <h1>Hogwarts Admin Console</h1>
                <Register
                  login={() => {
                    setLoggedIn(true);
                  }}
                />
              </Route>
              {!loggedIn && <Redirect to="login" />}
              {loggedIn && (
                <>
                  <NavBar />
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/students">
                    <StudentsPage />
                  </Route>
                  <Route exact path="/enroll-student">
                    <AddStudentPage />
                  </Route>
                  <Route path="/student/:id">
                    <StudentPage />
                  </Route>
                  <Route path="/profile">
                    <Profile
                      logout={() => {
                        setLoggedIn(false);
                      }}
                    />
                  </Route>
                </>
              )}
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
