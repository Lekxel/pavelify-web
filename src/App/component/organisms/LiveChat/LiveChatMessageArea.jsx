import EmojiPicker from "emoji-picker-react";
import { useCallback } from "react";
import DefaultSender from "../../../../Assets/img/sender.svg";
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

  const addEmoji = useCallback((e, { emoji }) => {
    setMessage((m) => m + emoji);
  }, []);

  return (
    <div
      className={`${styles.LiveChatMessageArea} ${
        width <= 600 ? styles.LiveChatMessageArea_600 : ""
      } collapse-bot`}
      id="MessageArea"
    >
      <div
        style={{
          backgroundColor: appearance?.backgroundColor || "rgb(18,35,94)"
        }}
        className={`${styles.top} ${width <= 600 ? styles.top_600 : ""}`}
      >
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
        <div className={styles.CloseIcon} onClick={HandleCovertingScreen}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

      <div className={styles.body}>
        <div className={`${styles.bodyContent} ${width <= 600 ? styles.bodyContent_600 : ""}`}>
          {chats.map((chat) => (
            <TextMessage
              color={appearance?.backgroundColor}
              key={chat._id}
              chat={chat}
              isMe={Boolean(chat.sender === "visitor")}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={`${styles.form} ${width <= 600 ? styles.form_600 : ""}`}>
          {showEmojiPicker && (
            <div className="mb-1">
              <EmojiPicker
                pickerStyle={{
                  width: "100%"
                }}
                onEmojiClick={addEmoji}
              />
            </div>
          )}

          <div className={styles.inputWrapper}>
            <div
              style={{
                background: "white",
                textAlign: "center",
                borderBottom: "1px solid #ddd",
                position: "absolute",
                top: "-20px",
                width: "100%"
              }}
            >
              <small style={{ fontSize: "11px" }} className="text-muted py-auto">
                {" "}
                Powered by{" "}
                <a href="https://pavelify.com" target="_blank">
                  <i style={{ color: appearance?.backgroundColor }} className="fa fa-bolt "></i>{" "}
                  <b>Pavelify</b>
                </a>
              </small>
            </div>
            <textarea
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

            {message?.trim() ? (
              <label
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: `${message?.trim().length < 2 ? "grey" : "#2D96D7"}`,
                  boxShadow: "1px 1px 1px lightgrey",

                  position: "relative"
                }}
                htmlFor="send"
                className={styles.LabelWrapper}
              >
                <img src={DefaultSender} alt="" />
              </label>
            ) : null}

            <input
              onClick={handleSendMessage}
              type="button"
              value=""
              id="send"
              style={{ display: "none" }}
            />
          </div>
          <div className={styles.iconsContainer}>
            <div className={`${styles.IconWrapper} ${styles.Smile}`}>
              <i onClick={() => setShowEmojiPicker((p) => !p)} className="far fa-smile-wink"></i>
            </div>
            <div className={styles.IconWrapper}>
              <i className="fas fa-paperclip"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
