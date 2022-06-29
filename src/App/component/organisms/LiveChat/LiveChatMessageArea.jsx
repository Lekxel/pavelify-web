import { useCallback } from "react";
import { EmojiPicker } from "react-emoji-search";
import DefaultSender from "../../../../Assets/img/sender_default.svg";
import SenderImage from "../../../../Assets/img/sender_navy.svg";
import { TextMessage } from "../../Atoms/LiveChat/TextMessage";
import styles from "./LiveChatMessageArea.module.css";

export const LiveChatMessageArea = ({
  innerSize: { width, height },
  appearance,
  companyName,
  message,
  setMessage,
  handleSendMessage,
  chats,
  messagesEndRef,
  showEmojiPicker,
  setShowEmojiPicker
}) => {
  const HandleCovertingScreen = (e) => {
    e.preventDefault();
    document.querySelector("#collpase-area").style.display = "block";
    document.querySelector("#MessageArea").style.display = "none";
  };

  const addEmoji = useCallback((emoji) => {
    setMessage((m) => m + emoji);
  }, []);

  return (
    <div
      className={`${styles.LiveChatMessageArea} ${
        width <= 600 ? styles.LiveChatMessageArea_600 : ""
      } collapse-bot`}
      id="MessageArea"
    >
      <div className={`${styles.top} ${width <= 600 ? styles.top_600 : ""}`}>
        <div className={styles.CloseIcon} onClick={HandleCovertingScreen}>
          <i className="fas fa-chevron-left"></i>
        </div>

        <div className={styles.operator}></div>

        <div className={styles.presentation}>
          <h3 className={styles.heading_top}> {companyName}</h3>
          <p className={styles.para_top}>{appearance?.onlineStatus}</p>
        </div>
        <div className={styles.closeIconIntro}>
          <button type="button" className="btn">
            <i className="fas fa-ellipsis-v text-white"></i>
          </button>
        </div>
      </div>

      <div className={styles.body}>
        <div className={`${styles.bodyContent} ${width <= 600 ? styles.bodyContent_600 : ""}`}>
          {chats.map((chat) => (
            <TextMessage key={chat._id} chat={chat} isMe={Boolean(chat.sender === "visitor")} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={`${styles.form} ${width <= 600 ? styles.form_600 : ""}`}>
          {showEmojiPicker && (
            <div
              style={{
                height: "400px"
              }}
            >
              <EmojiPicker
                set="apple"
                emojiSize={24}
                emojiSpacing={8}
                onEmojiClick={addEmoji}
                mode="light"
              />
            </div>
          )}
          <div className={styles.inputWrapper}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Send a message"
              className={styles.input}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <div className={`${styles.IconWrapper} ${styles.Smile}`}>
              <i onClick={() => setShowEmojiPicker((p) => !p)} className="far fa-smile-wink"></i>
            </div>
            <div className={styles.IconWrapper}>
              <i className="fas fa-paperclip"></i>
            </div>

            <label htmlFor="send" className={styles.LabelWrapper}>
              <img src={message?.trim().length < 2 ? DefaultSender : SenderImage} alt="" />
            </label>

            <input
              onClick={handleSendMessage}
              type="button"
              value=""
              id="send"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
