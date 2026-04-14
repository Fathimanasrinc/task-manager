import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TaskForm } from "../components/organisms/TaskForm";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { updateTaskAsync } from "../redux/slices/taskSlice";

export function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ FIX: access tasks array properly
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  const handleSubmit = async (updatedData) => {
    await dispatch(updateTaskAsync({ id, ...updatedData }));
    navigate("/dashboard");
  };

  if (!task) {
    return (
      <DashboardLayout>
        <p className="text-center text-red-500">Task not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4 text-[#2a2438]">
        Edit Task
      </h2>

      <TaskForm onSubmit={handleSubmit} initialData={task} />
    </DashboardLayout>
  );
}