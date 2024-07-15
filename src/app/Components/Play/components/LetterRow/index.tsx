"use client";

import { StateContext } from "@/app/context/State";
import words from "@/util/words";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

const LetterRow = ({
  word,
  index,
  setSelectedWord,
}: {
  word: string;
  index: number;
  setSelectedWord: Dispatch<SetStateAction<string>>;
}) => {
  const { state, setState } = useContext(StateContext);
  const [hits, setHits] = useState([] as number[]);
  const { words:wordsWritten } = state;
  const handleEnterWord = () => {
    const writtenWord = wordsWritten[index].split("");
    const selectedWord = word.split("");
    writtenWord.forEach((letter, i) => {
      if (!selectedWord.includes(writtenWord[i].toLowerCase())) {
        setHits((prevState) => [...prevState, 0]);
      } else if (writtenWord[i].toLowerCase() === selectedWord[i]) {
        setHits((prevState) => [...prevState, 1]);
      } else if (selectedWord.includes(writtenWord[i].toLowerCase())) {
        setHits((prevState) => [...prevState, 2]);
      }
    });
  };

  useEffect(() => {
    if (hits.every((value) => value == 1) && hits.length == word.length) {
      setState((prevState:typeof state)=>({...prevState,keyboard:false}))
      setTimeout(() => {
        setState((prevState)=>({ ...prevState, score: state.score + 1, words: [],keyboard:true }));
        setSelectedWord(words[Math.floor(Math.random() * words.length)])
        setHits([]);  
      }, 2000);
    }
  }, [hits]);

  useEffect(()=>{
    console.log(state.words)
  },[state])

  useEffect(()=>{
    console.log(word)
  },[word])

  useEffect(() => {
    if (wordsWritten[index] && wordsWritten[index].length == word.length) {
      handleEnterWord();
    }
  }, [wordsWritten[index]]);

  return (
    <div className="flex gap-2">
      {word.split("").map((item, i) => (
        <div
          className={`bg-gradient-to-r from-[#ECBB8F] to-[#866A51] w-[7vh] h-[7vh] border 
          border-white rounded-md text-white flex items-center justify-center text-[5vh]
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
          {wordsWritten[index] && wordsWritten[index][i] }
        </div>
      ))}
    </div>
  );
};

export default LetterRow;
