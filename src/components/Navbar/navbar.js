import classes from '../Navbar/navbar.module.css';
import { Fragment } from 'react';

const Navbar = (props) => {
    return(
        <Fragment>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <nav>
                <div className={classes.nav_left}>
                    <div className={classes.search}>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                    <input type="text" placeholder='Search' />
                    </div>
                </div>
                <div className={classes.nav_mid}>
                    <a href="#" className={classes.icons}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </a>
                    <a href="#" className={classes.icons}>
                        <span className="material-symbols-outlined">
                            groups
                        </span>
                    </a>
                    <a href="#" className={classes.icons}>
                        <span className="material-symbols-outlined">
                            home
                        </span>
                    </a>
                </div>
                <div className={classes.nav_right}>
                    <div className={classes.avatar}>
                        <span><strong>Name</strong></span>
                    </div>
                    <div className={classes.buttons}>
                        <span className="material-symbols-outlined">
                            add 
                        </span>
                        <span className="material-symbols-outlined">
                            chat
                        </span>
                        <span className="material-symbols-outlined">
                            arrow_drop_down 
                        </span>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;