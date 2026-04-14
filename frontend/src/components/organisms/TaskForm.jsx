import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Input } from "../atoms/input";
import { TextArea } from "../atoms/Textarea";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTaskAsync } from "../../redux/slices/taskSlice";

export function TaskForm({ onSubmit, initialData = {} }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    status: initialData.status || "todo",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addTaskAsync(form));

      onSubmit?.(form);
      console.log("Task added successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const statusOptions = [
    { value: "todo", label: "Todo" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Task Title">
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </FormField>

      <FormField label="Description">
        <TextArea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </FormField>

      <FormField label="Status">
        <Select
          name="status"
          value={form.status}
          onChange={handleChange}
          options={statusOptions}
        />
      </FormField>

      <Button type="submit">Create Task</Button>
    </form>
  );
}