import { useEffect, useState } from "react";
import ProfilePost from "../ProfilePost";
import styles from "./styles.module.css";
import DeletePost from "../DeletePost";
import { userid, token } from "../../utils/constants/constants";
import { getRequest } from "../../utils/services/api";

const Profile = () => {
  const [postData, setPostData] = useState();

  const [deletePost, setDeletePost] = useState({
    id: "",
    status: false,
  });

  const removePost = (id) => {
    setDeletePost({
      id: id,
      status: true,
    });
  };

  useEffect(() => {
    getRequest(`/profile/${userid}`, token)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => console.log(err));
  }, [deletePost.id]);

  return (
    <div className={styles.container}>
      {postData ? (
        postData.map((data) => {
          return (
            <ProfilePost
              postData={data}
              key={data.id}
              removePost={removePost}
            />
          );
        })
      ) : (
        <h3>
          You have no post yet !!! Go to create post to upload your first post.
        </h3>
      )}
      {deletePost.status ? (
        <DeletePost setDeletePost={setDeletePost} deletePost={deletePost} />
      ) : null}
    </div>
  );
};

export default Profile;
