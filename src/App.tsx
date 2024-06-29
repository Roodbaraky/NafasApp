import { Route, Routes } from "react-router-dom";
import { Container } from "./components/Container";
import Navbar from "./components/Navbar";
import Finished from "./pages/Finished";
import Home from "./pages/Home";

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/finished" element={<Finished />} />
      </Routes>
    </Container>
  );
}

export default App;
