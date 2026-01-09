import { ChevronLeft, Instagram, Phone } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Call from "../../assets/call.svg";
import Send from "../../assets/send.png";
import OfferModal from "../../components/Lawyer/OfferModal";

/** ---------- Inline Icons (SVG) ---------- */
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16.2 16.2 21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconPaperclip = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21 11.5 12.4 20a6 6 0 0 1-8.5-8.5L12 3.4a4.5 4.5 0 0 1 6.4 6.4l-8.1 8.1a3 3 0 0 1-4.3-4.3l7.6-7.6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSend = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M22 2 11 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 2 15 22l-4-9-9-4 20-7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/** ---------- Helpers ---------- */
const Avatar = ({ src, alt, size = 44 }) => (
  <div
    className="shrink-0 rounded-lg overflow-hidden bg-neutral-200"
    style={{ width: size, height: size }}
    title={alt}
  >
    {src ? (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-neutral-600 font-semibold">
        {alt?.slice(0, 1)?.toUpperCase() || "?"}
      </div>
    )}
  </div>
);

/** ---------- Demo Data ---------- */
const DEMO_CHATS = [
  {
    id: "c1",
    name: "Elmer Laverty",
    time: "12m",
    preview: "Thanks!",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "c2",
    name: "Florencio Dorrance",
    time: "24m",
    preview: "Please share the details",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=200&q=80",
  },
  {
    id: "c3",
    name: "Lavern Laboy",
    time: "1h",
    preview: "Haha that's terrifying",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80",
  },
  {
    id: "c4",
    name: "Titus Kitamura",
    time: "5h",
    preview: "omg, this is amazing",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    id: "c5",
    name: "Geoffrey Mott",
    time: "2d",
    preview: "aww 😍",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
  },
  {
    id: "c6",
    name: "Alfonzo Schuessler",
    time: "1m",
    preview: "perfect!",
    caseTitle: "Case title goes here",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&q=80",
  },
];

const DEMO_MESSAGES = {
  c2: [
    { id: "m1", from: "lawyer", text: "omg, this is amazing" },
    { id: "m2", from: "lawyer", text: "perfect! ✅" },
    { id: "m3", from: "lawyer", text: "Wow, this is really epic" },
    { id: "m4", from: "client", text: "How are you?" },
    { id: "m5", from: "lawyer", text: "just ideas for next time" },
    { id: "m6", from: "lawyer", text: "I'll be there in 2 mins ⏱️" },
    { id: "m7", from: "lawyer", text: "aww" },
    { id: "m8", from: "lawyer", text: "omg, this is amazing" },
    { id: "m9", from: "lawyer", text: "woohoooo 🔥" },
    { id: "m10", from: "client", text: "woohoooo" },
    { id: "m11", from: "client", text: "Haha oh man" },
    { id: "m12", from: "client", text: "Haha that's terrifying 😂" },
  ],
};

