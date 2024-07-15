"use client";
import { createContext, ReactNode, useState } from "react";

type state = {
  play: boolean;
  difficulty: number;
  score: number;
  menu: boolean;
  credits: boolean;
  words: string[];
  keyboard:boolean;
};

type stateContextType = {
  state: state;
  setState: (state: state) => void;
};

const StateContext = createContext({} as stateContextType);

export default function StateProvider({ children}:{children:ReactNode }) {
  const [state, setState] = useState({
    play: false,
    difficulty: 1,
    score: 0,
    menu: true,
    credits: false,
    words:[],
    keyboard:true
  } as state);
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };

