"use client";

import { StateContext } from "@/app/context/StateContext";
import FailedModal from "@/app/Modal/FailedModal";
import words from "@/util/words";
import { motion, useAnimationControls } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useReward } from "react-rewards";
import Clock from "./components/Clock";
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
  const [time, setTime] = useState(180);
  const [restart, setRestart] = useState(false);
  const score = state.score;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      setRestart(true);
      setTimeout(() => {
        setTime(180);
      }, 2000);
    }
  }, [time]);

  const controller = useAnimationControls();

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

  useEffect(() => {
    controller.start("animate");
  }, [state.score]);

  return (
    <section className="w-full h-full flex flex-col relative">
      {failed && <FailedModal />}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent">
        <div className="flex flex-col xl:flex-row gap-2 items-baseline ">
          <button
            onClick={handleMenuClick}
            className="bg-gradient-to-r from-[#ECBB8F] to-[#866A51] text-white px-3 py-2 border border-white hover:scale-105 rounded-sm xl:text-lg duration-300"
          >
            Menu
          </button>
          <div className="flex items-baseline gap-2">
            <h2 className="uppercase xl:text-lg ">Dificuldade:</h2>
            <h2 className="uppercase xl:text-md ">
              {difficulty[state.difficulty]}
            </h2>
          </div>
        </div>
        <h1 className="text-2xl xl:text-[3em] leading-none absolute top-0 left-1/2  -translate-x-1/2 bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent">
          WORD QUEST
        </h1>
        <motion.h3
          initial={{ scale: 1 }}
          variants={{ animate: { scale: [1, 1.2, 1] } }}
          animate={controller}
          transition={{ duration: 1, ease: "easeInOut", times: [0, 0.5, 1] }}
          className="uppercase text-lg bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent"
        >
          {state.score} pontos
        </motion.h3>
      </div>
      <div
        className="flex flex-col justify-center items-center mt-2 xl:mt-10 gap-2"
        id="confettiReward"
      >
        {otherWords.map((item, index) => (
          <LetterRow
            key={item}
            word={selectedWord}
            index={index}
            setSelectedWord={setSelectedWord}
            handleReward={() => confettiReward()}
            setFailed={setFailed}
            failed={failed}
            restartTime={() => setTime(180)}
            restart={restart}
          />
        ))}
      </div>
      <Keyboard />
      <Clock time={time} />
    </section>
  );
};

export default Play;
