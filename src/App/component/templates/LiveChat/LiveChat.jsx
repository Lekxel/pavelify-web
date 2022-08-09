import { httpCompanyInfo } from "api/company";
import { httpPreviousConversations } from "api/visitor";
import { Introduction } from "App/component/organisms/LiveChat/Introduction";
import useSocket from "hooks/useSocket";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { showError } from "utilities/alerts";
import { sleep, validateEmail, validateName, validatePhone } from "utilities/misc";
import { currentVisitorProfile, setCurrentVisitorProfile } from "utilities/storage";
import burger from "../../../../Assets/img/burger.png";
import { CollapseAbleLiveChat } from "../../organisms/LiveChat/CollapseAbleLiveChat";
import { LiveChatMessageArea } from "../../organisms/LiveChat/LiveChatMessageArea";
import "./default.module.css";
import { HandleBotDisplay } from "./events/HandleBotDisplay";
import styles from "./LiveChat.module.css";

const LiveChatWidget = () => {
  const socket = useSocket();
  const params = useParams();
  const messagesEndRef = useRef(null);
  const [appearance, setAppearance] = useState({});
  const [preChat, setPreChat] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visitor, setVisitor] = useState(currentVisitorProfile());
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollDown = () => {
    chats?.length && messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollDown();
  }, [chats]);

  const refetchVisitor = () => {
    setVisitor(currentVisitorProfile());
  };

  const {
    data: { company }
  } = useQuery(["companyInfo", params.company], () => httpCompanyInfo(params.company), {
    initialData: {},
    enabled: Boolean(params.company)
  });

  // console.log(company);

  const handleSendMessage = useCallback(async () => {
    if (message?.trim().length < 2) {
      return;
    }
    socket.emit("sendMessage", {
      message
    });
    setMessage("");
    setShowEmojiPicker(false);
    setChats((c) => [
      ...c,
      { message, isAttachment: false, sender: "visitor", _id: Math.random() * 1000000 }
    ]);
  }, [socket, message]);

  const fetchPreviousConversations = () => {
    httpPreviousConversations(company._id, visitor.uuid)
      .then((data) => {
        if (data.success) {
          setChats(data.chats);
        }
      })
      .catch((err) => {});
  };

  const handleUpdateInfo = useCallback(
    (data) => {
      socket.emit("updateInfo", data);
    },
    [socket]
  );

  const handlePageView = useCallback(
    (data) => {
      socket.emit("pageView", data);
    },
    [socket]
  );

  const handleIncomingMessage = useCallback((data) => {
    setChats((c) => [
      ...c,
      {
        message: data.message,
        isAttachment: Boolean(data.isAttachment),
        sender: "operator",
        _id: Math.random() * 1000000,
        attachment: data.attachment,
        attachmentType: data.attachmentType,
        read: false
      }
    ]);
  }, []);

  useEffect(() => {
    setShowEmojiPicker(false);
    if (company && company?._id) {
      socket.connect();
      fetchPreviousConversations();
      socket.on("incomingMessage", handleIncomingMessage);
    }
    return () => {
      // socket.off("connect", joinRoom);
      socket.off("incomingMessage", handleIncomingMessage);
    };
  }, [company, socket]);

  useEffect(() => {
    company?.configuration?.chatConfiguration?.appearance &&
      setAppearance(JSON.parse(company?.configuration?.chatConfiguration?.appearance));
    company?.configuration?.chatConfiguration?.preChat &&
      setPreChat(JSON.parse(company?.configuration?.chatConfiguration?.preChat));
  }, [company?._id]);

  const [innerSize, setInnerSize] = useState({});

  const handleScreenSizeChange = () => {
    window.parent.postMessage(JSON.stringify({ type: "HANDLE_SCREEN_SIZE_CHANGE" }), "*");
  };
  const handleIframeMessages = async (message) => {
    try {
      const data =
        message?.data && typeof message?.data === "string" ? JSON.parse(message.data) : {};
      if (data?.type === "SCREEN_SIZE") {
        setInnerSize(data?.value);
        handleScreenSizeChange();
      } else if (data?.type === "PAGE_VIEW") {
        await sleep(3000);
        handlePageView(data?.value);
      }
    } catch (e) {
      // console.log("error", e);
    }
  };

  const introduce = () => {
    if (preChat?.surveyFields?.name?.enabled && !validateName(name)) {
      showError("Please enter a valid name");
      return;
    }
    if (preChat?.surveyFields?.email?.enabled && !validateEmail(email)) {
      showError("Please enter a valid email");
      return;
    }
    if (preChat?.surveyFields?.phoneNumber?.enabled && !validatePhone(phoneNumber)) {
      showError("Please enter a valid phone number");
      return;
    }
    setCurrentVisitorProfile({ ...currentVisitorProfile(), hasIntroduced: true });
    let data = {};
    if (preChat?.surveyFields?.name?.enabled) {
      data.name = name.trim();
    }
    if (preChat?.surveyFields?.email?.enabled) {
      data.email = email.trim();
    }
    if (preChat?.surveyFields?.phoneNumber?.enabled) {
      data.phoneNumber = phoneNumber.trim();
    }
    handleUpdateInfo(data);
    refetchVisitor();
    return true;
  };

  useEffect(() => {
    window.addEventListener("message", handleIframeMessages, false);

    return () => {
      window.removeEventListener("message", handleIframeMessages, false);
    };
  }, []);
  return company ? (
    <div className={styles.LiveChat}>
      <CollapseAbleLiveChat
        companyName={company?.companyName}
        appearance={appearance}
        innerSize={innerSize}
        visitor={visitor}
        companyID={company?._id}
        scrollDown={scrollDown}
      />
      <LiveChatMessageArea
        innerSize={innerSize}
        appearance={appearance}
        companyName={company?.companyName}
        message={message}
        handleSendMessage={handleSendMessage}
        setMessage={setMessage}
        chats={chats}
        messagesEndRef={messagesEndRef}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
      />
      <Introduction
        innerSize={innerSize}
        preChat={preChat}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        companyName={company?.companyName}
        introduce={introduce}
      />
      <button
        className={styles.button}
        onClick={(e) => HandleBotDisplay(e, innerSize)}
        onTouchStart={(e) => HandleBotDisplay(e, innerSize)}
        id="burgerButton"
      >
        <img src={burger} alt="" className={styles.Img} />
      </button>
    </div>
  ) : null;
};
export default LiveChatWidget;
