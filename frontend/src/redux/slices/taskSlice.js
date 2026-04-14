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

// 🔐 COLLECTION
const getUserTasksCollection = (userId) =>
  collection(db, "users", userId, "tasks");

// 📥 FETCH TASKS
export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(getUserTasksCollection(userId));

      return snapshot.docs.map((d) => {
        const data = d.data();

        return {
          id: d.id,
          title: data.title || "",
          description: data.description || "",
          status: data.status || "todo",

          // ✅ convert Firestore Timestamp → number
          createdAt: data.createdAt?.toMillis?.() || null,
          updatedAt: data.updatedAt?.toMillis?.() || null,
        };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ➕ ADD TASK
export const addTaskAsync = createAsyncThunk(
  "tasks/add",
  async ({ userId, title, description, status }, { rejectWithValue }) => {
    try {
      const now = Date.now();

      const newTask = {
        title: title || "",
        description: description || "",
        status: status || "todo",

        // ✅ store as Timestamp in Firestore
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(getUserTasksCollection(userId), newTask);

      return {
        id: docRef.id,

        // ✅ store serializable values in Redux
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ❌ DELETE TASK
export const deleteTaskAsync = createAsyncThunk(
  "tasks/delete",
  async ({ userId, id }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "users", userId, "tasks", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✏️ UPDATE TASK
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (
    { userId, taskId, title, description, status },
    { rejectWithValue }
  ) => {
    try {
      const taskRef = doc(db, "users", userId, "tasks", taskId);

      const updatedData = {
        title: title || "",
        description: description || "",
        status: status || "todo",
        updatedAt: serverTimestamp(),
      };

      await updateDoc(taskRef, updatedData);

      return {
        id: taskId,
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status,

        // ✅ Redux-safe timestamp
        updatedAt: Date.now(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })

      // UPDATE
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );

        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index],
            ...action.payload,
          };
        }
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;