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
   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();

 try {
  await signup(form.email, form.password);
} catch (error) {
  console.log(error.code);
  console.log(error.message);
}
    navigate("/dashboard"); // 👈 redirect here

};
 return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField className="p-2 border rounded" label="Name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
      <FormField className="p-2 border rounded" label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
      <FormField className="p-2 border rounded" label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" />
      <FormField className="p-2 border rounded" label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
     
      <Button>Sign Up</Button>
    </form>
  );
}
