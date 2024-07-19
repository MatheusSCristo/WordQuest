const Clock = ({ time }: { time: number }) => {
    const minutes= Math.floor(time / 60);
    const seconds = time % 60;
  return <div className="text-white flex text-2xl justify-center">
    <h1>0{minutes}</h1>
    <h1>:</h1>
    <h1>{seconds>=10?seconds:"0"+seconds}</h1>
  </div>;
};

export default Clock;