/** ---------- Page ---------- */
export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [activeChatId, setActiveChatId] = useState("c2");
  const [mobileView, setMobileView] = useState("list"); // list | chat
  const [draft, setDraft] = useState("");
   const [openOffer, setOpenOffer] = useState(false);
  const [offerData, setOfferData] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState(() => ({
    ...Object.fromEntries(
      DEMO_CHATS.map((c) => [c.id, DEMO_MESSAGES[c.id] || []])
    ),
  }));

  const listRef = useRef(null);
  const bottomRef = useRef(null);

  const activeChat = useMemo(
    () => DEMO_CHATS.find((c) => c.id === activeChatId) || DEMO_CHATS[0],
    [activeChatId]
  );

  const filteredChats = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DEMO_CHATS;
    return DEMO_CHATS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.caseTitle.toLowerCase().includes(q)
    );
  }, [search]);

  const messages = messagesByChat[activeChatId] || [];

  // ✅ PAGE NEVER SCROLLS (only left/right)
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Auto scroll to bottom on chat change or message append
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, messages.length]);

  const onOpenChat = (id) => {
    setActiveChatId(id);
    if (window.innerWidth < 1024) setMobileView("chat");
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;

    setMessagesByChat((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        { id: `m_${Date.now()}`, from: "client", text },
      ],
    }));
    setDraft("");
  };

  return (
    <div className="h-[100dvh] sm:px-10 bg-white overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-[420px_1fr] overflow-hidden">
        {/* LEFT COLUMN */}
        <aside
          className={[
            "overflow-hidden border-r border-neutral-100 bg-white",
            "flex flex-col min-h-0",
            mobileView === "list" ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          <div className="px-8 pt-8 pb-5 sm:mt-20 shrink-0">
            <h1 className="text-[22px] font-semibold text-[#111]">Messages</h1>
          </div>

          <div className="px-8 pb-5 shrink-0">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <IconSearch className="h-5 w-5" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search"
                className="w-full h-[44px] rounded-xl bg-neutral-50 border border-neutral-100
                           pl-12 pr-4 text-[14px] text-neutral-700 placeholder:text-neutral-400
                           outline-none focus:border-[#E3C387] focus:ring-2 focus:ring-[#E3C387]/25"
              />
            </div>
          </div>

          {/* ✅ only this scrolls */}
          <div
            ref={listRef}
            className="flex-1 min-h-0 overflow-y-auto px-4 pb-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="space-y-3">
              {filteredChats.map((c) => {
                const active = c.id === activeChatId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onOpenChat(c.id)}
                    className={[
                      "w-full text-left rounded-2xl cursor-pointer px-4 py-4 flex items-start gap-4 transition",
                      active ? "bg-[#F9EFDB]" : "hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    <Avatar src={c.avatar} alt={c.name} size={52} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[15px] font-semibold text-[#1a1a1a] truncate">
                          {c.name}
                        </p>
                        <span className="text-[12px] text-neutral-400 shrink-0">
                          {c.time}
                        </span>
                      </div>

                      <p className="text-[13px] text-neutral-500 mt-0.5 truncate">
                        {c.preview}
                      </p>

                      <span
                        className="inline-flex mt-2 px-3 py-1 rounded-full text-[11px]
                                       bg-[#F9EFDB] text-[#9A6A1B]"
                      >
                        {c.caseTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN (header stuck, messages scroll, composer fixed) */}
        <section
          className={[
            "overflow-hidden bg-white flex flex-col min-h-0", // ✅ important
            mobileView === "chat" ? "flex" : "hidden lg:flex",
          ].join(" ")}
        >
          {/* HEADER (stays at top) */}
          <div className="shrink-0 border-b mt-20 border-neutral-100 bg-white">
            <div className="px-6 lg:px-10 h-[80px] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="lg:hidden h-10 w-10 rounded-xl hover:bg-neutral-50 flex items-center justify-center"
                  aria-label="Back"
                >
                  <span className="text-[22px] leading-none text-neutral-600">
                    <ChevronLeft />
                  </span>
                </button>

                <Avatar
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  size={46}
                />
                <div className="leading-tight">
                  <p className="text-[16px] font-semibold text-[#111]">
                    Client name
                  </p>
                  <div className="flex items-center gap-2 text-[12px] text-neutral-500">
                    <span className="h-2 w-2 rounded-full bg-[#D9B070]" />
                    <span>Online</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="h-[44px] px-5 cursor-pointer rounded-xl bg-[#FBF6EA] text-[#DFA458]
                           flex items-center gap-3 font-semibold hover:bg-[#F7EBD0] transition"
              >
                <img src={Call} alt="call" className="h-5 fill-current w-5" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
            {/* ✅ ONLY messages scroll */}
            <div
              className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="space-y-2">
                {messages.map((m) => {
                  const isMe = m.from === "client";
                  return (
                    <div
                      key={m.id}
                      className={`w-full flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end gap-2 max-w-[86%] sm:max-w-[74%] lg:max-w-[62%] ${
                          isMe ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        {!isMe && (
                          <Avatar
                            src={activeChat.avatar}
                            alt="avatar"
                            size={30}
                          />
                        )}

                        <div
                          className={[
                            "relative px-4 py-2 text-md leading-relaxed",
                            "shadow-[0_1px_1px_rgba(0,0,0,0.08)]",
                            isMe
                              ? "bg-[#DFA458] text-white rounded-2xl rounded-br-md"
                              : "bg-[#F5F6F6] text-[#1f1f1f] rounded-2xl rounded-bl-md",
                          ].join(" ")}
                        >
                          {m.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* COMPOSER (fixed at bottom of panel) */}
            <div className="shrink-0 sm:border-t border-black/5 pr-10 pl-5 bg-white">
              <div className="px-4 sm:px-6 lg:px-10 py-3">
                <div className="w-full mb-3 sm:hidden flex justify-end">
                  <button
        type="button"
        onClick={() => setOpenOffer(true)}
        className="
          h-[44px] px-6 w-33.5 cursor-pointer rounded-xl bg-[#DFA458] text-white
          flex items-center gap-3 font-medium text-[14px]
          hover:brightness-[0.97] active:scale-[0.98] transition
        "
      >
        <span>Send an offer</span>
      </button>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="h-[42px] w-[42px] cursor-pointer rounded-full hover:bg-black/5
                               flex items-center justify-center text-neutral-600"
                  >
                    <IconPaperclip className="h-5 w-5" />
                  </button>
                  <div className="flex  w-full  py-1  rounded-xl bg-white border border-black/10 focus:border-[#9A6A1B] focus:ring-2 focus:ring-[#9A6A1B]/20">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Type a message"
                      className="flex-1 h-[42px] rounded-full bg-white px-4 text-sm outline-none
                               "
                    />

                    <button
                      type="button"
                      onClick={sendMessage}
                      disabled={!draft.trim()}
                      className={[
                        "h-[42px] w-[42px] mr-2 rounded-full flex items-center justify-center transition",
                        draft.trim()
                          ? "bg-[#F5F6F6] cursor-pointer hover:brightness-95 active:scale-[0.98]"
                          : " cursor-not-allowed",
                      ].join(" ")}
                    >
                      <img src={Send} alt="send" className="h-7 w-7" />
                    </button>
                  </div>
                 <button
        type="button"
        onClick={() => setOpenOffer(true)}
        className="
          h-[44px] px-5 w-37 hidden  cursor-pointer rounded-xl bg-[#DFA458] text-white
          sm:flex items-center gap-3 font-medium text-[14px]
          hover:brightness-[0.97] active:scale-[0.98] transition
        "
      >
        <span>Send an offer</span>
      </button>

      {/* MODAL */}
      <OfferModal
        open={openOffer}
        onClose={() => setOpenOffer(false)}
        onChange={(data) => setOfferData(data)}
        onSubmit={(data) => {
          console.log("Final Offer:", data);
          setOpenOffer(false);
        }}
      />
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
