"use client"
import { useContext } from "react";
import Home from "./Components/Home";
import Play from "./Components/Play";
import { StateContext } from "./context/State";
export default function App() {
  const {state}=useContext(StateContext);
  
  return (
    <main className="flex h-screen bg-primary p-5">
      {state.menu && <Home/>}  
      {state.play && <Play/>}
    </main>
  );
}
