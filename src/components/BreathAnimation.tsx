import { motion, useAnimation } from "framer-motion";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { BiSkipNext } from "react-icons/bi";
import { BsPause, BsPlay } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BreathHolds } from "../contexts/breathHolds";
import Breathing from "./Breathing";
import Countdown from "./Countdown";
import Hold from "./Hold";
import Recovery from "./Recovery";

export interface Phase {
  countdown: boolean;
  breathing: boolean;
  hold: boolean;
  recovery: boolean;
  complete: boolean;
  sessionRunning: boolean;
  sessionPaused: boolean;
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
  const { setBreathHolds } = useContext(BreathHolds);
  const [holdTime, setHoldTime] = useState(0);
  const holdStartTime = useRef<number | null>(null);
  const [phase, setPhase] = useState({
    countdown: false,
    breathing: false,
    hold: false,
    recovery: false,
    complete: false,
    sessionRunning: false,
    sessionPaused: false,
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
        <div className="circle border border-slate-400 border-spacing-8 bg-slate-200 p-1  shadow-xl">
          {!Object.values(phase).includes(true) ? (
            <>
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
                  : !phase.sessionRunning
                  ? "Nafas"
                  : numOfBreaths}
              </motion.div>
            </>
          ) : (
            <>
              {phase.countdown && (
                <Countdown
                  countDownFrom={countDownFrom}
                  countDown={countDown}
                  setCountDown={setCountDown}
                  onCountdownComplete={() => {
                    setPhase({ ...phase, countdown: false, breathing: true });
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
                      setPhase({ ...phase, recovery: false, countdown: true });
                    } else {
                      setPhase({
                        ...phase,
                        recovery: false,
                        complete: true,
                        sessionRunning: false,
                      });
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
        <div className="text-center text-3xl h-10">
          {phase.hold && (holdTime / 1000).toFixed(1)}
        </div>
      </div>
      <section>
        {!phase.hold ? (
          <label
            htmlFor="play-pause-btn"
            className="flex flex-col gap-1 text-center"
          >
            <button
              id="play-pause-btn"
              className="btn btn-outline rounded-full size-14"
              onClick={() => {
                if (!phase.sessionRunning) {
                  setPhase({ ...phase, countdown: true, sessionRunning: true });
                  setBreathHolds([]);
                } else {
                  //detect current phase
                  //pause/stop current phase
                  //resume/start again from current phrase on next click
                }
              }}
            >
              {!phase.sessionRunning ? <BsPlay /> : <BsPause />}
            </button>
            {!phase.sessionRunning ? "Start" : "Pause"}
          </label>
        ) : (
          <div className="flex flex-col">
            <button
              className={`btn rounded-full size-14  btn-outline
              `}
              onClick={endBreathHold}
            >
              <BiSkipNext />
            </button>
          </div>
        )}
      </section>
    </section>
  );
};

export default BreathAnimation;
