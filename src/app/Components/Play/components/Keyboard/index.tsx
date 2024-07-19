import { KeysContext } from "@/app/context/KeysContext";
import { StateContext } from "@/app/context/StateContext";
import letters from "@/util/letters";
import Image from "next/image";
import { useContext } from "react";

const Keyboard = () => {
  const { state, setState } = useContext(StateContext);
  const { keys, setKeys } = useContext(KeysContext);
  const { words } = state;

  const handleClicks = (character: string) => {
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

  const handleDelete = () => {
    const newWords = [...words];
    newWords.forEach((word, index) => {
      if (word.length < 5 && word.length > 0) {
        newWords[index] = word.slice(0, -1);
      }
    });
    setState({ ...state, words: newWords });
  };

  const checkTypesOfKeysPressed = (letter: string) => {
    const lowerCaseLetter=letter.toLowerCase();
    if (!keys.find((item) => item.key == lowerCaseLetter)) return "bg-secondary";
    if (keys.find((item) => item.key == lowerCaseLetter)?.type == 0) return "bg-red-500 opacity-[0.5]";
    if (keys.find((item) => item.key == lowerCaseLetter)?.type == 1)
      return "bg-green-500";
    if (keys.find((item) => item.key == lowerCaseLetter)?.type == 2)
      return "bg-yellow-500";
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
                className={`${checkTypesOfKeysPressed(
                  letter
                )} hover:scale-105 disable:opacity-[0.7] duration-300 active:bg-[#362323] border border-white rounded-sm w-[3vw] h-[7vh] text-white text-lg flex items-center justify-center`}
              >
                {letter}
              </button>
            ) : (
              <button
                onClick={handleDelete}
                disabled={!state.keyboard}
                className="relative hover:scale-105 disable:opacity-[0.7] duration-300 active:bg-[#362323] border border-white rounded-sm bg-secondary w-[4vw] h-[7vh] text-white text-lg flex items-center justify-center  "
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
