import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";
import { Phase } from "./BreathAnimation";

interface HoldProps {
  phase: Phase;
}

const Hold: React.FC<HoldProps> = ({ phase }) => {
  const controls = useAnimation();

  const animateHold = useCallback(async () => {
    if (!phase.hold) {
      controls.stop();
    }
    await controls.start({
      scale: [1, 0.9, 1, 0.9, 1, 0.9, 1],
      transition: {
        repeat: Infinity,
        duration: 15,
        ease: "easeInOut",
      },
    });
  }, [controls, phase]);
  useEffect(() => {
    animateHold();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={controls}
      className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl"
    >
      hold
    </motion.div>
  );
};

export default Hold;
