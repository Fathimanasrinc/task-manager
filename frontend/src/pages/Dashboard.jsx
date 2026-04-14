import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  fetchTasks,
  deleteTaskAsync,
  clearTasks,
} from "../redux/slices/taskSlice";

import { auth } from "../services/firebase";

import { DashboardContent } from "../components/organisms/DashboardContent";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { Button } from "../components/atoms/Button";

export function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading, error } = useSelector((state) => state.tasks);

  // ✅ FIX: get user directly from Firebase (NOT Redux)
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    dispatch(clearTasks()); // 🔥 prevent old user data leak
    dispatch(fetchTasks(userId));
  }, [dispatch, userId, navigate]);

  const handleDelete = (id) => {
    if (!userId) return;
    dispatch(deleteTaskAsync({ userId, id }));
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`);
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-center mt-10">Loading tasks...</p>
      </DashboardLayout>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <DashboardLayout>
        <p className="text-center mt-10 text-red-500">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardContent
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      >
        <Button
          onClick={() => navigate("/create")}
          disabled={!userId}
        >
          Add Task
        </Button>
      </DashboardContent>
    </DashboardLayout>
  );
}