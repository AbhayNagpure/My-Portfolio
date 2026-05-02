import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-rose-500/30 selection:text-rose-100 font-sans">
        {/* Soft Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
