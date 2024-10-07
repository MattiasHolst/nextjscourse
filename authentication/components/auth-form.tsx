"use client";
import { auth } from "@/actions/auth-actions";
import Link from "next/link";
import { useFormState } from "react-dom";

type ErrorMessage = {
  email: string;
  password: string;
};

export type State = {
  errors: ErrorMessage;
};

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [formState, formAction] = useFormState<State, FormData>(
    auth.bind(null, mode),
    {
      errors: { email: "", password: "" },
    }
  );
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error as keyof ErrorMessage]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && (
          <Link href="/?mode=signup">Create an account</Link>
        )}
        {mode === "signup" && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}