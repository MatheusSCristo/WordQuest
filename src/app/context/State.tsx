"use client";
import { createContext, ReactNode, useState } from "react";

export type State = {
  play: boolean;
  difficulty: number;
  score: number;
  menu: boolean;
  credits: boolean;
  words: string[];
  keyboard:boolean;
};

type stateContextType = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const StateContext = createContext({} as stateContextType);

export default function StateProvider({ children}:{children:ReactNode }) {
  const [state, setState] = useState({
    play: false,
    difficulty: 1,
    score: 0,
    menu: true,
    credits: false,
    words:[""],
    keyboard:true
  });
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };

