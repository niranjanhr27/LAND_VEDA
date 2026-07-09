import { useEffect, useMemo, useRef, useState } from "react";
import { chatAPI } from "../../data/api";
import "./Chatbot.css";

const STORAGE_KEY = "landveda-chat-history";

const INITIAL_MESSAGES = [
  {
    role: "assistant",
    text: "Hello, I am the LandVeda AI Assistant. I can help with property documents, NRI care, anti-encroachment support, buying or selling, and government liaison work.",
  },
];

const QUICK_PROMPTS = [
  {
    label: "NRI care",
    prompt: "Explain LandVeda NRI remote property care services.",
  },
  {
    label: "Documents",
    prompt: "Which property documents can LandVeda help recover or verify?",
  },
  {
    label: "Encroachment",
    prompt: "How can LandVeda help protect my property from encroachment?",
  },
  {
    label: "Pricing",
    prompt: "How does pricing work for LandVeda services?",
  },
];

const CONTACT_ACTIONS = [
  {
    label: "Call",
    href: "tel:+918792578028",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918792578028",
  },
  {
    label: "Email",
    href: "mailto:niranjanhr79@gmail.com",
  },
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => loadSavedMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const leadProgress = useMemo(() => {
    const text = messages.map((message) => message.text).join(" ");
    return {
      hasName: /my name is|i am|i'm|name[:\s]/i.test(text),
      hasMobile: /\b[6-9]\d{9}\b/.test(text),
    };
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage(messageText = input) {
    const userMessage = messageText.trim();
    if (!userMessage || loading) return;

    setInput("");
    setError("");

    const nextMessages = [...messages, { role: "user", text: userMessage }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const history = nextMessages.map((message) => ({
        role: message.role,
        content: message.text,
      }));
      const response = await chatAPI.send(history);
      const aiText = response.data?.choices?.[0]?.message?.content;

      if (!aiText) {
        throw new Error("Invalid AI response");
      }

      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch {
      setError("AI reply failed. You can still contact the team directly.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I could not connect to the AI service right now. Please call or WhatsApp LandVeda at +91 87925 78028 for quick support.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages(INITIAL_MESSAGES);
    setError("");
    setInput("");
  }

  function exportChat() {
    const transcript = messages
      .map((message) => `${message.role.toUpperCase()}: ${message.text}`)
      .join("\n\n");
    const blob = new Blob([transcript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "landveda-chat-transcript.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section className="chatbot-window" aria-label="LandVeda AI chat">
          <header className="chatbot-header">
            <div className="chatbot-header-main">
              <div className="chatbot-avatar">LV</div>
              <div>
                <div className="chatbot-title">LandVeda Assistant</div>
                <div className="chatbot-status">
                  {loading ? "Preparing reply" : "Online for property help"}
                </div>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button type="button" onClick={exportChat} title="Export chat">
                TXT
              </button>
              <button type="button" onClick={clearChat} title="Clear chat">
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
              >
                X
              </button>
            </div>
          </header>

          <div className="chatbot-lead-card">
            <div>
              <strong>Free consultation</strong>
              <span>Share your name and 10-digit mobile number.</span>
            </div>
            <div className="chatbot-lead-progress">
              <span className={leadProgress.hasName ? "done" : ""}>Name</span>
              <span className={leadProgress.hasMobile ? "done" : ""}>Mobile</span>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`chatbot-message-row ${isUser ? "user" : "assistant"}`}
                >
                  {!isUser && <div className="chatbot-message-icon">AI</div>}
                  <div
                    className={`chatbot-bubble-message ${
                      isUser ? "user" : "assistant"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="chatbot-message-row assistant">
                <div className="chatbot-message-icon">AI</div>
                <div className="chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="chatbot-quick-panel">
            {QUICK_PROMPTS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => sendMessage(item.prompt)}
                disabled={loading}
              >
                {item.label}
              </button>
            ))}
          </div>

          {error && <div className="chatbot-error">{error}</div>}

          <div className="chatbot-contact-actions">
            {CONTACT_ACTIONS.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target={action.href.startsWith("http") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {action.label}
              </a>
            ))}
          </div>

          <form
            className="chatbot-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <textarea
              ref={inputRef}
              className="chatbot-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about documents, NRI care, pricing..."
              disabled={loading}
              rows={1}
              maxLength={500}
            />
            <button
              className="chatbot-send-btn"
              type="submit"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        className="chatbot-launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close LandVeda AI chat" : "Open LandVeda AI chat"}
      >
        {isOpen ? "X" : "AI"}
        {!isOpen && <span className="chatbot-launcher-badge">Help</span>}
      </button>
    </div>
  );
}

function loadSavedMessages() {
  try {
    const savedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedMessages) && savedMessages.length > 0
      ? savedMessages
      : INITIAL_MESSAGES;
  } catch {
    return INITIAL_MESSAGES;
  }
}

export default Chatbot;
