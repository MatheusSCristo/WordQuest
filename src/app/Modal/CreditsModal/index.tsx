import Link from "next/link";

const CreditsModal = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <div className="fixed w-screen h-screen  z-20 bg-[#ffffff90] flex items-center justify-center m-[-1.25rem]">
      <div className="relative bg-primary border border-[#ECBB8F] w-[600px] py-5 flex flex-col items-center text-white rounded gap-5">
        <span
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        >
          X
        </span>
        <h1 className="text-3xl">Olá, bem vindo ao Word Quest!</h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-center">
            Este jogo foi inspirado no jogo
            <Link
              href={"https://term.ooo/"}
              className="mx-1 hover:underline"
              target="_blank"
            >
              Termo.
            </Link>
          </p>
          <p className="text-center text-xl">
            O objetivo do jogo é descobrir a palavra da rodada. A cada nível a
            dificuldade aumenta, e a quantidade de tentativas diminui. Porém,
            quanto maior a dificuldade, maior a recompensa.
          </p>
          <p className="text-center text-[#ECBB8F]">
            Criado por
            <Link href={"https://github.com/MatheusSCristo"} className="hover:underline ml-1">
              Matheus Senas de Cristo
            </Link>
            ,2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal;
