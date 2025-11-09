"use client";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages = {
    CredentialsSignin: "Invalid username or password.",
    OAuthAccountNotLinked: "This email is linked to another provider.",
    Default: "Something went wrong. Please try again.",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-3 text-red-600">Authentication Error</h1>
      <p className="text-gray-700 mb-6">
        {errorMessages[error] || errorMessages.Default}
      </p>
      <a
        href="/login"
        className="text-blue-600 font-semibold underline hover:text-blue-800"
      >
        Go back to Login
      </a>
    </div>
  );
}
