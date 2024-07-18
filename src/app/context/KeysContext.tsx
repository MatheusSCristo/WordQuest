import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { StateContext } from "./StateContext";

type Keys={
    key:String,
    type:0|1|2;
}

type KeysContextType = {
  keys: Keys[];
  setKeys: Dispatch<SetStateAction<Keys[]>>;
};

const KeysContext = createContext({} as KeysContextType);

export default function KeysProvider({ children }: { children: React.ReactNode }) {
  const [keys, setKeys] = useState<Keys[]>([]);
  const {state}=useContext(StateContext);


  useEffect(()=>{
    if(state.play ){
      setKeys([])
    }
  },[state])

  return (
    <KeysContext.Provider value={{ keys, setKeys }}>
      {children}
    </KeysContext.Provider>
  );
};

export { KeysContext, KeysProvider };

