import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TaskForm } from "../components/organisms/TaskForm";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { addTaskAsync } from "../redux/slices/taskSlice";

export function CreateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await dispatch(addTaskAsync(data));
    navigate("/dashboard");
        console.log("Task added successfully!");

  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4 text-[#2a2438]">Create Task</h2>

      <TaskForm onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
