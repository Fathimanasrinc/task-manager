import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

// 📥 FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(tasksCollection);

      return snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.().toISOString() || null,
          updatedAt: data.updatedAt?.toDate?.().toISOString() || null,
        };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ➕ ADD TASK
export const addTaskAsync = createAsyncThunk(
  "tasks/add",
  async (task, { rejectWithValue }) => {
    try {
      const newTask = {
        title: task.title,
        description: task.description,
        status: task.status || "todo",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(tasksCollection, newTask);

      return {
        id: docRef.id,
        ...newTask,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ❌ DELETE TASK
export const deleteTaskAsync = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ✏️ UPDATE TASK (FIXED)
export const updateTaskAsync = createAsyncThunk(
  "tasks/update",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const ref = doc(db, "tasks", id);

      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      });

      return {
        id,
        ...data,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// 🧠 INITIAL STATE
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// 🧩 SLICE
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔄 FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ ADD
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        const exists = state.tasks.find((t) => t.id === action.payload.id);

        if (!exists) {
          state.tasks.push(action.payload);
        }
      })

      // ❌ DELETE
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✏️ UPDATE (FIXED - NO DUPLICATES)
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      });
  },
});

export default taskSlice.reducer;
