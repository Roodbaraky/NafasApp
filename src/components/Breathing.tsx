import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";

interface BreathingProps {
  breathsPerRound: number;
  onBreathingComplete: () => void;
  onBreathComplete: () => void;
  numOfBreaths:number;
}

const Breathing: React.FC<BreathingProps> = ({ breathsPerRound, onBreathComplete, onBreathingComplete, numOfBreaths }) => {
  const controls = useAnimation();
  
  const animateBreathing = useCallback(async () => {
    for (let i = 0; i < breathsPerRound; i++) {
      if (i === 0) {
        await controls.start({
          scale: [1, 0.2],
          transition: {
            duration: 3,
            ease: "easeInOut",
          },
        });
      }
      await controls.start({
        scale: [0.2, 1, 0.2],
        transition: {
          duration: 3,
          ease: "easeInOut",
        },
      });
      if (i === breathsPerRound - 1) {
        await controls.start({
          scale: [0.2, 1],
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        });
      }
    onBreathComplete()
    }
    await controls.start({
      scale: [1, 0.01, 1],
      transition: {
        times: [0, 0.9, 1],
        duration: 6,
      },
    });
    onBreathingComplete();
  },[breathsPerRound, controls, onBreathComplete, onBreathingComplete])
 

  useEffect(() => {
    animateBreathing()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div animate={controls}
    className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl">
      {numOfBreaths!==0?numOfBreaths:"exhale fully"}
    </motion.div>
  );
};

export default Breathing;
