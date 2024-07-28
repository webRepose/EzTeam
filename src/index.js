import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index/index.module.css";
import "./styles/adapt/adapt.css";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCycT9-9J5zwRqSlEs6A6b-jynFBBngHHs",
  authDomain: "findteam-bd4cd.firebaseapp.com",
  projectId: "findteam-bd4cd",
  storageBucket: "findteam-bd4cd.appspot.com",
  messagingSenderId: "133627150206",
  appId: "1:133627150206:web:3ba21ac31f14adde27fd2f",
};

const Context = createContext(null);
export default Context;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getStorage(app);
export const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebaseConfig,
        auth,
        firestore,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
