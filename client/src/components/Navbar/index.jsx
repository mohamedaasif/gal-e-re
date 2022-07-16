import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux/actions";
import { useEffect, useState } from "react";
import Logo from "../Logo";
import { removeToken } from "../../utils/constants/constants";

const Navbar = () => {
  const [pathName, setPathName] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/changepassword"
    ) {
      setPathName(true);
    } else {
      setPathName(false);
    }
  }, [location]);

  const handleClick = () => {
    removeToken();
    dispatch(loggedIn());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.userprofile}>
          {!pathName ? (
            <div className={styles.authLinks}>
              <div className={styles.logout}>
                <Link to="/profile">
                  <i className="fas fa-user-alt"></i> Profile
                </Link>
                <Link to="/createpost">
                  <i className="fas fa-plus"></i> Create Post
                </Link>
              </div>
              <div className={styles.logout}>
                <Link to="/deleteaccount">Delete Account</Link>
                <Link to="/" onClick={handleClick}>
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.links}>
              <Logo />
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
