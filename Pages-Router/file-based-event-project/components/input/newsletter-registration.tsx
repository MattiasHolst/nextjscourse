import { FormEvent, useRef, useContext } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailRef = useRef<HTMLInputElement>(null);
  const context = useContext(NotificationContext);
  function registrationHandler(event: FormEvent) {
    event.preventDefault();

    // fetch user input (state or refs)
    const email = emailRef.current?.value;
    console.log("email is : ", email);
    // optional: validate input
    if (!email) {
      return <p>Email not specified or invalid</p>;
    }
    const reqBody = { email: email };

    context.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() => {
        context.showNotification({
          title: "Success!",
          message: "Sucessfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        context.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
