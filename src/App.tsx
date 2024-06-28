import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BreathAnimation from "./components/BreathAnimation";
import { Container } from "./components/Container";
import Navbar from "./components/Navbar";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [round, setRound] = useState(1);
  const [breathHolds, setBreathHolds] = useState<number[]>([]);
  const [holding, setHolding] = useState(false);
  const [holdTime, setHoldTime] = useState(0);
  const holdStartTime = useRef<number | null>(null);
  const animate = useAnimate()
  

  useEffect(() => {
    if (holding) {
      holdStartTime.current = Date.now();
      const interval = setInterval(() => {
        if (holdStartTime.current !== null) {
          setHoldTime(Date.now() - holdStartTime.current);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [holding]);

  const startBreathHold = () => {
    setHolding(true);
    setHoldTime(0);
  };

  const endBreathHold = () => {
    setHolding(false);
    setBreathHolds([...breathHolds, holdTime / 1000]);
    if (round < 3) {
      setRound(round + 1);
      setTimeout(() => setIsAnimating(true), 15000);
    }
  };


  return (
    <Container>
      <Navbar />
      <main className="">
        {/* <h1 className="text-9xl text-center mx-auto">Nafas</h1> */}
        <BreathAnimation />
        
    
      </main>
    </Container>
  );
}

export default App;
