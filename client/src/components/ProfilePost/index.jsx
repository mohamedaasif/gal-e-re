import styles from "./styles.module.css";

const ProfilePost = ({ postData, removePost }) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <p>{postData.userid}</p>
          <p onClick={() => removePost(postData.id)}>Remove</p>
        </div>
        <div className={styles.cardImg}>
          <img src={`${postData.image_path}`} alt="" />
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.titleName}>
            <p>{postData.title}</p>
            <p>{postData.date}</p>
          </div>
          <p>{postData.caption}</p>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
