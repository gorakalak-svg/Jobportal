import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css";
import { useJobs } from "../JobContext";

// ***EMessenger//

export const EMessenger = () => {

  const { chats, setChats, isChatEnded, setIsChatEnded, Alluser, activeSidebarUsers, addNotification } = useJobs();

  const [input, setInput] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const scrollRef = useRef(null);
  const token = localStorage.getItem("access");

  // Sidebar filter logic (unchanged)
  const sidebarDisplayUsers = Alluser.filter(user =>
    activeSidebarUsers.includes(parseInt(user.id))
  );

  // Active chat and user details
  const activeChat = chats.find(c => parseInt(c.id) === selectedId);
  const activeUser = Alluser.find(u => parseInt(u.id) === selectedId);

  // --------------------------------------------
  // 🔥 1️⃣ LOAD CONVERSATIONS FROM BACKEND
  // --------------------------------------------
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/chat/conversations/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setChats(data);

      } catch (err) {
        console.error("Error loading conversations:", err);
      }
    };

    fetchConversations();
  }, []);

  // --------------------------------------------
  // 🔥 2️⃣ LOAD MESSAGES WHEN CHAT SELECTED
  // --------------------------------------------
  useEffect(() => {
    if (!selectedId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/chat/conversations/${selectedId}/messages/`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        setChats(prev =>
          prev.map(chat =>
            chat.id === selectedId
              ? { ...chat, messages: data }
              : chat
          )
        );

      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [selectedId]);

  // --------------------------------------------
  // 🔥 3️⃣ AUTO SCROLL
  // --------------------------------------------
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeChat?.messages]);

  // --------------------------------------------
  // 🔥 4️⃣ SEND MESSAGE TO BACKEND
  // --------------------------------------------
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isChatEnded || !selectedId) return;

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/chat/messages/send/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            conversation: selectedId,
            content: input
          })
        }
      );

      const data = await res.json();

      setChats(prev =>
        prev.map(chat =>
          chat.id === selectedId
            ? { ...chat, messages: [...(chat.messages || []), data] }
            : chat
        )
      );

      if (addNotification) {
        addNotification(`Employer Sent a Message: ${input}`, selectedId);
      }

      setInput("");

    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // --------------------------------------------
  // 🔥 UI (UNCHANGED STRUCTURE)
  // --------------------------------------------
  return (
    <>
      <div className="messages-container">
        <div className="EChat-Mainsec">

          <div className="E-chat-name">
            <div className="web-sidebar">
              <div className="sidebar-header">
                <h3 style={{ color: "#007bff", textAlign: "center" }}>
                  Active Chats
                </h3>
              </div>

              {sidebarDisplayUsers.length > 0 ? (
                sidebarDisplayUsers.map(user => (
                  <div
                    key={user.id}
                    className={`sidebar-item ${selectedId === parseInt(user.id) ? 'active' : ''}`}
                    onClick={() => setSelectedId(parseInt(user.id))}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <strong>{user.profile.fullName}</strong>
                      <p style={{ fontSize: '11px', margin: 0 }}>
                        {user.currentDetails?.jobTitle}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', color: '#888', textAlign: 'center' }}>
                  No active chats
                </div>
              )}
            </div>
          </div>

          <div className="web-main-chat">
            {selectedId ? (
              <>
                <header className="web-chat-header"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{activeUser?.profile?.fullName}</strong>

                  <button
                    onClick={() => setIsChatEnded(!isChatEnded)}
                    className={isChatEnded ? "E-Start-Convo-Button" : "E-End-Convo-Button"}
                  >
                    {isChatEnded ? "RESTART" : "END CHAT"}
                  </button>
                </header>

                <div className="web-chat-window" ref={scrollRef}>
                  {activeChat?.messages?.map((m) => (
                    <div key={m.id} className="web-msg-row">
                      <div className={`web-bubble ${m.sender === 'employer' ? 'web-me' : 'web-friend'}`}>
                        {m.content || m.text}
                      </div>
                    </div>
                  ))}
                  {isChatEnded && <div className="chat-end-label">--- Conversation Ended ---</div>}
                </div>

                <form className="web-input-bar" onSubmit={handleSend}>
                  <input
                    className="web-text-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isChatEnded}
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="web-send-button"
                    disabled={isChatEnded}
                  >
                    SEND
                  </button>
                </form>
              </>
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: '#888',
                flexDirection: 'column'
              }}>
                <h3>Chat Section</h3>
                <p>Connect with a job seeker to start a conversation.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};