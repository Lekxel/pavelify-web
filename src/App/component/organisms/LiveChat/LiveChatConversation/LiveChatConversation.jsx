import InitialsImage from "helpers/InitialsImage";
import { SenderButton } from "../../../Atoms/LiveChat/SeconderButton";
import styles from "./LiveChatConversation.module.css";
export const LiveChatConversation = ({ companyName, visitor, scrollDown }) => {
  const HandleCovertingScreen = (e) => {
    e.preventDefault();
    document.querySelector("#collpase-area").style.display = "none";
    document.querySelector(
      visitor?.hasIntroduced ? "#MessageArea" : "#Introduction"
    ).style.display = "block";

    if (visitor?.hasIntroduced) {
      scrollDown();
    }
  };

  return (
    <div className={styles.LiveChatConversation}>
      <h2 className={styles.heading}>Your conversations</h2>
      <InitialsImage name={companyName} />
      {/* <ConversationMembers members={LiveChatMembers} /> */}
      <SenderButton
        text={visitor?.hasIntroduced ? "Continue Conversation" : "Start New Conversation"}
        onClick={HandleCovertingScreen}
      />
    </div>
  );
};
