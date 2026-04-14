import { SignupForm } from "../components/organisms/SignupForm";
import { AuthLayout } from "../components/templates/AuthLayout";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Account"
      footer={
        <span>
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-white hover:text-purple-300 transition"
          >
            Login
          </Link>
        </span>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}
