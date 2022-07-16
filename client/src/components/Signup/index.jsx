import styles from "../../styles/styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Svg from "../SvgComponent";
import { Button } from "../../styled-components/button";
import withPassword from "../../utils/HOC/withPassword";
import { postRequest } from "../../utils/services/api";

const Signup = ({ showPassword, handleShowPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const userDetails = {
    userid: "",
    password: "",
    confirmPassword: "",
  };

  const handleChange = () => {
    setPasswordNotMatch(false);
  };

  const onSubmit = (data) => {
    userDetails.userid = data.userid;
    userDetails.password = data.password;
    userDetails.confirmPassword = data.confirmPassword;

    if (userDetails.password === userDetails.confirmPassword) {
      postRequest("/signup", userDetails)
        .then((res) => {
          if (res.data) {
            setUserCreated(true);
            reset();
          } else {
            setCheckUser(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setPasswordNotMatch(true);
    }
    setTimeout(() => {
      setUserCreated(false);
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Svg />
        <div className={styles.formcontainer}>
          <div className={styles.loginheader}>
            <h1>Create an account</h1>
          </div>
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

              {checkUser ? (
                <p className={styles.errorMsg}>User already exists</p>
              ) : null}
            </div>
            <div className={styles.fa_eye}>
              <label>Password</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <i
                className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}
                onClick={handleShowPassword}
              ></i>
              {errors.password && errors.password.type === "required" && (
                <p className={styles.errorMsg}>This field is required</p>
              )}
            </div>
            <div className={styles.fa_eye}>
              <label>Confirm Password</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword", { required: true })}
                onChange={handleChange}
              />

              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <p className={styles.errorMsg}>This field is required</p>
                )}

              {passwordNotMatch ? (
                <p className={styles.errorMsg}>Password does not match</p>
              ) : null}
            </div>
            {userCreated ? (
              <p className={styles.userSuccess}>
                Account created. Please login to continue
              </p>
            ) : null}

            <div className={styles.signupbtn}>
              <Button type="submit">Signup</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withPassword(Signup);
