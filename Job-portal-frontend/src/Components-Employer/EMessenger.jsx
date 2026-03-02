import React, { useState, useEffect, useRef } from "react";
import "./EMessenger.css";
import { EHeader } from "./EHeader";
import { useJobs } from "../JobContext";
import axios from "axios";
 
export const EMessenger = () => {
  const { chats, setChats, isChatEnded, setIsChatEnded } = useJobs();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
 
  const jobseekerChat = chats?.find(c => c.role === "jobseeker");
  const employerData = chats?.find(c => c.role === "employer");
 
  const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });
 
  API.interceptors.request.use((req) => {
    const token = localStorage.getItem("access");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
 
  // ===============================
  // LOAD MESSAGES FROM BACKEND
  // ===============================
  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (!jobseekerChat?.id) return;
 
        const res = await API.get(
          `/chat/with-user/?user_id=${jobseekerChat.id}`
        );
 
        setChats(prev =>
          prev.map(chat =>
            chat.role === "employer"
              ? { ...chat, messages: res.data.messages || res.data }
              : chat
          )
        );
      } catch (err) {
        console.error("Load messages error:", err.response?.data || err.message);
      }
    };
 
    loadMessages();
  }, [jobseekerChat?.id]);
 
  // ===============================
  // AUTO SCROLL
  // ===============================
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [employerData?.messages]);
 
  // ===============================
  // SEND MESSAGE
  // ===============================
//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || isChatEnded) return;
 
//     try {
//       const res = await API.post("/chat/messages/send/", {
//         receiver_id: jobseekerChat.user_id,
//         content: input,
//       });
 
//       const msg = {
//   ...res.data,
//   text: res.data.content,
// };
 
//       setChats(prev =>
//         prev.map(chat =>
//           chat.role === "employer"
//             ? { ...chat, messages: [...chat.messages, msg] }
//             : chat
//         )
//       );
 
//       setInput("");
//     } catch (err) {
//   console.log("FULL ERROR JSON ↓↓↓");
//   console.log(JSON.stringify(err.response?.data, null, 2));

//     }
//   };
 const handleSend = async (e) => {
  e.preventDefault();
  if (!input.trim() || isChatEnded) return;

  const receiverId =
    jobseekerChat?.user_id ||
    jobseekerChat?.receiver_id ||
    jobseekerChat?.participant_id ||
    jobseekerChat?.id;

  try {
    const res = await API.post("/chat/conversations/", {
      receiver_id: receiverId,
      content: input,
    });

    const msg = { ...res.data, text: res.data.content };

    setChats(prev =>
      prev.map(chat =>
        chat.role === "employer"
          ? { ...chat, messages: [...chat.messages, msg] }
          : chat
      )
    );

    setInput("");
  } catch (err) {
    console.log("FULL ERROR JSON ↓↓↓");
    console.log(JSON.stringify(err.response?.data, null, 2));
  }
};
  return (
    <>
      <div className="messages-container">
        <div className="EChat-Mainsec">
 
          {/* Sidebar */}
          <div className="E-chat-name">
            <div style={{ height: "100vh" }} className="web-sidebar">
              <div className="sidebar-item active">
                <strong>{jobseekerChat?.name}</strong>
              </div>
            </div>
          </div>
 
          {/* Chat Window */}
          <div className="web-main-chat">
 
            <header className="web-chat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{jobseekerChat?.name}</strong>
 
              <button
                onClick={() => setIsChatEnded(!isChatEnded)}
                className={isChatEnded ? "E-Start-Convo-Button" : "E-End-Convo-Button"}
              >
                {isChatEnded ? "RESTART CONVERSATION" : "END CONVERSATION"}
              </button>
            </header>
 
            {/* Messages */}
            <div className="web-chat-window" ref={scrollRef}>
              {employerData?.messages?.map((m) => (
                <div key={m.id} className="web-msg-row">
 
// FIX 1
<div className={`web-bubble ${
  m.sender?.id === employerData?.id ? 'web-me' : 'web-friend'
}`}>                    {m.content || m.text}
                  </div>
                </div>
              ))}
 
              {isChatEnded && (
                <div style={{ textAlign: "center", padding: "10px", color: "gray", fontSize: "12px" }}>
                  --- Conversation Ended ---
                </div>
              )}
            </div>
 
            {/* Input */}
            <form className="web-input-bar" onSubmit={handleSend}>
              <input
                className="web-text-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isChatEnded}
                placeholder={isChatEnded ? "Chat is ended. Restart to type." : "Type a message..."}
              />
 
              <button
                type="submit"
                className="web-send-button"
                disabled={isChatEnded}
                style={{ opacity: isChatEnded ? 0.5 : 1 }}
              >
                SEND
              </button>
            </form>
 
          </div>
        </div>
      </div>
    </>
  );
};