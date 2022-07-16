import styles from "./styles.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../styled-components/button";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux/actions";
import { isUserDeleted } from "../../redux/actions";
import withPassword from "../../utils/HOC/withPassword";
import { deleteRequestWithData } from "../../utils/services/api";
import { userid } from "../../utils/constants/constants";
import { removeToken } from "../../utils/constants/constants";

const DeleteAccount = ({ showPassword, handleShowPassword }) => {
  const [deleteUser, setDeleteUser] = useState(false);
  const [userError, setUserError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = () => {
    setDeleteUser(true);
  };

  const handleChange = () => {
    setUserError(false);
  };

  const onSubmit = (data) => {
    const password = data.password;
    deleteRequestWithData(`/deleteuser/${userid}`, password)
      .then((res) => {
        if (res.data) {
          dispatch(loggedIn());
          dispatch(isUserDeleted());
          removeToken();
          history.push("/");
        } else {
          setUserError(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.title}>
      <h1>Are you sure, you want to delete your account {userid}?</h1>
      <div className={styles.homeButtons}>
        <Button onClick={handleDelete}>Delete Account</Button>
      </div>

      {deleteUser ? (
        <div className={styles.userPassword}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Enter Password</label>
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
              <p className={styles.errorMsg}>Incorrect password</p>
            ) : null}
            <br />
            <Button primary type="submit">
              Confirm Delete
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default withPassword(DeleteAccount);
