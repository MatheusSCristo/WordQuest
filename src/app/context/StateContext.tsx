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
  const getSessionStorage = () => {
    if (typeof window !== "undefined") {
      const localState = sessionStorage.getItem("state");
      if (localState) {
        return {
          ...JSON.parse(localState),
          keyboard: true,
          play: false,
          menu: true,
          words:[]
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

  const [state, setState] = useState(getSessionStorage());

  useEffect(() => {
    if (typeof window !== "undefined")
      sessionStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };

