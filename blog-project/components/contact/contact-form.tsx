import { FormEvent, useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import { ContactType } from "@/pages/api/contact";
import Notification from "../ui/notification";

async function sendContactData(contactDetail: ContactType) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetail),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestError, setRequestError] = useState("");

  useEffect(() => {
    if (requestStatus === "success" || requestError === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
        setRequestError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: FormEvent) {
    event.preventDefault();

    setRequestStatus("pending");
    try {
      await sendContactData({ email, name, message });
      setRequestStatus("success");
      setMessage("");
      setEmail("");
      setName("");
    } catch (error) {
      setRequestError((error as Error).message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "Success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
