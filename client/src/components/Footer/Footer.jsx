import styles from "./styles.module.css";

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.social}>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/mohamed-usoof-aasif/">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/mohamedaasif">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/mohamedaasif_">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://www.reddit.com/user/Aasifdev">
                <i className="fab fa-reddit-alien"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <a href="mailto:mohamedaasif.md@gmail.com">
            mohamedaasif.md@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
