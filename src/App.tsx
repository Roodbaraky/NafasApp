import { Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import Navbar from "./components/Navbar";
import Finished from "./pages/Finished";
import Home from "./pages/Home";
import { BreathHolds } from "./contexts/breathHolds";
import { useState } from "react";
import About from "./pages/About";
import Support from "./pages/Support";

function App() {
  const [breathHolds, setBreathHolds] = useState<number[] | null>(null);
  return (
    <Container>
      <Navbar />
      <BreathHolds.Provider value={{ breathHolds, setBreathHolds }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/finished" element={<Finished />} />
        </Routes>
      </BreathHolds.Provider>
    </Container>
  );
}

export default App;
