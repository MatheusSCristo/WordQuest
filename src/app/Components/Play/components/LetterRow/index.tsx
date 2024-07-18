"use client";

import { State, StateContext } from "@/app/context/StateContext";
import words from "@/util/words";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { KeysContext } from "@/app/context/KeysContext";
import { motion, useAnimationControls } from "framer-motion";

const difficultyRows: {
  [key: number]: number;
} = {
  1: 6,
  2: 4,
  3: 3,
};

const LetterRow = ({
  word,
  index,
  setSelectedWord,
  handleReward,
  setFailed,
}: {
  word: string;
  index: number;
  setSelectedWord: Dispatch<SetStateAction<string>>;
  handleReward: () => void;
  setFailed: Dispatch<SetStateAction<boolean>>;
}) => {
  const controller = useAnimationControls();
  const { state, setState } = useContext(StateContext);
  const { keys, setKeys } = useContext(KeysContext);
  const [hits, setHits] = useState([] as number[]);
  const { words: wordsWritten } = state;

  const changeKeys = (
    prevState: typeof keys,
    letter: string,
    type: 0 | 1 | 2
  ) => {
    const newKeys = [...prevState];
    const index = newKeys.findIndex((item) => item.key === letter);
    if (index != -1) {
      newKeys[index].type = type;
      return;
    }
    setKeys((prevState) => [...prevState, { key: letter, type: type }]);
    return;
  };

  const restartOnWordRight = () => {
    controller.start("animate");
    setState((prevState: State) => ({
      ...prevState,
      keyboard: false,
    }));
    handleReward();
    const timetout = setTimeout(() => {
      setHits([]);
      setState((prevState) => ({
        ...prevState,
        score: state.score + state.difficulty,
        words: [],
        keyboard: true,
      }));
      setSelectedWord(words[Math.floor(Math.random() * words.length)]);
      setKeys([]);
      return () => clearTimeout(timetout);
    }, 2000);
  };

  const handleEnterWord = () => {
    const writtenWord = wordsWritten[index].split("");
    const selectedWord = word.split("");
    writtenWord.forEach((letter, i) => {
      if (!selectedWord.includes(letter.toLowerCase())) {
        setHits((prevState) => [...prevState, 0]);
        changeKeys(keys, letter, 0);
      } else if (letter.toLowerCase() === selectedWord[i]) {
        setHits((prevState) => [...prevState, 1]);
        changeKeys(keys, letter, 1);
      } else if (selectedWord.includes(letter.toLowerCase())) {
        setHits((prevState) => [...prevState, 2]);
        changeKeys(keys, letter, 2);
      } 
    });
  };

  useEffect(() => {
    if (hits.length === 5 && hits.every((value) => value == 1)) {
      restartOnWordRight();
    }
  }, [hits]);

  useEffect(() => {
    const restartOnAllWordsWrong = () => {
      setState((prevState) => ({
        ...prevState,
        keyboard: false,
      }));
      const timeout = setTimeout(() => {
        setHits([]);
        setState((prevState) => ({
          ...prevState,
          score: state.score != 0 ? state.score - 1 : 0,
          words: [],
          keyboard: true,
        }));
        setSelectedWord(words[Math.floor(Math.random() * words.length)]);
        setKeys([]);
      }, 2000);
      return () => clearTimeout(timeout);
    };
    if (
      !wordsWritten.includes(word.toUpperCase()) &&
      wordsWritten.length == difficultyRows[state.difficulty] &&
      wordsWritten.every((word) => word.length == 5)
    ) {
      setFailed(true);
      restartOnAllWordsWrong();
      const timeout = setTimeout(() => {
        setFailed(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [wordsWritten]);

  useEffect(() => {
    console.log(word);
  }, [word]);

  useEffect(() => {
    if (wordsWritten[index] && wordsWritten[index].length == 5) {
      handleEnterWord();
    }
  }, [wordsWritten[index]]);

  return (
    <>
      <motion.div
        className="flex gap-2"
        initial={{ scale: 1 }}
        variants={{ animate: { scale: [1.0, 1.2, 1.0] } }}
        transition={{ duration: 1, ease: "easeInOut", times: [0, 0.7, 1] }}
        animate={controller}
      >
        {[1, 2, 3, 4, 5].map((item, i) => (
          <div
            className={`bg-gradient-to-r from-[#ECBB8F] to-[#866A51] w-[7vh] h-[7vh] border 
          border-white rounded-md  flex items-center justify-center text-[5vh]
          ${
            hits[i] === 0
              ? "text-red-500"
              : hits[i] === 1
              ? "text-green-500"
              : hits[i] === 2
              ? "text-yellow-500"
              : "text-white"
          }
          `}
            key={item}
          >
            {wordsWritten[index] && wordsWritten[index][i]}
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default LetterRow;
