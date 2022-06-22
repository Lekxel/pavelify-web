import styles from "./TextMessage.module.css";
export const TextMessage = ({ message, isMe = false }) => {
  return (
    <p
      className={styles.TextMessage}
      style={{
        alignSelf: isMe && "flex-end",
        background: isMe && "#13215E",
        color: isMe && "#fff"
      }}
    >
      {message}
    </p>
  );
};
