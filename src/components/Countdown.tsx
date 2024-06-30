import { motion, useAnimation } from "framer-motion";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface CountdownProps {
  onCountdownComplete: () => void;
  countDownFrom: number;
  countDown: number;

  setCountDown: Dispatch<SetStateAction<number>>;
}

const Countdown: React.FC<CountdownProps> = ({
  onCountdownComplete,
  countDownFrom,
  countDown,
  setCountDown,
}) => {
  const controls = useAnimation();

  const animateCountdown = useCallback(async () => {
    for (let i = countDownFrom; i > 0; i--) {
      await controls.start({
        scale: [1, 0.9, 1],
        transition: {
          times: [0, 0.9, 1],
          duration: 1,
        },
      });
      setCountDown((prevCountDown) => prevCountDown - 1);
      console.log(i);
    }
    setCountDown(countDownFrom)
    onCountdownComplete();
  }, [controls, countDownFrom, onCountdownComplete, setCountDown]);

  useEffect(() => {
    animateCountdown();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={controls}
      className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl"
    >
      {countDown}
    </motion.div>
  );
};

export default Countdown;
