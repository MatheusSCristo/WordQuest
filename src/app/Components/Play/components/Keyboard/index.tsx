import { StateContext } from "@/app/context/State";
import letters from "@/util/letters";
import Image from "next/image";
import { useContext } from "react";

const Keyboard = () => {
  const { state, setState } = useContext(StateContext);
  const handleClicks = (character: string) => {
    const { words } = state;
    let newWord: string[] = [];
    if (words.length == 0) {
      newWord = [character];
    }
    words.forEach((word, index) => {
      if (word.length == 5) {
        newWord = [...state.words, character];
      } else {
        newWord = [...words];
        newWord[index] = word + character;
      }
    });
    setState({ ...state, words: newWord });
  };
  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-2">
      {letters.map((row) => (
        <div className="flex gap-2">
          {row.map((letter) =>
            letter != "*" ? (
              <button
                disabled={!state.keyboard}
                onClick={() => handleClicks(letter)}
                className="hover:scale-105 duration-300 active:bg-[#362323] border border-white rounded-sm bg-secondary w-[3vw] h-[7vh] text-white text-lg flex items-center justify-center  "
              >
                {letter}
              </button>
            ) : (
              <button
                disabled={!state.keyboard}
                className="relative hover:scale-105 duration-300 active:bg-[#362323] border border-white rounded-sm bg-secondary w-[4vw] h-[7vh] text-white text-lg flex items-center justify-center  "
              >
                <Image
                  src={"/icons/delete.svg"}
                  width={40}
                  height={40}
                  alt="Deletar"
                />
              </button>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
