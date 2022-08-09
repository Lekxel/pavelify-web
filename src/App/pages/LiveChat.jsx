import { httpGetUser } from "api/auth";
import {
  httpFetchOperators,
  httpForwardChat,
  httpGetConversation,
  httpJoinConversation,
  httpSendAttachment
} from "api/operator";
import { httpFetchVisitors, httpGetVisitor } from "api/visitor";
import Spinner from "App/component/Atoms/Spinner";
import DefaultChatInfo from "App/component/livechat/DefaultChatInfo";
import DefaultChatPage from "App/component/livechat/DefaultChatPage";
import flags from "App/Utils/countryFlags";
import DefaultSender from "Assets/img/sender_default.svg";
import SenderImage from "Assets/img/sender_navy.svg";
import copy from "clipboard-copy";
import EmojiPicker from "emoji-picker-react";
import InitialsImage from "helpers/InitialsImage";
import useSocket from "hooks/useSocket";
import { DateTime } from "luxon";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button as Btn, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { privateRoutes } from "routes/routes";
import { showError, showSuccess } from "utilities/alerts";
import { lastItemInArray, loadAttachment, onFilePicked, toBase64 } from "utilities/misc";

import Logo from "../../Assets/img/Pavelify.png";
import time from "../../Assets/img/svg/time.svg";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function LiveChat() {
  const socket = useSocket();
  const params = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [search, setSeach] = useState("");
  const [visitor, setVisitor] = useState({});
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [quickReplies, setQuickReplies] = useState([]);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const inputFile = useRef(null);
  const [note, setNote] = useState("");
  const [currentSidePage, setCurrentSidePage] = useState("profile");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [operator, setOperator] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: { user }
  } = useQuery("user", httpGetUser, {
    initialData: {}
  });

  useEffect(() => {
    user?.company?.configuration?.quickResponse &&
      setQuickReplies(user?.company?.configuration?.quickResponse);
  }, [user?.company]);

  const addEmoji = useCallback((e, { emoji }) => {
    setMessage((m) => m + emoji);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1201) {
      let Users = document.querySelectorAll(".LiveChat .messages-box-area > .left-side .users");
      let ChatArea = document.querySelector(".LiveChat .messages-box-area > .middle-side");
      let LeftArea = document.querySelector(".LiveChat .messages-box-area > .left-side");
      Users.forEach((EachUser) => {
        EachUser.addEventListener("click", () => {
          LeftArea.style.display = "none";
          ChatArea.style.display = "block";
        });
      });
    }
  }, []);

  const updateVisitor = async (visitors) => {
    setVisitor({});
    let v = visitors?.find((v) => v.uuid === params.uuid);
    if (v) {
      setVisitor(v);
    }
  };

  const {
    data: { visitors },
    refetch
  } = useQuery("visitors", () => httpFetchVisitors("", true, 1, true), {
    initialData: {
      limit: 20,
      page: 1,
      total: 0,
      visitors: []
    },
    onSuccess: (data) => {
      updateVisitor(data?.visitors);
    }
  });

  const getVisitorOnline = async () => {
    if (!user?.company?._id) return;
    try {
      let res = await httpGetVisitor(user?.company?._id, params.uuid);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getVisitor = async (visitors) => {
    setVisitor({});
    let v = visitors?.find((v) => v.uuid === params.uuid);
    if (v) {
      setVisitor({ ...v });
    } else {
      let x = await getVisitorOnline();
      if (x) {
        let { data } = await refetch();
        let v = data.visitors?.find((v) => v.uuid === params.uuid);
        if (v) {
          setVisitor({ ...v });
        }
      }
    }
  };

  const {
    data: { operators }
  } = useQuery(["operators", 1], () => httpFetchOperators(1), {
    initialData: {
      limit: 10,
      page: 1,
      total: 0,
      totalPages: 1
    }
  });

  const handleSendMessage = useCallback(async () => {
    if (message?.trim().length < 2) {
      return;
    }
    socket.emit("sendMessage", {
      message
    });
    setMessage("");
    setShowEmojiPicker(false);
    setShowQuickReplies(false);
    setChats((c) => [
      ...c,
      {
        message,
        isAttachment: false,
        sender: "operator",
        _id: Math.random() * 1000000,
        timestamp: DateTime.now()
      }
    ]);
  }, [socket, message]);

  const handleUpdateNote = useCallback(async () => {
    if (note?.trim().length < 2) {
      return;
    }
    socket.emit("updateChatNote", {
      note
    });
  }, [socket, note]);

  const handleQuickReply = useCallback((reply) => {
    setMessage(reply);
    setShowEmojiPicker(false);
    setShowQuickReplies(false);
  }, []);

  const fetchPreviousConversations = () => {
    setChats([]);
    httpGetConversation(visitor.uuid)
      .then((data) => {
        if (data.success) {
          setChats(data.chats);
        }
      })
      .catch((err) => {});
  };

  const forwardTheChat = () => {
    setLoading(true);
    httpForwardChat(visitor.uuid)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          showSuccess("Chat Archive sent successfully");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const sendAttachment = async (e) => {
    if (!visitor.uuid) return;
    const file = onFilePicked(e);
    if (!file) {
      return showError("Error adding attachment");
    }

    const fileBase64 = await toBase64(file);

    httpSendAttachment(visitor.uuid, fileBase64)
      .then((data) => {
        if (data.success) {
          setChats((c) => [
            ...c,
            {
              isAttachment: true,
              sender: "operator",
              _id: Math.random() * 1000000,
              timestamp: DateTime.now(),
              attachment: data.attachment,
              attachmentType: data.attachmentType,
              attachmentSize: data.attachmentSize
            }
          ]);

          socket.emit("sendAttachment", {
            isAttachment: true,
            sender: "operator",
            _id: Math.random() * 1000000,
            timestamp: DateTime.now(),
            attachment: data.attachment,
            attachmentType: data.attachmentType,
            attachmentSize: data.attachmentSize
          });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setVisitor({});
    params.uuid && getVisitor(visitors);
    refetch();
  }, [params.uuid]);

  const handleIncomingMessage = useCallback((data) => {
    setChats((c) => [
      ...c,
      {
        message: data.message,
        isAttachment: Boolean(data.isAttachment),
        sender: "visitor",
        _id: Math.random() * 1000000,
        timestamp: DateTime.now(),
        attachment: data.attachment,
        attachmentType: data.attachmentType,
        read: false
      }
    ]);
  }, []);

  const joinRoom = async () => {
    await socket.disconnect();
    await socket.connect();
  };

  useEffect(() => {
    setShowEmojiPicker(false);
    setShowQuickReplies(false);
    if (visitor?.uuid) {
      joinRoom();
      fetchPreviousConversations();
      setNote(visitor?.note || "");
      socket.on("incomingMessage", handleIncomingMessage);
    }
    return () => {
      socket.off("incomingMessage", handleIncomingMessage);
      socket.disconnect();
    };
  }, [visitor?.uuid, socket]);

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    chats?.length && scrollDown();
  }, [chats]);

  const joinChat = (operator) => {
    httpJoinConversation(visitor.uuid, operator)
      .then((data) => {
        if (data.success) {
          refetch();
          showSuccess("Conversation assigned successfully");
          setShowAssignModal(false);
          setOperator("");
        }
      })
      .catch((err) => {});
  };

  const handleAssign = () => {
    if (operator) joinChat(operator);
  };
  const copyLink = async (link) => {
    await copy(link);
    showSuccess("Copied to clipboard");
  };

  const processedVisitors = () => {
    let first = [...visitors, { uuid: "pavelify" }]
      .sort(
        (a, b) =>
          DateTime.fromISO(b?.lastMessage?.timestamp).toSeconds() -
          DateTime.fromISO(a?.lastMessage?.timestamp).toSeconds()
      )
      .filter((v) => v.uuid !== params.uuid);

    if (params.uuid) {
      if (params.uuid === "pavelify") {
        first = [{ uuid: "pavelify" }, ...first];
      } else {
        first = [visitors.find((v) => v.uuid === params.uuid), ...first];
      }
    }
    return first.filter(Boolean);
  };
  useEffect(() => {
    if (!params.uuid && visitors.length > 0) {
      navigate(`${privateRoutes.liveChat}/${visitors[0].uuid}`);
    }
  }, []);
  return (
    <div className="LiveChat main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="LiveChat" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="LiveChat" page="Live Chat" />

        <Modal show={showAssignModal} centered onHide={() => setShowAssignModal(false)}>
          <Modal.Header>
            <Modal.Title>Assign Operator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-3">
                <label htmlFor="operator" style={{ fontWeight: "bold" }} className="mb-1">
                  Operators
                </label>
                <select
                  id="operator"
                  placeholder="Select Operator"
                  className="form-control mb-3"
                  value={operator?._id}
                  onChange={(e) => setOperator(e.target.value)}
                >
                  <option selected disabled value="">
                    Select Operator
                  </option>
                  {operators
                    ?.filter((p) => p._id !== user._id)
                    ?.map((op, index) => (
                      <option key={String(index)} value={op._id}>
                        {op.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Btn className="me-5" variant="secondary" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Btn>
            <Btn variant="primary" onClick={handleAssign}>
              {loading ? <Spinner /> : "Continue"}
            </Btn>
          </Modal.Footer>
        </Modal>

        <div className="body-main-area" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="messages-box-area">
            {/* left side */}
            <div className="left-side">
              <div className="top-area d-flex-align-center">
                <h3>Chats</h3>
              </div>

              <div>
                <div className="input-wrapper">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.22921 11.375C9.07117 11.375 11.375 9.07114 11.375 6.22918C11.375 3.38721 9.07117 1.08334 6.22921 1.08334C3.38724 1.08334 1.08337 3.38721 1.08337 6.22918C1.08337 9.07114 3.38724 11.375 6.22921 11.375Z"
                      stroke="#9CA2C9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.9167 11.9166L10.8334 10.8333"
                      stroke="#9CA2C9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    value={search}
                    onChange={(e) => setSeach(e.target.value)}
                    type="text"
                    placeholder="Search name..."
                  />
                </div>
              </div>

              <div className="users">
                {processedVisitors()?.map((EachVisitor) => (
                  <div key={EachVisitor.uuid}>
                    {EachVisitor.uuid === "pavelify" ? (
                      <div
                        onClick={() => navigate(`${privateRoutes.liveChat}/pavelify`)}
                        className="user d-flex-align-center"
                        style={{
                          cursor: "pointer",
                          background: params?.uuid === "pavelify" ? "#ddd" : "#fff"
                        }}
                      >
                        <div
                          style={{
                            background: "#0F1957",
                            borderRadius: "50%",
                            height: "42px",
                            width: "42px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                          className="images_wrapper"
                        >
                          <img
                            src={Logo}
                            style={{
                              width: "40px",
                              objectFit: "contain"
                            }}
                            alt=""
                          />
                        </div>
                        <div className="presentation d-flex-align-center">
                          <div className="left-side">
                            <h4>Pavelify Team</h4>
                            <p>Hey! Simple Bot here...</p>
                          </div>
                          <div className="right-side">
                            {/* <span className="badge d-flex-align-center">1</span> */}
                          </div>
                        </div>
                      </div>
                    ) : (
                      EachVisitor.name?.toLowerCase().includes(search?.toLowerCase()) && (
                        <div
                          onClick={() => navigate(`${privateRoutes.liveChat}/${EachVisitor?.uuid}`)}
                          key={EachVisitor._id}
                          className="user d-flex-align-center"
                          style={{
                            cursor: "pointer",
                            background: EachVisitor.uuid === visitor?.uuid ? "#ddd" : "#fff"
                          }}
                        >
                          <div className="images_wrapper">
                            {EachVisitor.picture ? (
                              <img src={EachVisitor.picture} alt="" />
                            ) : (
                              <InitialsImage name={EachVisitor?.name} color={EachVisitor?.color} />
                            )}
                            <img
                              src={
                                EachVisitor?.country ? (
                                  flags?.filter((f) => f.CountryName === EachVisitor?.country)[0]
                                    .Flag
                                ) : (
                                  <span />
                                )
                              }
                              alt=""
                              className="flag"
                            />
                          </div>
                          <div className="presentation d-flex-align-center">
                            <div className="left-side">
                              <h4>{EachVisitor?.name}</h4>
                              <p className="ms-2">
                                {EachVisitor?.lastMessage?.isAttachment ? (
                                  <i>
                                    <i className="fa fa-paperclip"></i>
                                    attachment
                                  </i>
                                ) : (
                                  EachVisitor?.lastMessage?.message
                                )}
                              </p>
                            </div>
                            <div className="right-side">
                              <p>
                                {EachVisitor?.lastMessage?.timestamp
                                  ? DateTime.fromISO(EachVisitor?.lastMessage?.timestamp).toFormat(
                                      "t"
                                    )
                                  : ""}
                              </p>
                              {EachVisitor?.unreadMessages > 0 && (
                                <span className="badge d-flex-align-center">
                                  {EachVisitor?.unreadMessages}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* middile side */}
            {visitor?.uuid || params.uuid === "pavelify" ? (
              <>
                {visitor?.uuid ? (
                  <div className="middle-side">
                    <div className="px-4 py-3">
                      <div className="top-area d-flex-align-center">
                        <h5>{visitor?.name}</h5>
                        <div className="icon-wrapper">
                          <svg
                            width="22"
                            height="5"
                            viewBox="0 0 22 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="2.0625" cy="2.0625" r="2.0625" fill="#282D4A" />
                            <circle cx="11" cy="2.0625" r="2.0625" fill="#282D4A" />
                            <circle cx="19.9375" cy="2.0625" r="2.0625" fill="#282D4A" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="messages-container-wrapper">
                      <div className="message-container">
                        {chats?.map((EachChat, index) => (
                          <div
                            key={EachChat._id}
                            className={`message ${EachChat?.sender === "operator" ? "me" : ""} ${
                              chats[index + 1] && chats[index + 1]?.sender === EachChat?.sender
                                ? "queue"
                                : ""
                            }`}
                          >
                            <p>
                              {ReactHtmlParser(
                                EachChat?.isAttachment
                                  ? loadAttachment(
                                      EachChat.attachment,
                                      EachChat.attachmentType,
                                      false
                                    )
                                  : EachChat.message
                              )}
                            </p>
                            <div className="date-area d-flex-align-center">
                              <p>.</p>
                              <img src={time} alt="" />
                              <p>{DateTime.fromISO(EachChat?.timestamp).toFormat("t")}</p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      <div className="message-sender-form">
                        {showQuickReplies ? (
                          <div
                            style={{
                              height: "200px",
                              background: "#ddd",
                              boxShadow: "2px 2px 10px #ddd",
                              marginBottom: "5px",
                              borderRadius: "5px"
                            }}
                            className="py-2 px-2"
                          >
                            <h6 className="text-center">Quick Replies</h6>
                            <ul>
                              {quickReplies?.map((EachQuickReply, index) => (
                                <li
                                  onClick={() => handleQuickReply(EachQuickReply)}
                                  key={String(index)}
                                  style={{
                                    padding: "2px",
                                    cursor: "pointer",
                                    fontWeight: "medium",
                                    marginBottom: "6px"
                                  }}
                                >
                                  {EachQuickReply}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
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
                        <ul className="message_sender_list" style={{ marginBottom: 0 }}>
                          <li className="icon-wrapper">
                            <button
                              onClick={() => setShowQuickReplies((p) => !p)}
                              className="btn"
                              style={{ background: "#ddd" }}
                              type="button"
                            >
                              Quick Response
                            </button>
                          </li>
                        </ul>
                        <input
                          type="file"
                          id="file"
                          onChange={sendAttachment}
                          accept=".png,.jpeg,.jpg,.gif,.doc,.docx,.pdf,.xls,.xlsx,.mp4,.3gp,.txt,.csv,"
                          ref={inputFile}
                          style={{ display: "none" }}
                        />
                        <div className="input-wrapper d-flex-align-center">
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message"
                            onKeyUp={(e) => {
                              if (e.key === "Enter") {
                                handleSendMessage();
                              }
                            }}
                          />
                          <i
                            onClick={() => inputFile.current.click()}
                            className="fas fa-paperclip pt-2 cursor-pointer"
                          ></i>
                          <i
                            onClick={() => setShowEmojiPicker((p) => !p)}
                            className="far fa-smile-beam pt-2 cursor-pointer"
                          ></i>
                          <label
                            onClick={handleSendMessage}
                            htmlFor="send"
                            className="icon-wrapper"
                          >
                            <img
                              src={message?.trim().length < 2 ? DefaultSender : SenderImage}
                              alt=""
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <DefaultChatPage />
                )}

                {visitor?.uuid ? (
                  <div className="right-side">
                    <div className="top-area d-flex-align-center">
                      {!visitor?.operator ? (
                        <button onClick={() => joinChat(user._id)}>Join Chat</button>
                      ) : visitor?.operator === user._id ? (
                        <button onClick={() => setShowAssignModal(true)}>Assign Chat</button>
                      ) : (
                        <span />
                      )}
                      <button disabled={loading} onClick={forwardTheChat}>
                        {loading ? <Spinner /> : "Forward Chat"}
                      </button>
                    </div>
                    <div className="profile-area">
                      <div className="images_wrapper">
                        {visitor?.picture ? (
                          <img src={visitor?.picture} alt="" />
                        ) : (
                          <InitialsImage
                            width={"100px"}
                            height={"100px"}
                            name={visitor?.name}
                            color={visitor?.color}
                          />
                        )}
                        <img
                          src={
                            visitor?.country ? (
                              flags?.filter((f) => f.CountryName === visitor?.country)[0].Flag
                            ) : (
                              <span />
                            )
                          }
                          alt=""
                          className="flag"
                        />
                      </div>

                      <p className="name">{visitor?.name}</p>
                      <p className="email">{visitor?.email}</p>
                    </div>
                    <ul className="options-area d-flex-align-center">
                      <li
                        onClick={() => setCurrentSidePage("profile")}
                        className={`${
                          currentSidePage === "profile" ? "active" : ""
                        } cursor-pointer`}
                      >
                        Profile
                      </li>
                      <li
                        onClick={() => setCurrentSidePage("pages")}
                        className={`${currentSidePage === "pages" ? "active" : ""} cursor-pointer`}
                      >
                        Viewed Pages
                      </li>
                      {/* <li>Notes</li> */}
                    </ul>
                    {currentSidePage === "profile" ? (
                      <div className="info-area">
                        <div className="personal-info">
                          <div className="info-box d-flex-align-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                                stroke="#9FABBE"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                                stroke="#9FABBE"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            <div className="presentation">
                              <h4>Email Address</h4>
                              <p>{visitor?.email}</p>
                            </div>

                            <div
                              className="icon-wrapper cursor-pointer"
                              onClick={() => copyLink(visitor?.email)}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 3.5H5.25C5.05109 3.5 4.86032 3.57902 4.71967 3.71967C4.57902 3.86032 4.5 4.05109 4.5 4.25V16.25C4.5 16.4489 4.57902 16.6397 4.71967 16.7803C4.86032 16.921 5.05109 17 5.25 17H14.75C14.9489 17 15.1397 16.921 15.2803 16.7803C15.421 16.6397 15.5 16.4489 15.5 16.25V4.25C15.5 4.05109 15.421 3.86032 15.2803 3.71967C15.1397 3.57902 14.9489 3.5 14.75 3.5ZM14.5 16H5.5V4.5H14.5V16Z"
                                  fill="#9CA2C9"
                                />
                                <path
                                  d="M13 1.75C13 1.55109 12.921 1.36032 12.7803 1.21967C12.6397 1.07902 12.4489 1 12.25 1H2.75C2.55109 1 2.36032 1.07902 2.21967 1.21967C2.07902 1.36032 2 1.55109 2 1.75V13.75C2 13.9489 2.07902 14.1397 2.21967 14.2803C2.36032 14.421 2.55109 14.5 2.75 14.5H3V2H13V1.75Z"
                                  fill="#9CA2C9"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="info-box d-flex-align-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.97 18.33C21.97 18.69 21.89 19.06 21.72 19.42C21.55 19.78 21.33 20.12 21.04 20.44C20.55 20.98 20.01 21.37 19.4 21.62C18.8 21.87 18.15 22 17.45 22C16.43 22 15.34 21.76 14.19 21.27C13.04 20.78 11.89 20.12 10.75 19.29C9.6 18.45 8.51 17.52 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.27 13.75 11.79 14.24 12.32 14.69C12.84 15.13 13.27 15.43 13.61 15.61C13.66 15.63 13.72 15.66 13.79 15.69C13.87 15.72 13.95 15.73 14.04 15.73C14.21 15.73 14.34 15.67 14.45 15.56L15.21 14.81C15.46 14.56 15.7 14.37 15.93 14.25C16.16 14.11 16.39 14.04 16.64 14.04C16.83 14.04 17.03 14.08 17.25 14.17C17.47 14.26 17.7 14.39 17.95 14.56L21.26 16.91C21.52 17.09 21.7 17.3 21.81 17.55C21.91 17.8 21.97 18.05 21.97 18.33Z"
                                stroke="#9FABBE"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                              />
                            </svg>

                            <div className="presentation">
                              <h4>Phone Number</h4>
                              <p>{visitor?.phoneNumber}</p>
                            </div>

                            <div
                              className="icon-wrapper cursor-pointer"
                              onClick={() => copyLink(visitor?.phoneNumber)}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.75 3.5H5.25C5.05109 3.5 4.86032 3.57902 4.71967 3.71967C4.57902 3.86032 4.5 4.05109 4.5 4.25V16.25C4.5 16.4489 4.57902 16.6397 4.71967 16.7803C4.86032 16.921 5.05109 17 5.25 17H14.75C14.9489 17 15.1397 16.921 15.2803 16.7803C15.421 16.6397 15.5 16.4489 15.5 16.25V4.25C15.5 4.05109 15.421 3.86032 15.2803 3.71967C15.1397 3.57902 14.9489 3.5 14.75 3.5ZM14.5 16H5.5V4.5H14.5V16Z"
                                  fill="#9CA2C9"
                                />
                                <path
                                  d="M13 1.75C13 1.55109 12.921 1.36032 12.7803 1.21967C12.6397 1.07902 12.4489 1 12.25 1H2.75C2.55109 1 2.36032 1.07902 2.21967 1.21967C2.07902 1.36032 2 1.55109 2 1.75V13.75C2 13.9489 2.07902 14.1397 2.21967 14.2803C2.36032 14.421 2.55109 14.5 2.75 14.5H3V2H13V1.75Z"
                                  fill="#9CA2C9"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="info-box d-flex-align-center mt-3">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.9999 13.43C13.723 13.43 15.1199 12.0331 15.1199 10.31C15.1199 8.58687 13.723 7.19 11.9999 7.19C10.2768 7.19 8.87988 8.58687 8.87988 10.31C8.87988 12.0331 10.2768 13.43 11.9999 13.43Z"
                                stroke="#9FABBE"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M3.61995 8.49C5.58995 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.38995 20.54C5.62995 17.88 2.46995 13.57 3.61995 8.49Z"
                                stroke="#9FABBE"
                                strokeWidth="1.5"
                              />
                            </svg>

                            <div className="presentation">
                              <h4>Location</h4>
                              <p>{visitor?.country}</p>
                            </div>
                          </div>
                        </div>
                        <div className="tags-area">
                          <label htmlFor="add-tags">Add Tags</label>
                          <textarea
                            onBlur={handleUpdateNote}
                            name=""
                            id="add-tags"
                            cols="30"
                            rows="10"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="last-view-page">
                          <p>Last Viewed Pages</p>
                          {visitor?.visits?.length ? (
                            <a
                              target="_blank"
                              href={lastItemInArray(visitor?.visits)?.url}
                              className="link"
                            >
                              {DateTime.fromISO(
                                lastItemInArray(visitor?.visits)?.timestamp
                              ).toFormat("D")}{" "}
                              - {lastItemInArray(visitor?.visits)?.url} (
                              {lastItemInArray(visitor?.visits)?.hits})
                            </a>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div className="last-view-page viewed-pages">
                        {visitor?.visits?.map((visit, index) => (
                          <a key={String(index)} target="_blank" href={visit?.url} className="link">
                            {DateTime.fromISO(visit?.timestamp).toFormat("D")} - {visit?.url} (
                            {visit?.hits})
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <DefaultChatInfo />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
