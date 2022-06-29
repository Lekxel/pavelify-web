import ReactHtmlParser from "react-html-parser";
import { loadAttachment } from "utilities/misc";
import styles from "./TextMessage.module.css";

export const TextMessage = ({ chat, isMe = false }) => {
  return (
    <p
      className={styles.TextMessage}
      style={{
        alignSelf: isMe && "flex-end",
        background: isMe && "#13215E",
        color: isMe && "#fff"
      }}
    >
      {ReactHtmlParser(
        chat?.isAttachment
          ? loadAttachment(chat.attachment, chat.attachmentType, true)
          : chat.message
      )}
    </p>
  );
};
