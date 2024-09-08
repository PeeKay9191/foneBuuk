import React from "react";
import ForgotPasswordForm from "./components/forgot_password_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password? No worries, we got you!",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-pattern bg-no-repeat">
      <ForgotPasswordForm />
    </div>
  );
}
