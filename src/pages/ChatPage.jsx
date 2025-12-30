import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LiveStatusCard from "../components/chatbot/cards/LiveStatusCard";

/* ---------------- Helpers ---------------- */
const formatDateForAPI = (date) => {
  const [y, m, d] = date.split("-");
  return `${d}-${m}-${y}`;
};

const formatDateLabel = (date) => {
  const d = new Date(date);
  const today = new Date();
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) return "Today";

  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
};

// DB → UI mapper (🔥 CRITICAL)
const mapDbMessagesToUi = (messages = []) =>
  messages.map((m) => {
    if (m.type === "LIVE_STATUS" && m.payload) {
      return {
        role: m.role,
        content: m.content,
        cardType: "status",
        cardData: m.payload,
      };
    }
    return {
      role: m.role,
      content: m.content,
    };
  });

/* ---------------- Component ---------------- */
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const calendarRef = useRef(null);
  const profileRef = useRef(null);
  const scrollRef = useRef(null);

  const API_BASE = "http://localhost:5000/api/v1";
  const authHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const user = {
    name: "Chandan Yadav",
    email: "chandan@example.com",
    avatar: "https://i.pravatar.cc/100",
  };

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  useEffect(() => {
    const handler = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setCalendarOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- API ---------------- */
  const fetchHistory = async () => {
    const res = await axios.get(`${API_BASE}/chat/history`, authHeader);
    setChats(res.data);
  };

  const startNewChat = () => {
    setActiveChatId(null);
    setCurrentMessages([]);
  };

  const deleteChat = async (chatId, e) => {
    e.stopPropagation();
    await axios.delete(`${API_BASE}/chat/${chatId}`, authHeader);
    setChats((prev) => prev.filter((c) => c._id !== chatId));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setCurrentMessages([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input;
    const loadingId = Date.now();

    setInput("");
    setLoading(true);

    // show user message
    setCurrentMessages((p) => [...p, { role: "user", content: text }]);

    // show loading placeholder
    setCurrentMessages((p) => [
      ...p,
      { id: loadingId, role: "bot", content: "RailBuddy is thinking…", loading: true },
    ]);

    try {
      // save USER message only
      const saveRes = await axios.post(
        `${API_BASE}/chat/message`,
        { chatId: activeChatId, role: "user", content: text },
        authHeader
      );

      const chatId = activeChatId || saveRes.data._id;
      if (!activeChatId) {
        setActiveChatId(chatId);
        fetchHistory();
      }

      const trainMatch = text.match(/\b\d{5}\b/);

      if (!trainMatch) {
        setCurrentMessages((p) =>
          p.filter((m) => m.id !== loadingId).concat({
            role: "bot",
            content: "How can I help you with your railway journey?",
          })
        );
        return;
      }

      if (!selectedDate) {
        setCurrentMessages((p) =>
          p.filter((m) => m.id !== loadingId).concat({
            role: "bot",
            content: "📅 Please select a date first.",
          })
        );
        return;
      }

      // 🔥 BACKEND saves LIVE_STATUS message
      const res = await axios.get(
        `${API_BASE}/railway/live?trainNo=${trainMatch[0]}&date=${formatDateForAPI(
          selectedDate
        )}&chatId=${chatId}`,
        authHeader
      );

      // replace loading message
      setCurrentMessages((p) =>
        p.filter((m) => m.id !== loadingId).concat({
          role: "bot",
          content: "Live train status fetched",
          cardType: "status",
          cardData: res.data,
        })
      );
    } catch {
      setCurrentMessages((p) =>
        p.filter((m) => m.id !== loadingId).concat({
          role: "bot",
          content: "❌ Unable to fetch live train status.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = chats.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-screen bg-[#101622] text-white overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-80 bg-[#111722] border-r border-white/5 flex flex-col">
        <div className="px-6 py-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">train</span>
          <h1 className="text-xl font-bold">
            RailBuddy <span className="text-primary text-xs">AI</span>
          </h1>
        </div>

        <div className="px-6">
          <button onClick={startNewChat} className="w-full bg-primary py-3 rounded-xl font-bold">
            + New Chat
          </button>

          <input
            className="mt-6 w-full bg-white/5 p-2 rounded-lg text-sm"
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 mt-4">
          {filteredHistory.map((chat) => (
            <div
              key={chat._id}
              onClick={() => {
                setActiveChatId(chat._id);
                setCurrentMessages(mapDbMessagesToUi(chat.messages));
              }}
              className={`group p-3 rounded-xl cursor-pointer flex justify-between items-center ${
                activeChatId === chat._id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-white/5 text-gray-400"
              }`}
            >
              <span className="truncate text-sm">{chat.title}</span>
              <button
                onClick={(e) => deleteChat(chat._id, e)}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>

        {/* PROFILE */}
        <div className="border-t border-white/5 p-4 relative" ref={profileRef}>
          <div
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-xl"
          >
            <img src={user.avatar} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">Pro Member</p>
            </div>
            <span className="material-symbols-outlined">expand_more</span>
          </div>

          {profileOpen && (
            <div className="absolute bottom-20 left-4 right-4 bg-[#161c2a] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-400">{user.email}</p>
              <button
                onClick={logout}
                className="mt-3 w-full bg-red-500/20 text-red-400 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* CHAT */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="max-w-[75%] space-y-2">
                <div className={`p-4 rounded-2xl ${
                  msg.role === "user" ? "bg-primary" : "bg-white/5 border border-white/10"
                }`}>
                  {msg.content}
                  {msg.loading && <span className="ml-2 animate-pulse">⏳</span>}
                </div>
                {msg.cardType === "status" && <LiveStatusCard data={msg.cardData} />}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* INPUT */}
        <footer className="p-6 flex justify-center">
          <div className="w-full max-w-3xl flex items-center gap-2 bg-white/5 p-2 rounded-full">
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setCalendarOpen((p) => !p)}
                className="px-4 py-2 bg-white text-black rounded-full"
              >
                📅 {selectedDate ? formatDateLabel(selectedDate) : "Today"}
              </button>

              {calendarOpen && (
                <div className="absolute bottom-12 bg-white text-black p-3 rounded-xl">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setCalendarOpen(false);
                    }}
                  />
                </div>
              )}
            </div>

            <input
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-transparent px-4 disabled:opacity-50"
              placeholder="Ask RailBuddy about your journey..."
            />

            <button
              onClick={handleSend}
              disabled={loading}
              className="p-3 bg-primary rounded-full disabled:opacity-50"
            >
              ➤
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ChatPage;
