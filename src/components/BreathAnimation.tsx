import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BreathAnimation: React.FC = () => {
  const controls = useAnimation();
  const breathsPerRound = 3;
  // set to 3 for dev purposes, should be 30
  const numberOfRounds = 3;
  const countDown = 5;
  const [round, setRound] = useState(1);
  const [numOfBreaths, setNumOfBreaths] = useState(breathsPerRound);
  const [breathHolds, setBreathHolds] = useState<number[]>([]);
  const [holdTime, setHoldTime] = useState(0);
  const holdStartTime = useRef<number | null>(null);
  const [phase, setPhase] = useState({
    countDown: false,
    breathing: false,
    hold: false,
    recovery: false,
    complete: false,
  });

  const navigate = useNavigate()
  const countDownAnimation = useCallback(async () => {
    for (let i = countDown; i > 0; i--) {
      console.log("countdown working");
      await controls.start({
        scale: [1, 0.9, 1],
        transition: {
          times: [0, 0.9, 1],
          duration: 1,
        },
      });
    }
    setPhase({ ...phase, countDown: false, breathing: true });
  }, [controls, phase]);

  const breathingAnimation = useCallback(async () => {
    for (let i = 0; i < breathsPerRound; i++) {
      console.log(i, breathsPerRound);
      await controls.start({
        scale: [1, 0.2, 1],
        transition: {
          duration: 3,
          ease: "easeInOut",
        },
      });
      setNumOfBreaths((prevNum) => prevNum - 1);
    }
    await controls.start({
      scale: [1, 0.01, 1],
      transition: {
        times: [0, 0.9, 1],
        duration: 6,
      },
    });
    setPhase({ ...phase, breathing: false, hold: true });
  }, [controls, phase]);
  const holdingAnimation = useCallback(async () => {
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

  const recoveryAnimation = useCallback(async () => {
    await controls.start({
      scale: [0.2, 1, 1],
      transition: {
        times: [0, 0.2, 0.7],
        duration: 15,
        ease: "easeInOut",
      },
    });
    controls.stop();
    setNumOfBreaths(breathsPerRound);
    if (round < numberOfRounds) {
      setRound(round + 1);
      setPhase({ ...phase, recovery: false, countDown: true });
    } else {
      setPhase({ ...phase, recovery: false, complete: true });
    }
  }, [controls, phase, round]);

  const startBreathHold = useCallback(() => {
    setHoldTime(0);
  }, []);

  const endBreathHold = () => {
    setPhase({ ...phase, hold: false });
    setBreathHolds([...breathHolds, holdTime / 1000]);
    setPhase({ ...phase, hold: false, recovery: true });
  };

  useEffect(() => {
    if (phase.countDown) {
      countDownAnimation();
    }
    if (phase.breathing) {
      breathingAnimation();
    }
    if (phase.hold) {
      startBreathHold();
      holdingAnimation();
      holdStartTime.current = Date.now();
      const interval = setInterval(() => {
        if (holdStartTime.current !== null) {
          setHoldTime(Date.now() - holdStartTime.current);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    if (phase.recovery) {
      recoveryAnimation();
    }
    if (phase.complete){
      navigate('/finished')
    }
  }, [breathingAnimation, countDownAnimation, holdingAnimation, navigate, phase, recoveryAnimation, startBreathHold]);
  return (
    <section className="flex flex-col items-center justify-evenly h-screen">
      <div className="breath-animation">
        <h1 className="text-center text-3xl">
          Round:
          {round}
        </h1>
        <div className="circle border border-slate-400 border-spacing-8 bg-slate-200 p-1 shadow-xl">
          <motion.div
            animate={controls}
            className="circle size-40 flex flex-col place-content-center text-center text-3xl bg-slate-400 text-white shadow-xl"
          >
            {numOfBreaths === 0 && phase.breathing
              ? "exhale fully"
              : phase.hold
              ? "hold"
              : phase.recovery
              ? "recover"
              : numOfBreaths}
          </motion.div>
        </div>
      </div>
      <button
        className="btn"
        onClick={() => {
          setPhase({ ...phase, countDown: true });
        }}
      >
        Start Breathing
      </button>
      <div className="flex flex-col">
        <div>{breathHolds}</div>
        <div>{holdTime / 1000}</div>
        <button
          className={`btn ${phase.hold ? "" : "btn-disabled"}`}
          onClick={endBreathHold}
        >
          Stop Holding
        </button>
      </div>
    </section>
  );
};

export default BreathAnimation;
