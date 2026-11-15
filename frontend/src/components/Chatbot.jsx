import React, { useEffect, useState } from "react";
import { Sparkles, X, Send, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "../config/brand";
import { api } from "../config/api";
import { useStore } from "../context/StoreContext";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState("start");
  const [orderId, setOrderId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [trackPath, setTrackPath] = useState("");
  const [supportMobile, setSupportMobile] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const { user } = useStore();
  const canUseChatbot =
    user && ["customer", "wholesale"].includes(user.apiRole);
  const addBot = (text) =>
    setMessages((old) => [...old, { from: "bot", text }]);
  const addUser = (text) =>
    setMessages((old) => [...old, { from: "user", text }]);
  const submitMessage = (e) => {
    e.preventDefault();
    const text = userMessage.trim();
    if (!text) return;
    addUser(text);
    addBot("Please sign in to use this bot.");
    setUserMessage("");
  };
  const call = async (path, userText) => {
    setBusy(true);
    setError("");
    if (userText) addUser(userText);
    try {
      const result = await api.chatbot(path);
      addBot(result.message || "Here is the information you requested.");
      if (result.orders?.length)
        result.orders.forEach((o) =>
          addBot(`${o.orderId} · ${o.orderStatus} · ₹${o.totalAmount}`),
        );
      if (result.order)
        addBot(`Order ${result.order.orderId || orderId}
Status: ${result.order.orderStatus || "—"}
Payment: ${result.order.paymentStatus || "—"}
Tracking: ${result.order.trackingId || "Not available yet"}`);
      if (result.trackButton?.trackingPath)
        setTrackPath(result.trackButton.trackingPath);
      if (result.support?.mobile) {
        setSupportMobile(result.support.mobile);
        addBot(`You can reach the owner at ${result.support.mobile}.`);
      }
      if (result.message?.toLowerCase().includes("order id"))
        setStep("enter-id");
    } catch (e) {
      setError(e.message);
      addBot(e.message);
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    if (open && messages.length === 0) {
      if (canUseChatbot) call("/start");
      else
        addBot(
          "Hi! How are you? How may I help you? Please sign in to view your personal order details.",
        );
    }
  }, [open]);
  const choose = async (value) => {
    if (value === "order_details") {
      addUser("Order Details");
      setStep("order-options");
      await call("/order-options");
    } else if (value === "previous_orders") {
      await call("/previous-orders", "Previous Orders");
      setStep("done");
    } else if (value === "current_order") {
      await call("/current-order", "Current Order");
      setStep("enter-id");
    } else {
      await call("/others", "Others");
      setStep("done");
    }
  };
  const submitOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    await call(
      `/current-order/${encodeURIComponent(orderId.trim())}`,
      orderId.trim(),
    );
    setStep("done");
  };
  return (
    <div className="chatbot">
      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Chat with Hyni"
      >
        <span className="chat-toggle-icon" aria-hidden="true">
          {open ? <X size={16} /> : <Sparkles size={16} />}
        </span>
        <span>Chat with Hyni</span>
      </button>
      {open && (
        <section className="chat-window">
          <header>
            <div>
              <b>Your Hyni assistant</b>
              <small>Here to help with your order</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </header>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <p
                key={i}
                className={m.from === "user" ? "user-bubble" : "bot-bubble"}
              >
                {m.text}
              </p>
            ))}
            {step === "start" &&
              canUseChatbot && (
                <div className="quick-questions">
                  <button
                    disabled={busy}
                    onClick={() => choose("order_details")}
                  >
                    Order Details
                  </button>
                  <button disabled={busy} onClick={() => choose("others")}>
                    Others
                  </button>
                </div>
              )}
            {step === "order-options" && (
              <div className="quick-questions">
                <button
                  disabled={busy}
                  onClick={() => choose("previous_orders")}
                >
                  Previous Orders
                </button>
                <button disabled={busy} onClick={() => choose("current_order")}>
                  Current Order
                </button>
              </div>
            )}
            {step === "enter-id" && (
              <form onSubmit={submitOrder}>
                <input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  aria-label="Order ID"
                />
                <button disabled={busy || !orderId.trim()}>
                  <Send size={16} />
                </button>
              </form>
            )}
            {trackPath && (
              <Link className="button dark" to={trackPath}>
                Track Order
              </Link>
            )}
            {supportMobile && (
              <a className="chat-instagram" href={`tel:${supportMobile}`}>
                Call support: {supportMobile}
              </a>
            )}
            {error && <small role="alert">{error}</small>}
          </div>
          {canUseChatbot ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                choose("others");
              }}
            >
              <input
                placeholder="Choose an option above"
                aria-label="Chat help"
                disabled
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={submitMessage}>
              <input
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                aria-label="Message to Hyni"
              />
              <button
                type="submit"
                disabled={!userMessage.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          )}
          <a
            className="chat-instagram"
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={14} /> More help on Instagram
          </a>
        </section>
      )}
    </div>
  );
}
