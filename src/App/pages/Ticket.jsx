import { httpGetUser } from "api/auth";
import { httpGetTicket } from "api/email";
import { httpAssignTicket, httpFetchOperators, httpSendAttachment } from "api/operator";
import Spinner from "App/component/Atoms/Spinner";
import DefaultSender from "Assets/img/sender_default.svg";
import SenderImage from "Assets/img/sender_navy.svg";
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
import { loadAttachment, onFilePicked, toBase64 } from "utilities/misc";
import time from "../../Assets/img/svg/time.svg";
import BodyHeader from "../component/BodyHeader";
import Sidebar from "../component/Sidebar";

function Ticket() {
  const socket = useSocket();
  const params = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
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

  const {
    data: { messages, ticket },
    refetch
  } = useQuery(["ticket", params.ticketID], () => httpGetTicket(params.ticketID), {
    initialData: {},
    enabled: Boolean(params.ticketID)
  });

  useEffect(() => {
    user?.company?.configuration?.quickResponse &&
      setQuickReplies(user?.company?.configuration?.quickResponse);
  }, [user?.company]);

  const addEmoji = useCallback((e, { emoji }) => {
    setMessage((m) => m + emoji);
  }, []);

  useEffect(() => {
    if (!params.ticketID) {
      navigate(privateRoutes.emailTickets);
    }
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

  const sendAttachment = async (e) => {
    if (!ticket._id) return;
    const file = onFilePicked(e);
    if (!file) {
      return showError("Error adding attachment");
    }

    const fileBase64 = await toBase64(file);

    httpSendAttachment("", fileBase64)
      .then((data) => {
        // if (data.success) {
        //   console.log(data);
        // }
      })
      .catch((err) => {});
  };

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messages?.length && scrollDown();
  }, [messages]);

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

  const assignTicket = (operator) => {
    httpAssignTicket(params.ticketID, operator)
      .then((data) => {
        if (data.success) {
          refetch();
          showSuccess("Ticket assigned successfully");
          setShowAssignModal(false);
          setOperator("");
        }
      })
      .catch((err) => {});
  };

  const handleAssign = () => {
    if (operator) assignTicket(operator);
  };

  return (
    <div className="LiveChat Ticket main-wrapper d-flex">
      {/* sidebar */}
      <Sidebar active="EmailTickets" />
      <div className="body-area">
        {/* header */}
        <BodyHeader active="EmailTickets" page="Email Ticket" />

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
            {/* middile side */}
            {ticket?._id ? (
              <div className="middle-side">
                <div className="px-4 py-3">
                  <div className="top-area d-flex-align-center">
                    <h5>{ticket.subject}</h5>
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
                    {messages?.map((EachChat, index) => (
                      <div
                        key={EachChat._id}
                        className={`message ${EachChat?.sender === "operator" ? "me" : ""} ${
                          messages[index + 1] && messages[index + 1]?.sender === EachChat?.sender
                            ? "queue"
                            : ""
                        }`}
                      >
                        <div>
                          {ReactHtmlParser(
                            EachChat?.isAttachment
                              ? loadAttachment(EachChat.attachment, EachChat.attachmentType, false)
                              : EachChat.message
                          )}
                        </div>
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
                        className="ticket-message-input"
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
                      <label onClick={handleSendMessage} htmlFor="send" className="icon-wrapper">
                        <img
                          src={message?.trim().length < 2 ? DefaultSender : SenderImage}
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {ticket?._id ? (
              <div className="right-side">
                <div className="top-area d-flex-align-center">
                  {!ticket?.operator ? (
                    <button onClick={() => assignTicket(user._id)}>Join Ticket</button>
                  ) : ticket?.operator === user._id ? (
                    <button onClick={() => setShowAssignModal(true)}>Assign Ticket</button>
                  ) : (
                    <span />
                  )}
                </div>
                <div className="profile-area">
                  <div className="images_wrapper">
                    <InitialsImage
                      width={"100px"}
                      height={"100px"}
                      name={ticket?.from?.name || ticket?.from?.address}
                      color={ticket?.color}
                    />
                  </div>

                  <p className="name">{ticket?.from?.name}</p>
                  <p className="email">{ticket?.from?.address}</p>
                </div>
                <ul className="options-area d-flex-align-center">
                  <li
                    onClick={() => setCurrentSidePage("profile")}
                    className={`${currentSidePage === "profile" ? "active" : ""} cursor-pointer`}
                  >
                    Profile
                  </li>
                </ul>
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
                        <p>{ticket?.from?.address}</p>
                      </div>

                      <div className="icon-wrapper">
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
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
