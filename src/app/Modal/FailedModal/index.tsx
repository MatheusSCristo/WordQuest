
const FailedModal = () => {
  return (
    <div className='fixed w-screen h-screen  z-20 bg-[#ffffff90] flex items-center justify-center m-[-1.25rem]'>
        <div className="bg-primary border border-[#ECBB8F] w-[300px] py-5 flex flex-col items-center text-white rounded">
            <h1 className="text-2xl">Errou, reiniciando...</h1>
            <h2 className="text-xl">Você perdeu 1 ponto!</h2>
        </div>
        
    </div>
  )
}

export default FailedModal