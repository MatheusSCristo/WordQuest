"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

export type State = {
  play: boolean;
  difficulty: number;
  score: number;
  menu: boolean;
  credits: boolean;
  words: string[];
  keyboard: boolean;
};

type stateContextType = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const StateContext = createContext({} as stateContextType);

export default function StateProvider({ children }: { children: ReactNode }) {
  const getLocalStorageState = () => {
    if (typeof window !== "undefined") {
      const localState = localStorage.getItem("state");
      if (localState) {
        return {
          ...JSON.parse(localState),
          keyboard: true,
          play: false,
          menu: true,
        };
      }
    }
    return {
      play: false,
      difficulty: 1,
      score: 0,
      menu: true,
      credits: false,
      words: [""],
      keyboard: true,
    };
  };

  const [state, setState] = useState(getLocalStorageState());

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };

