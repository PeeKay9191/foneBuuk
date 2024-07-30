import React from "react";
import SignupForm from "./components/signup_form";

type Props = {};

export default function SignPage({}: Props) {
  return (
    <div className="flex items-center justify-center h-screen bg-pattern bg-no-repeat">
      <SignupForm />
    </div>
  );
}
