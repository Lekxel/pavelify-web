import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";
export const Button = ({
  text,
  type = null,
  outline = null,
  style,
  onClick = null,
  ext_class = null,
  to = "#",
  disabled = false
}) => {
  return onClick === null ? (
    <button
      disabled={disabled}
      className={`${styles.button} ${outline === true && styles.outline} 
      ${disabled && styles.disabled}`}
      style={style}
    >
      {type !== null ? (
        <Link
          to={to}
          className={`${styles.link} ${outline === true && styles.outline} ${
            disabled && styles.disabled
          }`}
        >
          {text}
        </Link>
      ) : (
        <p style={{ marginBottom: 0 }}>{text}</p>
      )}
    </button>
  ) : (
    <button
      disabled={disabled}
      className={`${styles.button} ${outline === true && styles.outline} ${
        ext_class !== null && "next_button"
      } ${disabled && styles.disabled}`}
      style={style}
      onClick={onClick}
    >
      {type !== null ? (
        <Link to={to} className={`${styles.link} ${outline === true && styles.outline}`}>
          {text}
        </Link>
      ) : (
        <p style={{ marginBottom: 0 }}>{text}</p>
      )}
    </button>
  );
};
