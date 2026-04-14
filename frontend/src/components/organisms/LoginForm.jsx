import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { useNavigate} from "react-router-dom";
import { login } from "../../services/authServices";


export function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(form.email, form.password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
  navigate("/dashboard"); // 👈 redirect here
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <FormField
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="p-2 border rounded"
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
        className="p-2 border rounded"
      />
      <Button className="btn-primary w-full mt-2">Login</Button>
    </form>
  );
}
