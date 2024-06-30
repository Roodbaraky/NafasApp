import { motion, useAnimation } from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BreathHolds } from "../contexts/breathHolds";
import Countdown from "./Countdown";
import Hold from "./Hold";
import Recovery from "./Recovery";
import Breathing from "./Breathing";

export interface Phase {
  countDown: boolean;
  breathing: boolean;
  hold: boolean;
  recovery: boolean;
  complete: boolean;
}
export const BreathAnimation: React.FC = () => {
  const controls = useAnimation();
  const breathsPerRound = 3;
  // set to 3 for dev purposes, should be 30
  const numberOfRounds = 3;
  const navigate = useNavigate();
  const countDownFrom = 5;
  const [countDown, setCountDown] = useState(countDownFrom);
  const [round, setRound] = useState(1);
  const [numOfBreaths, setNumOfBreaths] = useState(breathsPerRound);
  const { breathHolds, setBreathHolds } = useContext(BreathHolds);
  const [holdTime, setHoldTime] = useState(0);
  const holdStartTime = useRef<number | null>(null);
  const [phase, setPhase] = useState({
    countDown: false,
    breathing: false,
    hold: false,
    recovery: false,
    complete: false,
  });

  const startBreathHold = useCallback(() => {
    setHoldTime(0);
  }, []);

  const endBreathHold = () => {
    setPhase({ ...phase, hold: false });
    setBreathHolds((previous) => {
      if (previous) {
        return [...previous, holdTime / 1000];
      } else {
        return [holdTime / 1000];
      }
    });
    setPhase({ ...phase, hold: false, recovery: true });
  };

  useEffect(() => {
    console.log(Object.values(phase).includes(true));
    if (phase.hold) {
      startBreathHold();
      holdStartTime.current = Date.now();
      const interval = setInterval(() => {
        if (holdStartTime.current !== null) {
          setHoldTime(Date.now() - holdStartTime.current);
        }
      }, 100);
      return () => clearInterval(interval);
    }

    if (phase.complete) {
      navigate("/finished");
    }
  }, [navigate, phase, startBreathHold]);

  return (
    <section className="flex flex-col items-center justify-evenly h-screen">
      <div className="breath-animation">
        <h1 className="text-center text-3xl">
          Round:
          {round}
        </h1>
        <div className="circle border border-slate-400 border-spacing-8 bg-slate-200 p-1 shadow-xl">
          {!Object.values(phase).includes(true) ? (
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
          ) : (
            <>
              {phase.countDown && (
                <Countdown
                  countDownFrom={countDownFrom}
                  countDown={countDown}
                  setCountDown={setCountDown}
                  onCountdownComplete={() => {
                    setPhase({ ...phase, countDown: false, breathing: true });
                  }}
                />
              )}

              {phase.breathing && (
                <Breathing
                  breathsPerRound={breathsPerRound}
                  onBreathComplete={() => {
                    setNumOfBreaths(
                      (previousNumOfBreaths) => previousNumOfBreaths - 1
                    );
                  }}
                  onBreathingComplete={() => {
                    setPhase({ ...phase, breathing: false, hold: true });
                  }}
                  numOfBreaths={numOfBreaths}
                />
              )}

              {phase.hold && <Hold phase={phase} />}

              {phase.recovery && (
                <Recovery
                  onRecoveryComplete={() => {
                    setNumOfBreaths(breathsPerRound);
                    if (round < numberOfRounds) {
                      setRound(round + 1);
                      setPhase({ ...phase, recovery: false, countDown: true });
                    } else {
                      setPhase({ ...phase, recovery: false, complete: true });
                    }
                  }}
                />
              )}
            </>
          )}
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
