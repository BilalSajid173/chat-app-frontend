import classes from "../Navbar/navbar.module.css";
import { NavLink } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const openMenuHandler = () => {
    setShowMenu((prevState) => {
      return !prevState;
    });
  };
  return (
    <Fragment>
      <nav>
        <div className={classes.nav_left}>
          <div className={classes.search}>
            <i className="fa-solid fa-comment"></i>
            <h2>Konnect</h2>
          </div>
        </div>
        <div className={classes.nav_mid}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.activeicon}` : ""
            }
            to="/allposts"
          >
            <div className={classes.icons}>
              <span className="material-symbols-outlined">home</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.activeicon}` : ""
            }
            to="/friendlist"
          >
            <div className={classes.icons}>
              <span className="material-symbols-outlined">groups</span>
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.activeicon}` : ""
            }
            to="/user_account"
          >
            <div className={classes.icons}>
              <span className="material-symbols-outlined">account_circle</span>
            </div>
          </NavLink>
        </div>
        <div className={classes.nav_right}>
          <div className={classes.avatar}>
            <span>
              <strong>{authCtx.name}</strong>
            </span>
          </div>
          <div className={classes.buttons}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to="/add-post"
            >
              <span className="material-symbols-outlined">add</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ""
              }
              to="/allchats"
            >
              <span className="material-symbols-outlined">chat</span>
            </NavLink>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </div>
        <div className={classes.nav_right_mobile}>
          <NavLink className={classes.link} to="/allchats">
            <div className={classes.icons}>
              <span className="material-symbols-outlined">chat</span>
            </div>
          </NavLink>
          <div onClick={openMenuHandler} className={classes.icons}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
      {showMenu && (
        <Fragment>
          <div className={classes.backdrop} onClick={openMenuHandler}></div>
          <div className={classes.mobile_nav}>
            <div className={classes.avatar}>
              <span>
                <strong>{authCtx.name}</strong>
              </span>
              <i onClick={openMenuHandler} className="fa-solid fa-xmark"></i>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="/allposts">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">Home</span>
                  <h2>Home</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="/friendlist">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">groups</span>
                  <h2>Friends</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="/user_account">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  <h2>Account</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="/add-post">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">add</span>
                  <h2>Add Post</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">chat</span>
                  <h2>About</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">chat</span>
                  <h2>Contact Us</h2>
                </div>
              </NavLink>
            </div>
            <div className={classes.links_mobile}>
              <NavLink className={classes.link} to="">
                <div className={classes.icons}>
                  <span className="material-symbols-outlined">chat</span>
                  <h2>Logout</h2>
                </div>
              </NavLink>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navbar;
