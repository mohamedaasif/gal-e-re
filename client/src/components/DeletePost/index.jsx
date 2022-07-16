import styles from "./styles.module.css";
import { Button } from "../../styled-components/button";
import { useEffect } from "react";
import { deleteRequest } from "../../utils/services/api";

const DeletePost = ({ deletePost, setDeletePost }) => {
  useEffect(() => {
    if (deletePost.status) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const cancelDelete = () => {
    setDeletePost({
      id: deletePost.id,
      status: false,
    });
  };

  const confirmDelete = () => {
    const id = deletePost.id;
    deleteRequest(`/profile/deletepost/${id}`).then((res) => {
      if (res.data.Deleted) {
        setDeletePost({
          id: "",
          status: false,
        });
      }
    });
  };

  return (
    <div className={styles.deleteModalContainer}>
      <div className={styles.deleteModalBox}>
        <p>Are you sure, you want to delete this post ?</p>
        <div className={styles.deleteModalButton}>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button primary onClick={confirmDelete}>
            Yes, Ofcourse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;
