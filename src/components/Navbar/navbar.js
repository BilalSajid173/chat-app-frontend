import classes from "../Navbar/navbar.module.css";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Navbar = (props) => {
  return (
    <Fragment>
      <nav>
        <div className={classes.nav_left}>
          <div className={classes.search}>
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search" />
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
              <strong>Name</strong>
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
            <span className="material-symbols-outlined">chat</span>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
