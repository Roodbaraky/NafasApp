import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export const BreathAnimation: React.FC = () => {
  const controls = useAnimation();
  const breathsPerRound = 5;
  const [numOfBreaths, setNumOfBreaths] = useState(breathsPerRound);

  const breathingAnimation = async () => {
    for (let i = 0; i < breathsPerRound + 1; i++) {
      if (i === breathsPerRound) {
        await controls.start({
          scale: [1, 0.01, 1],
          transition: {
            times: [0, 0.9, 1],

            duration: 6,
          },
        });
      } else {
        await controls.start({
          scale: [1, 0.2, 1],
          transition: {
            duration: 3,
            ease: "easeInOut",
          },
        });
      }
      setNumOfBreaths((prevNum) => prevNum - 1);
    }
  };
 
useEffect(()=>{
  const holdingAnimation = async () => {
    await controls.start({
      scale: [1, 0.9, 1, 0.9, 1, 0.9, 1],
      transition: {
        repeat:Infinity,
        duration: 15,
        ease:'easeInOut'
        
      },
    });
  };
if (numOfBreaths===-1){
  holdingAnimation()
}
},[controls, numOfBreaths])
  return (
    <section className="flex flex-col items-center justify-evenly h-screen">
      <div className="breath-animation">
        <div className="circle border border-slate-400 border-spacing-8 bg-slate-200 p-1 shadow-xl">
          <motion.div
            animate={controls}
            className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl"
          >
            {numOfBreaths === 0
              ? "exhale fully"
              : numOfBreaths === -1
              ? "hold"
              : numOfBreaths}
          </motion.div>
        </div>
      </div>
      <button className="btn" onClick={breathingAnimation}>
        Start Breathing
      </button>
    </section>
  );
};

export default BreathAnimation;
