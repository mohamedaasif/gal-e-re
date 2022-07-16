import styles from "../../styles/styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Svg from "../SvgComponent";
import { Button } from "../../styled-components/button";
import withPassword from "../../utils/HOC/withPassword";
import { updateRequest } from "../../utils/services/api";

const ChangePassword = ({ showPassword, handleShowPassword }) => {
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
    setCheckUser(false);
  };

  const onSubmit = (data) => {
    userDetails.userid = data.userid;
    userDetails.password = data.password;
    userDetails.confirmPassword = data.confirmPassword;
    if (userDetails.password !== userDetails.confirmPassword) {
      setPasswordNotMatch(true);
    } else {
      updateRequest("/changepassword", userDetails)
        .then((res) => {
          if (res.data.NotFound) {
            setCheckUser(true);
          } else if (res.data.PasswordChanged) {
            setUserCreated(true);
            reset();
          }
          setTimeout(() => {
            setUserCreated(false);
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Svg />
        <div className={styles.formcontainer}>
          <div className={styles.loginheader}>
            <h1>Change your password</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Enter Your Username</label>
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
                <p className={styles.errorMsg}>User does not exists</p>
              ) : null}
            </div>
            <div className={styles.fa_eye}>
              <label>New Password</label>
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
              <label>Confirm New Password</label>
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
                Password Successfully Changed
              </p>
            ) : null}
            <div className={styles.signupbtn}>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withPassword(ChangePassword);
