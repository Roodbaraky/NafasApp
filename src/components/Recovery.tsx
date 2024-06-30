import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";

interface RecoveryProps {
  onRecoveryComplete: () => void;
}

const Recovery: React.FC<RecoveryProps> = ({ onRecoveryComplete }) => {
  const controls = useAnimation();

  const animateRecovery = useCallback(async () => {
    await controls.start({
      scale: [0.2, 1, 1],
      transition: {
        times: [0, 0.2, 0.7],
        duration: 15,
        ease: "easeInOut",
      },
    });
    controls.stop();
    onRecoveryComplete();
  }, [controls, onRecoveryComplete]);
  useEffect(() => {
    animateRecovery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={controls}
      className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl"
    >
      recover
    </motion.div>
  );
};

export default Recovery;
