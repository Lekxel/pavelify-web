import { Link } from "react-router-dom";
import SenderImage from "../../../../Assets/img/sender.svg";
import styles from "./SeconderButton.module.css";
export const SenderButton = ({ text, img = null, to = null, onClick = null, bg }) => {
  return (
    <Link
      style={{
        backgroundColor: bg || "rgb(18,35,94)"
      }}
      className={styles.SeconderButton}
      to={to || "/"}
      onClick={onClick ? onClick : (e) => {}}
    >
      {img ? img : <img src={SenderImage} alt="" />}
      <p className={styles.text}>{text}</p>
    </Link>
  );
};
