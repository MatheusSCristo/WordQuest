"use client";

import { StateContext } from "@/app/context/State";
import FailedModal from "@/app/Modal/FailedModal";
import words from "@/util/words";
import { useContext, useState } from "react";
import { useReward } from "react-rewards";
import Keyboard from "./components/Keyboard";
import LetterRow from "./components/LetterRow";

const difficulty: {
  [key: number]: string;
} = {
  1: "Fácil",
  2: "Médio",
  3: "Difícil",
};

const Play = () => {
  const { reward: confettiReward } = useReward("confettiReward", "confetti", {
    lifetime: 300,
    elementCount: 500,
    spread: 180,
  });
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const { state, setState } = useContext(StateContext);
  const [failed, setFailed] = useState(false);
  const otherWords = [1, 2, 3, 4, 5, 6].slice(
    0,
    state.difficulty === 1 ? 6 : state.difficulty === 2 ? 4 : 3
  );

  const handleMenuClick = () => {
    setState((prevState) => ({
      ...prevState,
      menu: true,
      play: false,
      words: [],
      keyboard: true,
    }));
  };

  return (
    <section className="w-full h-full flex flex-col">
      {failed && <FailedModal/>}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent">
        <div className="flex gap-2 items-baseline ">
          <button
            onClick={handleMenuClick}
            className="bg-gradient-to-r from-[#ECBB8F] to-[#866A51] text-white px-3 py-2 border border-white hover:scale-105 rounded-sm text-lg duration-300"
          >
            Menu
          </button>
          <h2 className="uppercase text-lg ">Dificuldade:</h2>
          <h2 className="uppercase text-md">{difficulty[state.difficulty]}</h2>
        </div>
        <h1 className="text-[3em] leading-none">WORD QUEST</h1>
        <h3 className="uppercase text-lg">{state.score} pontos</h3>
      </div>
      <div
        className="flex flex-col justify-center items-center mt-10 gap-2"
        id="confettiReward"
      >
        {otherWords.map((item, index) => (
          <LetterRow
            word={selectedWord}
            index={index}
            setSelectedWord={setSelectedWord}
            handleReward={()=>confettiReward()}
            setFailed={setFailed}
          />
        ))}
      </div>
      <Keyboard />
    </section>
  );
};

export default Play;
