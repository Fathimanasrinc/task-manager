import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { TaskUpdateForm } from "../components/organisms/TaskUpdateForm";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { updateTaskAsync } from "../redux/slices/taskSlice";
import { auth } from "../services/firebase";

export function EditTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = auth.currentUser?.uid;

  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id),
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (task) {
      setLoading(false);
    }
  }, [task]);

  const handleSubmit = async (updatedData) => {
    if (!userId) {
      alert("User not logged in");
      return;
    }

    await dispatch(
      updateTaskAsync({
        userId,
        id,
        ...updatedData,
      }),
    );

    navigate("/dashboard");
  };

  if (loading || !task) {
    return (
      <DashboardLayout>
        <p className="text-center text-gray-500">Loading task...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4 text-[#2a2438]">Edit Task</h2>

      <TaskUpdateForm taskId={id} initialData={task} onSubmit={handleSubmit} />
    </DashboardLayout>
  );
}
