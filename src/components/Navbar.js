import React from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from "axios";

export default function Navbar() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  async function clearAndLogin() {
    try {
      await axios
        .post("http://localhost:3001/login", {
          username: userName,
          password: password,
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("username", response.data.username);
          sessionStorage.setItem("id", response.data.id);
          setIsLoggedIn(true);
          // console.log(response);
          setUserName("");
          setPassword("");
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 403) {
            alert(error.response.data);
          } else {
            alert("Server Error");
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  async function clearAndSignup() {
    try {
      await axios
        .post("http://localhost:3001/signup", {
          username: userName,
          password: password,
        })
        .then((response) => {
          setUserName("");
          setPassword("");
          alert("User account created!");
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 403) {
            alert(error.response.data);
          } else {
            alert("Server Error");
          }
        });
    } catch (error) {
      alert(error);
    }
  }
  async function deleteUser() {
    const response = await axios.delete("http://localhost:3001/user/", {
      data: { id: sessionStorage.getItem("id") },
    });
    console.log(response);
    setIsLoggedIn(false);
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("username", "");
    sessionStorage.setItem("id", "");
  }
  return (
    <nav id="nav" class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          Data Jugglers
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <Link className="nav-link" to="/">
                N1{" "}
              </Link>
            </li>

            <li class="nav-item">
              <Link className="nav-link" to="/N2">
                N2
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
            <li class="nav-item">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {!isLoggedIn && (
                    <a class="dropdown-item" href="#">
                      <Popup trigger={<a>Login</a>} position="right center">
                        <div className="popup">
                          <label>Enter Full Name </label>
                          <input
                            type="text"
                            placeholder="Enter username here"
                            id="t1"
                            class="tb"
                            required
                            name="fName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />

                          <label>Enter Password </label>
                          <input
                            type="password"
                            placeholder="Enter Password here"
                            id="t4"
                            class="tb"
                            required
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <input
                            type="reset"
                            value="Login"
                            onClick={function () {
                              clearAndLogin();
                            }}
                            id="res"
                            class="btn"
                          />
                        </div>
                      </Popup>
                    </a>
                  )}
                  {!isLoggedIn && (
                    <a class="dropdown-item" href="#">
                      <Popup trigger={<a>Signup</a>} position="right center">
                        <div className="popup">
                          <label>Enter Full Name </label>
                          <input
                            type="text"
                            placeholder="Enter username here"
                            id="t1"
                            class="tb"
                            required
                            name="fName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />

                          <label>Enter Password </label>
                          <input
                            type="password"
                            placeholder="Enter Password here"
                            id="t4"
                            class="tb"
                            required
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <input
                            type="reset"
                            value="Signup"
                            onClick={function () {
                              clearAndSignup();
                            }}
                            id="res"
                            class="btn"
                          />
                        </div>
                      </Popup>
                    </a>
                  )}
                  <a class="dropdown-item" href="/N3">
                    Your Views
                  </a>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={function () {
                      deleteUser();
                    }}
                  >
                    Delete User
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
