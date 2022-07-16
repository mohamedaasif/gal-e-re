import styles from "./style.module.css";

const Status = ({ statusMsg }) => {
  return (
    <div className={styles.statusContainer}>
      <p className={styles.statusMsg}>{statusMsg}</p>
    </div>
  );
};

export default Status;
