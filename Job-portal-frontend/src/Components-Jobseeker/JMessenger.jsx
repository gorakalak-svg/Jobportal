import React, { useState, useEffect, useRef } from 'react';
import '../Components-Employer/Chatbox.css'
import { useJobs } from '../JobContext';
import axios from "axios"; // 🔥 ADDED ONLY

//**JMessenger***//
export const JMessenger = () => {
    
    const CurrentUser = 1; 
    
    const { chats, setChats, isChatEnded, setNotificationsData } = useJobs();

    const [input, setInput] = useState("");

    const scrollRef = useRef(null);
    
    const myChatData = chats.find(c => c.id === CurrentUser);

    const employerProfile = chats.find(c => c.role === "employer");

    const hasMessages = myChatData?.messages && myChatData.messages.length > 0;

    // 🔥 NEW: Fetch Messages From Backend (NO CHANGE TO YOUR UI)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("access");

                const res = await axios.get(
                    `http://127.0.0.1:8000/api/chat/conversations/${CurrentUser}/messages/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                // 🔥 Sync Backend Messages Into Your Existing Context
                setChats(prev =>
                    prev.map(chat =>
                        chat.id === CurrentUser
                            ? { ...chat, messages: res.data }
                            : chat
                    )
                );

            } catch (err) {
                console.error("Error fetching backend messages", err);
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        if (myChatData?.messages.length > 0) {
            setNotificationsData(prev => 
                prev.map(notif => 
                    notif.targetId === CurrentUser ? { ...notif, isRead: true } : notif
                )
            );
        }
    }, [myChatData?.messages.length]);

    useEffect(() => {
        if (scrollRef.current) 
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [myChatData?.messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isChatEnded) return;

        const token = localStorage.getItem("access");

        try {
            // 🔥 SEND MESSAGE TO DJANGO
            await axios.post(
                "http://127.0.0.1:8000/api/chat/messages/send/",
                {
                    conversation: CurrentUser,
                    content: input
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        } catch (err) {
            console.error("Error sending message", err);
        }

        // 🔵 YOUR ORIGINAL LOGIC (UNCHANGED)
        const newMsg = {
            id: Date.now(),
            text: input,
            sender: "jobseeker", 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChats(prev => prev.map(chat => 
            chat.id === CurrentUser ? { ...chat, messages: [...chat.messages, newMsg] } : chat
        ));

        setInput("");
    };

    return (
        <div className="messages-container">
            <div className="E-chat-name">
                <div style={{ height: "100vh" }} className="web-sidebar">
                    <div className="sidebar-header">
                        <h2 style={{color:"#007bff",textAlign:"center"}}>Messages</h2>
                    </div>
                    {hasMessages && (
                        <div className="sidebar-item active">
                            <strong>{employerProfile?.name}</strong>
                        </div>
                    )}
                </div>
            </div>

            <div className="web-main-chat">
                {hasMessages ? (
                    <>
                        <header className="web-chat-header">
                            <strong>{employerProfile?.name}</strong>
                        </header>
                        
                        <div className="web-chat-window" ref={scrollRef}>
                            {myChatData?.messages.map((m) => (
                                <div key={m.id} className="web-msg-row">
                                    <div className={`web-bubble ${m.sender === 'jobseeker' ? 'web-me' : 'web-friend'}`}>
                                        {/* 🔥 Supports Both Backend & Frontend */}
                                        {m.text || m.content}
                                    </div>
                                </div>
                            ))}
                            {isChatEnded && 
                                <div className="chat-end-label">
                                    --- Conversation Ended ---
                                </div>
                            }
                        </div>

                        <form className="web-input-bar" onSubmit={handleSend}>
                            <input 
                                className="web-text-input" 
                                value={input} 
                                disabled={isChatEnded}  
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="Reply to employer..." 
                            />
                            <button 
                                type="submit" 
                                disabled={isChatEnded} 
                                className="web-send-button"
                            >
                                SEND
                            </button>
                        </form>
                    </>
                ) : (
                    <div 
                        style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}} 
                        className="no-messages-view"
                    >
                        <div 
                            style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}} 
                            className="no-msg-content"
                        >
                            <h3>No Messages</h3>
                            <p>Waiting for the employer to start the conversation.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};