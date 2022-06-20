import classes from "../Navbar/navbar.module.css";
import { Link } from "react-router-dom";
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
          <Link to="" className={classes.icons}>
            <span className="material-symbols-outlined">home</span>
          </Link>
          <Link to="" className={classes.icons}>
            <span className="material-symbols-outlined">groups</span>
          </Link>
          <Link to="" className={classes.icons}>
            <span className="material-symbols-outlined">home</span>
          </Link>
        </div>
        <div className={classes.nav_right}>
          <div className={classes.avatar}>
            <span>
              <strong>Name</strong>
            </span>
          </div>
          <div className={classes.buttons}>
            <Link to="/add-post">
              <span className="material-symbols-outlined">add</span>
            </Link>
            <span className="material-symbols-outlined">chat</span>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
