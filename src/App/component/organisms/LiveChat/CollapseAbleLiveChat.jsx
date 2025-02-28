import { HandleBotDisplay } from "../../templates/LiveChat/events/HandleBotDisplay";
import { BookMeeting } from "./BookMeeting/BookMeeting";
import styles from "./CollapseAbleLiveChat.module.css";
import { LiveChatConversation } from "./LiveChatConversation/LiveChatConversation";
export const CollapseAbleLiveChat = ({
  innerSize: { width, height },
  appearance,
  companyName,
  visitor,
  companyID,
  scrollDown
}) => {
  return (
    <div
      className={`${styles.CollapseAbleLiveChat}  ${
        width <= 600 ? styles.CollapseAbleLiveChat_600 : ""
      }  ${width <= 400 ? styles.CollapseAbleLiveChat_400 : ""} collapse-bot`}
      id="collpase-area"
      style={{
        backgroundColor: appearance?.backgroundColor || "rgb(18,35,94)"
      }}
    >
      <div className={styles.top}>
        <div
          className={styles.CloseIcon}
          onClick={(e) => HandleBotDisplay(e, { width })}
          onTouchStart={(e) => HandleBotDisplay(e, { width })}
        >
          <i className="fas fa-times"></i>
        </div>
        <h1 className={`${styles.heading} ${width <= 600 && styles.heading_400}`}>
          {/* Hello from Pavelify 👋🏻 */}
          {appearance?.gettingStartedMessage}
        </h1>
        <p className={styles.para}>
          {/* Our mission is to help and inspire 1 Billion people 🚀 How can we help you today? */}
          {appearance?.gettingStartedStatus}
        </p>
      </div>
      <LiveChatConversation
        appearance={appearance}
        scrollDown={scrollDown}
        companyName={companyName}
        visitor={visitor}
      />
      {/* <LiveChatSearch /> */}
      <BookMeeting appearance={appearance} companyID={companyID} />
    </div>
  );
};
