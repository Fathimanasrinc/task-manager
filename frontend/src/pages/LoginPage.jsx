import { LoginForm } from "../components/organisms/LoginForm";
import { AuthLayout } from "../components/templates/AuthLayout";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <AuthLayout
      title={
        <div className="flex flex-col items-center gap-3">
          
          {/* Icon */}
          <div className="w-14 h-14 bg-gradient-to-br from-[#5c5470] to-purple-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
            🔐
          </div>

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-300">
            Login to continue your journey
          </p>
        </div>
      }
      footer={
          <span>Don’t have an account?
          <Link
            to="/signup"
            className="font-semibold text-white hover:text-purple-300 transition"
          >
            Sign Up
          </Link>
          </span>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}