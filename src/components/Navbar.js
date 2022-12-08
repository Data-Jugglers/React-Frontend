import React from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

export default function Navbar() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  function clearAndLogin() {
    console.log(userName, password, "login");
    setUserName("");
    setPassword("");
  }
  function clearAndSignup() {
    console.log(userName, password, "signup");
    setUserName("");
    setPassword("");
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
                  <a class="dropdown-item" href="#">
                    <Popup trigger={<a>Login</a>} position="right center">
                      <div className="popup">
                        <label>Enter Full Name </label>
                        <input
                          type="text"
                          placeholder="Enter your full name here"
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
                            clearAndSignup();
                          }}
                          id="res"
                          class="btn"
                        />
                      </div>
                    </Popup>
                  </a>
                  <a class="dropdown-item" href="#">
                    <Popup trigger={<a>Signup</a>} position="right center">
                      <div className="popup">
                        <label>Enter Full Name </label>
                        <input
                          type="text"
                          placeholder="Enter your full name here"
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
                  <a class="dropdown-item" href="/N3">
                    Your Views
                  </a>
                  <a class="dropdown-item" href="#">
                    Delete
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
