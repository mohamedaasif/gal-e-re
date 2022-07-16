import styles from "./styles.module.css";
import Status from "../Status";
import { Button } from "../../styled-components/button";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { months } from "../../utils/constants/constants";
import { postRequest } from "../../utils/services/api";
import { userid } from "../../utils/constants/constants";

const CreatePost = () => {
  const [file, setFile] = useState("");
  const [imageName, setImageName] = useState("");
  const [postStatus, setPostStatus] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const fileChange = (e) => {
    setFile(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const d = new Date();
  const date = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("caption", data.caption);
    formData.append("userid", userid);
    formData.append("date", date);

    // for (let val of formData.values()) {
    //   console.log(val);
    // }

    postRequest("/createpost", formData)
      .then((res) => {
        if (res) {
          setPostStatus(res.data.status);
          setImageName("");
          reset();
          setTimeout(() => {
            setPostStatus("");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      {postStatus ? <Status statusMsg={postStatus} /> : null}

      <div className={styles.heading}>
        <h2>Create a post</h2>
      </div>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.customFile} onChange={(e) => fileChange(e)}>
          <label htmlFor="inputFile">
            {imageName ? (
              <Fragment>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "var(--secondary-color)" }}
                ></i>
                <p className={styles.fileName}>{imageName}</p>
              </Fragment>
            ) : (
              <Fragment>
                <i
                  className="fas fa-cloud-upload-alt"
                  style={{ color: "var(--primary-color)" }}
                ></i>
                <p className={styles.chooseFile}>Upload an image</p>
              </Fragment>
            )}
          </label>
          <input type="file" id="inputFile" {...register("image")} />
        </div>
        <div className={styles.postFieldContainer}>
          <div className={styles.title}>
            <label>Title</label>
            <input type="text" {...register("title")} />
          </div>
          <div className={styles.caption}>
            <label>Caption</label>
            <textarea
              name=""
              id=""
              cols="100"
              rows="5"
              {...register("caption")}
            ></textarea>
          </div>
          <div className={styles.postButton}>
            <Button type="submit">Upload Post</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
