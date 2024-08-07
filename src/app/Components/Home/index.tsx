"use client";
import { StateContext } from "@/app/context/StateContext";
import CreditsModal from "@/app/Modal/CreditsModal";
import { motion, useAnimationControls } from "framer-motion";
import { useContext } from "react";

const difficulty: {
  [key: number]: string;
} = {
  1: "Fácil",
  2: "Médio",
  3: "Difícil",
};
const Home = () => {
  const { state, setState } = useContext(StateContext);
  const controller = useAnimationControls();

  const handleDifficulty = () => {
    setState({
      ...state,
      difficulty: state.difficulty + 1 > 3 ? 1 : state.difficulty + 1,
    });
    controller.start("scale");
  };

  const handlePlay = () => {
    setState({ ...state, play: true, menu: false });
  };

  const handleCredits = () => {
    setState({ ...state, credits: true });
  };

  return (
    <section className="flex flex-col items-center w-full">
      {state.credits && (
        <CreditsModal
          closeMenu={() =>
            setState((prevState) => ({ ...prevState, credits: false }))
          }
        />
      )}
      <h3 className="uppercase bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent self-end">
        {state.score} {state.score > 1 ? "pontos" : "ponto"}
      </h3>
      <div className="text-center flex flex-col uppercase bg-gradient-to-r from-[#ECBB8F] to-[#866A51] bg-clip-text text-transparent text-[4em] leading-none mt-10">
        <h1>WORD</h1>
        <h1>QUEST</h1>
      </div>
      <div className="w-[350px] flex-1 flex flex-col justify-center gap-5">
        <button
          onClick={handlePlay}
          className="text-nowrap px-5 hover:scale-105 transition duration-400 ease-in-out uppercase bg-gradient-to-r from-[#ECBB8F] to-[#866A51] w-full py-2 text-center text-xl rounded-sm"
        >
          <h2>JOGAR</h2>
        </button>
        <button
          onClick={handleDifficulty}
          className="flex gap-2 items-baseline text-nowrap px-5 hover:scale-105 transition duration-400 ease-in-out uppercase bg-gradient-to-r from-[#ECBB8F] to-[#866A51] w-full py-2 text-center  rounded-sm"
        >
          <h2 className="text-xl flex-1">ALTERAR DIFICULDADE:</h2>
          <motion.h2
            variants={{ scale: { scale: [1, 1.2, 1] } }}
            animate={controller}
            transition={{ duration: 1, ease: "easeInOut", times: [0, 0.5, 1] }}
            className="font-lg"
          >
            {difficulty[state.difficulty]}
          </motion.h2>
        </button>
        <button
          onClick={handleCredits}
          className="text-nowrap px-5 hover:scale-105 transition duration-400 ease-in-out uppercase bg-gradient-to-r from-[#ECBB8F] to-[#866A51] w-full py-2 text-center text-xl rounded-sm"
        >
          <h2>CRÉDITOS</h2>
        </button>
      </div>
    </section>
  );
};

export default Home;
