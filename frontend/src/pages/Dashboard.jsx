import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchTasks,
  deleteTaskAsync,
} from "../redux/slices/taskSlice";

import { DashboardContent } from "../components/organisms/DashboardContent";
import { DashboardLayout } from "../components/templates/DashboardLayout";
import { Button } from "../components/atoms/Button";

export function Dashboard() {
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTaskAsync(id));
  };

  const handleEdit = (task) => {
    navigate(`/edit/${task.id}`);
  };

  return (
    <DashboardLayout>
      <DashboardContent
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      >
        <Button onClick={() => navigate("/create")}>
          Create Task
        </Button>
      </DashboardContent>
    </DashboardLayout>
  );
}