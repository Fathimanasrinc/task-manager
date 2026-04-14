import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { signup } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

export function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ stop if invalid
    if (!validate()) return;

    try {
      await signup(form.email, form.password);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <FormField>
        <input
          className="p-2 border rounded"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
      </FormField>

      <FormField>
        <input
          className="p-2 border rounded"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </FormField>

      <FormField>
        <input
          className="p-2 border rounded"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </FormField>

      <FormField>
        <input
          className="p-2 border rounded"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword}
          </p>
        )}
      </FormField>

      <Button>Sign Up</Button>
    </form>
  );
}