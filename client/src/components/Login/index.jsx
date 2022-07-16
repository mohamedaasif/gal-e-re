import styles from "../../styles/styles.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../../redux/actions";
import { isUserDeleted } from "../../redux/actions";
import Svg from "../SvgComponent";
import { Button } from "../../styled-components/button";
import Status from "../Status";
import withPassword from "../../utils/HOC/withPassword";
import { postRequest } from "../../utils/services/api";

const Login = ({ showPassword, handleShowPassword }) => {
  const isDeleted = useSelector((state) => state.isDeleted);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      if (isDeleted) {
        dispatch(isUserDeleted());
      }
    }, 1500);
  }, []);

  const history = useHistory();

  const [userError, setUserError] = useState(false);

  const userDetails = {
    userid: "",
    password: "",
  };

  const handleChange = () => {
    setUserError(false);
  };

  const onSubmit = (data) => {
    userDetails.userid = data.userid;
    userDetails.password = data.password;

    postRequest("/login", userDetails)
      .then((res) => {
        console.log(res);
        if (res.data.auth) {
          localStorage.setItem("userid", res.data.userid);
          localStorage.setItem("token", res.data.token);
          dispatch(loggedIn());
          history.push({
            pathname: "/profile",
          });
        } else {
          setUserError(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.wrapper}>
      {isDeleted ? <Status statusMsg="Account Deleted" /> : null}
      <div className={styles.container}>
        <Svg />
        <div className={styles.formcontainer}>
          <div className={styles.loginheader}>
            <h1>Login into your account</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Username / Email</label>
                <br />
                <input
                  type="text"
                  autoComplete="off"
                  {...register("userid", { required: true })}
                  onChange={handleChange}
                />
                {errors.userid && errors.userid.type === "required" && (
                  <p className={styles.errorMsg}>This field is required</p>
                )}
              </div>
              <div className={styles.fa_eye}>
                <label>Password</label>
                <br />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  onChange={handleChange}
                />
                <i
                  className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                  onClick={handleShowPassword}
                ></i>
                {errors.password && errors.password.type === "required" && (
                  <p className={styles.errorMsg}>This field is required</p>
                )}
                {userError ? (
                  <p className={styles.errorMsg}>
                    Incorrect username or password
                  </p>
                ) : null}
              </div>
              <div>
                <Button type="submit" primary>
                  Login
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.forgetPassword}>
            <Link to="/changepassword">Forget Password ? </Link>
          </div>
          <div className={styles.signuplink}>
            <p>
              If you don't have an account. <Link to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withPassword(Login);
