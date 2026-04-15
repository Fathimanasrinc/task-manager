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

    {/* 🔝 ACTION BAR */}
    <div className="flex justify-between items-center mb-6 p-3 bg-white/5 rounded-lg backdrop-blur">

      {/* Title */}
      <h1 className="text-xl font-semibold text-white">
        Task Dashboard
      </h1>

      {/* Actions */}
      <div className="flex gap-3">

        {/* ➕ Add Task */}
        <Button
          onClick={() => navigate("/create")}
          disabled={!userId}
        >
          + Add Task
        </Button>

      </div>
    </div>

    {/* 📋 CONTENT */}
    <DashboardContent
      tasks={tasks}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />

  </DashboardLayout>
);
}