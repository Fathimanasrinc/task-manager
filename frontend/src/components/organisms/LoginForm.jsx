import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";

export function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <FormField label="Email">
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

      <FormField label="Password">
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

      <Button className="btn-primary w-full mt-2">
        Login
      </Button>
    </form>
  );
}