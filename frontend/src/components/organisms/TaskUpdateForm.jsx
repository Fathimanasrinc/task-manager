import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Input } from "../atoms/input";
import { TextArea } from "../atoms/Textarea";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTaskAsync } from "../../redux/slices/taskSlice";
import { auth } from "../../services/firebase";


export function TaskUpdateForm({ taskId, initialData = {}, onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    status: initialData.status || "todo",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Task title is required");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("User not logged in!");
      return;
    }

    try {
      setLoading(true);

      const resultAction = await dispatch(
        updateTaskAsync({
          userId: user.uid,
          taskId,
          title: form.title,
          description: form.description,
          status: form.status,
        }),
      );

      if (updateTaskAsync.fulfilled.match(resultAction)) {
        onSubmit?.(form);
        navigate("/dashboard");
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "todo", label: "Todo" },
    { value: "inprogress", label: "In Progress" },
    { value: "done", label: "Done" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Task"}
      </Button>
    </form>
  );
}
