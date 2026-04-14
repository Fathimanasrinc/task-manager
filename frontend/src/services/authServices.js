import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
import { signOut } from "firebase/auth";

export const logout = async () => {
  return await signOut(auth);
};