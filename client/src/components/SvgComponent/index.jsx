import styles from "./styles.module.css";
import svg from "../../assets/arrow.svg";

const Svg = () => {
  return (
    <div className={styles.svg}>
      <img src={svg} alt="svg" />
    </div>
  );
};

export default Svg;
