/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/WebArcade.png";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  // const [activeTab, setActiveTab] = useState("");

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log("Couldn't logout");
    }
  };

  useEffect(() => {
    function test() {
      var tabsNewAnim = $("#navbarSupportedContent");
      var navigationContent = document.getElementById("navbarSupportedContent");
      var navigationElements = navigationContent.getElementsByTagName("li");

      var horiSelector = document.querySelector(".hori-selector");
      var activeRoute = sessionStorage.getItem("activeRoute");

      if (activeRoute) {
        for (var i = 0; i < navigationElements.length; i++) {
          if (activeRoute === navigationElements[i].id) {
            navigationElements[i].classList.add("active");

            var activeWidthNewAnimHeight = navigationElements[i].offsetHeight;
            var activeWidthNewAnimWidth = navigationElements[i].offsetWidth;
            var itemPosNewAnimTop = navigationElements[i].offsetTop;
            var itemPosNewAnimLeft = navigationElements[i].offsetLeft;
            horiSelector.style.top = itemPosNewAnimTop + 5 + "px";
            horiSelector.style.left = itemPosNewAnimLeft + "px";
            horiSelector.style.height = activeWidthNewAnimHeight - 10 + "px";
            horiSelector.style.width = activeWidthNewAnimWidth + "px";
          }
        }
      }

      // var activeItemNewAnim = navigationContent.querySelector(".active");
      // if (activeItemNewAnim) {
      //   console.log("yeet");
      //   var activeWidthNewAnimHeight = activeItemNewAnim.clientHeight;
      //   var activeWidthNewAnimWidth = activeItemNewAnim.clientWidth;
      //   var itemPosNewAnimTop = activeItemNewAnim.offsetTop;
      //   var itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;

      //   $(".hori-selector").css({
      //     top: itemPosNewAnimTop + "px",
      //     left: itemPosNewAnimLeft + "px",
      //     height: activeWidthNewAnimHeight + "px",
      //     width: activeWidthNewAnimWidth + "px",
      //   });
      // }

      function handleClick(event) {
        sessionStorage.setItem("activeRoute", event.currentTarget.id);

        setTimeout(function () {
          $(".navbar-collapse").slideUp(300);
          $("#navbarToggle").prop("checked", false);
        }, 600);
        for (var i = 0; i < navigationElements.length; i++) {
          navigationElements[i].classList.remove("active");
        }
        event.currentTarget.classList.add("active");
        var activeWidthNewAnimHeight = event.currentTarget.offsetHeight;
        var activeWidthNewAnimWidth = event.currentTarget.offsetWidth;
        var itemPosNewAnimTop = event.currentTarget.offsetTop;
        var itemPosNewAnimLeft = event.currentTarget.offsetLeft;
        horiSelector.style.top = itemPosNewAnimTop + 5 + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight - 10 + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      }

      for (var index = 0; index < navigationElements.length; index++) {
        navigationElements[index].addEventListener("click", handleClick);
      }
    }
    $(document).ready(function () {
      setTimeout(function () {
        test();
      });
    });
    $(window).on("resize", function () {
      setTimeout(function () {
        test();
      }, 500);
    });
    $(".navbar-toggler").click(function () {
      $(".navbar-collapse").slideToggle(300);
      setTimeout(function () {
        test();
      });
    });
  }, []);

  return (
    <>
      <div className="navbar-component">
        <nav className="navbar navbar-expand-custom navbar-mainbg">
          <div className="navbar-menu-icon">
            <input
              type="checkbox"
              className="navbar-toggler"
              id="navbarToggle"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <label className="navbar-hamburger" htmlFor="navbarToggle">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
          <Link
            className="navbar-logo"
            onClick={() => {
              window.location.reload();
            }}
            to={"/"}
          >
            <img className="navbar_logo" src={logo} alt="Logo" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div className="hori-selector">
                {/* <div className="left"></div>
                <div className="right"></div> */}
              </div>
              <li id="navHome" className="nav-item">
                <Link className="nav-link nav-home" to={"/"}>
                  <i className="far fa-address-book"></i>Home
                </Link>
              </li>
              <li id="navLeaderboard" className="nav-item">
                <Link
                  className="nav-link nav-leader-board"
                  to={"/leader-board"}
                >
                  <i className="far fa-address-book"></i>Leaderboard
                </Link>
              </li>
              <li id="navGames" className="nav-item">
                <Link className="nav-link nav-game-list" to={"/game-list"}>
                  <i className="far fa-address-book"></i>Games
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-right-space">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </nav>
        <div className="nav-login">
          {userInfo ? (
            <>
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/settings">
                  <NavDropdown.Item>Settings</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Link className="nav-link" to={"/login"}>
              <div className="nav-signin-pc">
                <FaSignInAlt /> Sign In
              </div>
              <div className="nav-signin-mobile">
                <FaSignInAlt /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
