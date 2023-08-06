import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Register the user
export const register = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
    toast.success("Account created successfully !");
    return false;
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""));
    return true;
  }
};

// Login the user

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Logged in successfully !");
    return false;
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""));
    return true;
  }
};

// signout a user
export const logout = () => {
  signOut(auth);
  toast.success("Logged out successfully !");
};

// sign in with google account
export const signUpProvider = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  toast.success("Logged in successfully !");
};

// forgetPassword

export const forgetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Please check your email box!");
  } catch (err) {
    toast.error(err.message.replace("Firebase:", ""));
  }
};

// user observer

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) setCurrentUser(user);
    else setCurrentUser(null);
  });
};
